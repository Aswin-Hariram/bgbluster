#!/bin/bash

# Exit on any error
set -e

# Check if DOCKER_HUB_USERNAME and DOCKER_HUB_ACCESS_TOKEN are set
if [ -z "${DOCKER_HUB_USERNAME}" ] || [ -z "${DOCKER_HUB_ACCESS_TOKEN}" ]; then
  echo "Error: DOCKER_HUB_USERNAME and DOCKER_HUB_ACCESS_TOKEN environment variables must be set"
  exit 1
fi

# Login to Docker Hub
echo "${DOCKER_HUB_ACCESS_TOKEN}" | docker login -u "${DOCKER_HUB_USERNAME}" --password-stdin

# Build and push backend
echo "Building and pushing backend image..."
cd Backend
docker build -t ${DOCKER_HUB_USERNAME}/bgbluster-backend:latest .
docker push ${DOCKER_HUB_USERNAME}/bgbluster-backend:latest
cd ..

# Build and push frontend
echo "Building and pushing frontend image..."
cd Frontend
docker build -t ${DOCKER_HUB_USERNAME}/bgbluster-frontend:latest .
docker push ${DOCKER_HUB_USERNAME}/bgbluster-frontend:latest
cd ..

echo "Successfully built and pushed all images to Docker Hub"