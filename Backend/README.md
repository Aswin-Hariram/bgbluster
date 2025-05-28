# BGBluster - Background Removal API

A high-performance background removal service using the U2Net model. This API provides endpoints to remove backgrounds from images with high quality and accuracy.

## Features

- 🚀 Fast and accurate background removal
- 🔄 Supports single and multiple image processing
- 🌐 Process images via file upload, URL, or local file path
- 🖼️ Returns transparent PNG images
- 🧩 Easy-to-use REST API

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Backend
   ```

2. Create and activate a virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Download the BiRefNet model (will happen automatically on first run)

## Running the Server

### Development Mode
```bash
python app.py
```

The server will start on `http://0.0.0.0:8001` by default.

### Production Mode
For production, it's recommended to use Gunicorn with multiple workers:
```bash
gunicorn --bind 0.0.0.0:8001 app:app --timeout 120 --workers 4 --worker-class sync
```

### Using Docker
Build and run the application using Docker:
```bash
docker build -t bgbluster-backend .
docker run -p 8001:8001 bgbluster-backend
```

## API Endpoints

### 1. Health Check
Check if the service is running and the background remover is available.

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "ok",
  "background_remover_available": true,
  "service": "Background Removal Service"
}
```

### 2. Upload Single Image
Remove background from a single uploaded image.

**Endpoint:** `POST /upload`

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `file` - The image file to process

**Response:**
- Content-Type: `image/png`
- Body: Processed image with transparent background (PNG format)

### 3. Upload Multiple Images
Remove background from multiple uploaded images.

**Endpoint:** `POST /upload-multiple`

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `files` - Multiple image files to process

**Response:**
- Content-Type: `application/zip`
- Body: ZIP archive containing all processed images with transparent backgrounds
- Download filename: `processed_images.zip`

### 4. Process Image from URL
Remove background from an image specified by URL.

**Endpoint:** `POST /url`

**Request:**
- Method: `POST`
- Content-Type: `application/json`
- Body: 
  ```json
  {
    "url": "https://example.com/image.jpg"
  }
  ```

**Response:**
- Content-Type: `image/png`
- Body: Processed image with transparent background (PNG format)

### 5. Process Local Image
Remove background from an image on the server.

**Endpoint:** `POST /file`

**Request:**
- Method: `POST`
- Content-Type: `application/json`
- Body: 
  ```json
  {
    "path": "/path/to/image.jpg"
  }
  ```

**Response:**
- Content-Type: `application/json`
- Body: 
  ```json
  {
    "output_path": "/path/to/image_processed.png"
  }
  ```

## Example Usage

### Python
```python
import requests

# Health check
response = requests.get('http://localhost:8001/health')
print(response.json())

# Upload single image
with open('image.jpg', 'rb') as f:
    response = requests.post('http://localhost:8001/upload', files={'file': f})
    with open('output.png', 'wb') as out:
        out.write(response.content)

# Upload multiple images
files = [('files', ('image1.jpg', open('image1.jpg', 'rb'), 'image/jpeg')),
         ('files', ('image2.jpg', open('image2.jpg', 'rb'), 'image/jpeg'))]
response = requests.post('http://localhost:8001/upload-multiple', files=files)
with open('processed_images.zip', 'wb') as f:
    f.write(response.content)

# Process from URL
response = requests.post(
    'http://localhost:8001/url',
    json={'url': 'https://example.com/image.jpg'}
)
with open('output.png', 'wb') as f:
    f.write(response.content)
```

### cURL
```bash
# Health check
curl http://localhost:8001/health

# Upload single image
curl -X POST -F "file=@image.jpg" http://localhost:8001/upload -o output.png

# Upload multiple images
curl -X POST -F "files=@image1.jpg" -F "files=@image2.jpg" \
     http://localhost:8001/upload-multiple -o processed_images.zip

# Process from URL
curl -X POST -H "Content-Type: application/json" \
     -d '{"url":"https://example.com/image.jpg"}' \
     http://localhost:8001/url -o output.png
```

## Error Handling

The API returns appropriate HTTP status codes and JSON error messages:
- `400 Bad Request`: Invalid input or missing parameters
  ```json
  {
    "error": "No file uploaded"
  }
  ```
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side error during processing
  ```json
  {
    "error": "Processing failed"
  }
  ```
  
Detailed error messages are logged on the server side.

## Model Details

This service uses the U2Net model for high-quality background removal. The model is automatically downloaded on first run and cached in the `.u2net` directory.

## Environment Variables

- `PORT`: Port to run the server on (default: `8001`)
- `HOST`: Host to bind to (default: `0.0.0.0`)
- `U2NET_HOME`: Directory to store U2Net model files (default: `./.u2net`)

## License

MIT

---

*Note: This is a production-ready API service. For development purposes, you may want to adjust the logging level and error handling as needed.*