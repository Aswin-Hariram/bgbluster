# Multi-architecture Docker Deployment

This guide explains how to build and push multi-architecture Docker images for both frontend and backend services.

## Prerequisites

- Docker installed and running
- Docker Buildx enabled (included with recent Docker Desktop versions)
- Docker Hub account (for pushing images)

## Building Multi-architecture Images

### 1. Build the images locally

```bash
./build_and_push.sh --username=yourdockerhubusername --version=1.0.0
```

This will build both frontend and backend images for `linux/amd64` and `linux/arm64` platforms.

The images will be tagged as:
- `yourdockerhubusername/bgbluster-frontend:1.0.0`
- `yourdockerhubusername/bgbluster-backend:1.0.0`

### 2. Push to Docker Hub

To push the built images to Docker Hub:

```bash
./build_and_push.sh --username=yourdockerhubusername --version=1.0.0 --push
```

### 3. Using the Images

You can pull and run the multi-architecture images on any supported platform:

```bash
# Frontend
docker run -p 80:80 yourdockerhubusername/bgbluster-frontend:1.0.0

# Backend
docker run -p 8000:8000 yourdockerhubusername/bgbluster-backend:1.0.0
```

## Docker Compose for Production

A `docker-compose.build.yml` file is provided for production deployment. Update the image names with your Docker Hub username and version before using:

```bash
docker-compose -f docker-compose.build.yml up -d
```

## Notes

- The build script automatically detects and uses the appropriate platform for building
- For ARM-based systems (like Apple Silicon), the build will be faster when building natively
- The `--load` flag is used to make the built images available locally. For remote builds, you can remove this flag.