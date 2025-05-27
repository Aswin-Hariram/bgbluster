#!/bin/bash

# Exit on error
set -e

# Check if DOCKER_USERNAME and DOCKER_PASSWORD are set
if [[ -z "$DOCKER_USERNAME" || -z "$DOCKER_PASSWORD" ]]; then
    echo "Error: DOCKER_USERNAME and DOCKER_PASSWORD environment variables must be set"
    exit 1
fi

# Login to Docker Hub
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

# Set the image names
BACKEND_IMAGE="${DOCKER_USERNAME}/bgbluster-backend"
FRONTEND_IMAGE="${DOCKER_USERNAME}/bgbluster-frontend"

# Build and push backend image
echo "Building and pushing backend image..."
docker buildx build \
    --platform linux/amd64,linux/arm64 \
    -t "${BACKEND_IMAGE}:latest" \
    -f Backend/Dockerfile \
    --push \
    ./Backend

# Build and push frontend image
echo "Building and pushing frontend image..."
docker buildx build \
    --platform linux/amd64,linux/arm64 \
    -t "${FRONTEND_IMAGE}:latest" \
    -f Frontend/Dockerfile \
    --push \
    ./Frontend

echo "Images built and pushed successfully!"
echo "Backend: ${BACKEND_IMAGE}:latest"
echo "Frontend: ${FRONTEND_IMAGE}:latest"

# Logout from Docker Hub
docker logout
