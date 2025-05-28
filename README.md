# BGBLUSTER

A background removal application with a React frontend and Flask backend.

## Prerequisites

- Docker and Docker Compose
- Node.js and npm (for local development)
- Python 3.9+ (for local development)

## Getting Started

### Using Docker Compose (Recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bgbluster.git
   cd bgbluster
   ```

2. Start the application:
   ```bash
   docker-compose up -d
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

### Building and Pushing Docker Images

#### Using the build_and_push.sh script:

1. Make the script executable (if not already):
   ```bash
   chmod +x build_and_push.sh
   ```

2. Set your Docker Hub credentials as environment variables:
   ```bash
   export DOCKER_HUB_USERNAME=yourusername
   export DOCKER_HUB_ACCESS_TOKEN=your-access-token
   ```

3. Run the script:
   ```bash
   ./build_and_push.sh
   ```

#### Manual Build and Push:

1. Build and push the backend:
   ```bash
   cd Backend
   docker build -t yourusername/bgbluster-backend:latest .
   docker push yourusername/bgbluster-backend:latest
   cd ..
   ```

2. Build and push the frontend:
   ```bash
   cd Frontend
   docker build -t yourusername/bgbluster-frontend:latest .
   docker push yourusername/bgbluster-frontend:latest
   cd ..
   ```

## GitHub Actions CI/CD

This project includes a GitHub Actions workflow that automatically builds and pushes Docker images to Docker Hub on every push to the `main` branch.

### Required Secrets

Set the following secrets in your GitHub repository (Settings > Secrets > Actions):

- `DOCKER_HUB_USERNAME`: Your Docker Hub username
- `DOCKER_HUB_ACCESS_TOKEN`: Your Docker Hub access token

### Manual Trigger

You can also manually trigger the workflow from the Actions tab in your GitHub repository.

## Project Structure

- `Frontend/`: React application
- `Backend/`: Flask API server
- `.github/workflows/`: GitHub Actions workflow definitions
- `docker-compose.yml`: Docker Compose configuration for local development

## License

This project is licensed under the MIT License - see the LICENSE file for details.
