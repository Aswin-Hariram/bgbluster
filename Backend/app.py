import warnings
warnings.filterwarnings("ignore", category=FutureWarning)

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from PIL import Image
import io
import torch
from torchvision import transforms
from rembg import remove, new_session
import os
import tempfile
import zipfile
import logging
import numpy as np

# Initialize Flask app
app = Flask(__name__)

# Allow CORS
CORS(app)

# Set logging
logging.basicConfig(level=logging.INFO)

# Set PyTorch matmul precision
torch.set_float32_matmul_precision("high")

# Initialize the background remover
def init_bg_remover():
    try:
        # Just verify rembg is importable
        from rembg import new_session, remove
        app.logger.info("Background remover initialized successfully")
        return True
    except Exception as e:
        app.logger.error(f"Failed to initialize background remover: {str(e)}")
        return False

# Check if background remover is available
bg_remover_available = init_bg_remover()

@app.route('/health')
def health_check():
    """Health check endpoint"""
    try:
        if not bg_remover_available:
            return jsonify({"status": "error", "message": "Background remover not available"}), 500
        return jsonify({
            "status": "ok",
            "background_remover_available": bg_remover_available,
            "service": "Background Removal Service"
        })
    except Exception as e:
        app.logger.error(f"Health check failed: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

# Function to process an image and return transparent background
def process(image):
    if not bg_remover_available:
        raise RuntimeError("Background remover not available.")
    
    try:
        # Convert image to RGBA if not already
        if image.mode != 'RGBA':
            image = image.convert('RGBA')
        
        # Remove background
        result = remove(
            image,
            session=new_session("u2net"),  # Using u2net model which is good for general purpose
            alpha_matting=True,
            alpha_matting_foreground_threshold=240,
            alpha_matting_background_threshold=10,
            alpha_matting_erode_size=10
        )
        
        return result
    except Exception as e:
        app.logger.error(f"Error in background removal: {str(e)}")
        raise RuntimeError(f"Failed to remove background: {str(e)}")

# API Endpoints

@app.route('/upload', methods=['POST'])
def upload_image():
    try:
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
    except Exception as e:
        app.logger.error(f"Error in /upload: {str(e)}")
        return jsonify({"error": "Processing failed"}), 500

@app.route('/upload-multiple', methods=['POST'])
def upload_multiple_images():
    try:
        if 'files' not in request.files:
            return jsonify({"error": "No files uploaded"}), 400
        
        files = request.files.getlist('files')
        if not files:
            return jsonify({"error": "Empty files list"}), 400

        with tempfile.TemporaryDirectory() as temp_dir:
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

    except Exception as e:
        app.logger.error(f"Error in /upload-multiple: {str(e)}")
        return jsonify({"error": "Processing failed"}), 500

@app.route('/url', methods=['POST'])
def process_url():
    try:
        data = request.get_json()
        if not data or 'url' not in data:
            return jsonify({"error": "No URL provided"}), 400
        
        image = load_img(data['url'], output_type="pil").convert("RGB")
        processed_image = process(image)
        
        img_byte_arr = io.BytesIO()
        processed_image.save(img_byte_arr, format='PNG')
        img_byte_arr.seek(0)
        
        return send_file(img_byte_arr, mimetype='image/png')
    except Exception as e:
        app.logger.error(f"Error in /url: {str(e)}")
        return jsonify({"error": "Processing failed"}), 500

@app.route('/file', methods=['POST'])
def process_file_path():
    try:
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
    except Exception as e:
        app.logger.error(f"Error in /file: {str(e)}")
        return jsonify({"error": "Processing failed"}), 500

@app.route('/hello', methods=['GET'])
def hello():
    return jsonify({
        "message": "Hello from BGBluster API!",
        "status": "success"
    }), 200

# No debug mode here
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.logger.info(f"Starting server on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=True)