# Background Removal API

A high-performance background removal service using the BiRefNet model. This API provides endpoints to remove backgrounds from images with high quality and accuracy.

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

The server will start on `http://0.0.0.0:8000` by default.

### Production Mode
For production, it's recommended to use Gunicorn with multiple workers:
```bash
gunicorn --workers 4 --bind 0.0.0.0:8000 app:app
```

## API Endpoints

### 1. Upload Single Image
Remove background from a single uploaded image.

**Endpoint:** `POST /upload`

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` - The image file to process

**Response:**
- Returns the processed image with transparent background (PNG format)

### 2. Upload Multiple Images
Remove background from multiple uploaded images.

**Endpoint:** `POST /upload-multiple`

**Request:**
- Content-Type: `multipart/form-data`
- Body: `files` - Multiple image files to process

**Response:**
- Returns a ZIP archive containing all processed images with transparent backgrounds

### 3. Process Image from URL
Remove background from an image specified by URL.

**Endpoint:** `POST /url`

**Request:**
- Content-Type: `application/json`
- Body: `{ "url": "https://example.com/image.jpg" }`

**Response:**
- Returns the processed image with transparent background (PNG format)

### 4. Process Local Image
Remove background from an image on the server.

**Endpoint:** `POST /file`

**Request:**
- Content-Type: `application/json`
- Body: `{ "path": "/path/to/image.jpg" }`

**Response:**
- Returns the processed image with transparent background (PNG format)

## Example Usage

### Python
```python
import requests

# Upload single image
with open('image.jpg', 'rb') as f:
    response = requests.post('http://localhost:8000/upload', files={'file': f})
    with open('output.png', 'wb') as out:
        out.write(response.content)

# Process from URL
response = requests.post(
    'http://localhost:8000/url',
    json={'url': 'https://example.com/image.jpg'}
)
with open('output.png', 'wb') as f:
    f.write(response.content)
```

### cURL
```bash
# Upload single image
curl -X POST -F "file=@image.jpg" http://localhost:8000/upload -o output.png

# Process from URL
curl -X POST -H "Content-Type: application/json" \
     -d '{"url":"https://example.com/image.jpg"}' \
     http://localhost:8000/url -o output.png
```

## Error Handling

The API returns appropriate HTTP status codes and JSON error messages:
- `400 Bad Request`: Invalid input or missing parameters
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side error during processing

## Model Details

This service uses the BiRefNet model for high-quality background removal. The model is automatically downloaded on first run and cached locally.

## License

MIT

---

*Note: This is a production-ready API service. For development purposes, you may want to adjust the logging level and error handling as needed.*