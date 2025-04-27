import warnings
warnings.filterwarnings("ignore", category=FutureWarning)

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS  # 🆕 Add this
from PIL import Image
import io
import torch
from torchvision import transforms
from transformers import AutoModelForImageSegmentation
from loadimg import load_img
import os
import tempfile
import zipfile

# Initialize Flask app
app = Flask(__name__)

# Allow CORS for frontend at localhost:5173
CORS(app, origins=["http://localhost:5173"])  # 🆕 CORS added

# Set PyTorch matmul precision
torch.set_float32_matmul_precision("high")

# Load the BiRefNet model once at startup
birefnet = AutoModelForImageSegmentation.from_pretrained(
    "ZhengPeng7/BiRefNet", trust_remote_code=True
)
birefnet.to("cpu")

# Define image transforms
transform_image = transforms.Compose([
    transforms.Resize((1024, 1024)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
])

# Function to process an image and return transparent background
def process(image):
    image_size = image.size
    input_images = transform_image(image).unsqueeze(0).to("cpu")
    
    with torch.no_grad():
        preds = birefnet(input_images)[-1].sigmoid().cpu()
    
    pred = preds[0].squeeze()
    pred_pil = transforms.ToPILImage()(pred)
    mask = pred_pil.resize(image_size)
    
    image.putalpha(mask)
    return image

# API Route: Upload SINGLE Image
@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "Empty filename"}), 400
    
    image = Image.open(file.stream).convert("RGB")
    processed_image = process(image)
    
    img_byte_arr = io.BytesIO()
    processed_image.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)
    
    return send_file(img_byte_arr, mimetype='image/png')

# API Route: Upload MULTIPLE Images
@app.route('/upload-multiple', methods=['POST'])
def upload_multiple_images():
    if 'files' not in request.files:
        return jsonify({"error": "No files uploaded"}), 400
    
    files = request.files.getlist('files')
    if not files:
        return jsonify({"error": "Empty files list"}), 400

    temp_dir = tempfile.mkdtemp()
    output_paths = []

    for idx, file in enumerate(files):
        if file.filename == '':
            continue
        try:
            image = Image.open(file.stream).convert("RGB")
            processed_image = process(image)
            output_path = os.path.join(temp_dir, f"processed_{idx+1}.png")
            processed_image.save(output_path)
            output_paths.append(output_path)
        except Exception:
            continue

    if not output_paths:
        return jsonify({"error": "No valid images processed"}), 400

    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, "w") as zip_file:
        for path in output_paths:
            zip_file.write(path, arcname=os.path.basename(path))
    zip_buffer.seek(0)

    return send_file(zip_buffer, mimetype="application/zip", download_name="processed_images.zip", as_attachment=True)

# API Route: Upload URL
@app.route('/url', methods=['POST'])
def process_url():
    data = request.get_json()
    if not data or 'url' not in data:
        return jsonify({"error": "No URL provided"}), 400
    
    try:
        image = load_img(data['url'], output_type="pil").convert("RGB")
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
    processed_image = process(image)
    
    img_byte_arr = io.BytesIO()
    processed_image.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)
    
    return send_file(img_byte_arr, mimetype='image/png')

# API Route: Upload file path
@app.route('/file', methods=['POST'])
def process_file_path():
    data = request.get_json()
    if not data or 'path' not in data:
        return jsonify({"error": "No file path provided"}), 400

    path = data['path']
    if not os.path.isfile(path):
        return jsonify({"error": "Invalid file path"}), 400
    
    image = load_img(path, output_type="pil").convert("RGB")
    processed_image = process(image)
    
    output_path = path.rsplit(".", 1)[0] + "_processed.png"
    processed_image.save(output_path)
    
    return jsonify({"output_path": output_path})

# Main entry
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8001, debug=False)
