<div align="center">
  <h1>BGBLUSTER</h1>
    <img src="https://github.com/user-attachments/assets/3486958c-f663-4ab4-a569-44642128340d"  />
<p align="center">
 
  <img src="https://github.com/user-attachments/assets/06fb14ad-2201-4d58-bb8a-6cd0015b50bf" height="auto" width="45%" />
  <img src="https://github.com/user-attachments/assets/89f9371b-d42e-4395-a22e-93e1308eac8d"  height="auto" width="45%" />
</p>
  <p>✨ Advanced Background Removal Application with React Frontend and Flask Backend ✨</p>
  
  <div>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask" />
    <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </div>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![GitHub stars](https://img.shields.io/github/stars/yourusername/bgbluster?style=social)](https://github.com/yourusername/bgbluster/stargazers)
  [![GitHub issues](https://img.shields.io/github/issues/yourusername/bgbluster)](https://github.com/yourusername/bgbluster/issues)
</div>

## 📋 Table of Contents
- [🚀 Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [📦 Prerequisites](#-prerequisites)
- [🚀 Getting Started](#-getting-started)
  - [Using Docker Compose (Recommended)](#using-docker-compose-recommended)
  - [Local Development](#-local-development)
- [🐳 Docker Deployment](#-docker-deployment)
  - [Using build_and_push.sh](#using-build_and_pushsh)
  - [Manual Build and Push](#manual-build-and-push)
- [🤖 CI/CD with GitHub Actions](#-cicd-with-github-actions)
- [📂 Project Structure](#-project-structure)
- [🌐 API Documentation](#-api-documentation)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)

## ✨ Features

- 🖼️ High-quality background removal from images
- ⚡ Fast processing with optimized algorithms
- 🎨 Clean and intuitive user interface
- 🔄 Real-time preview of results
- 📱 Fully responsive design
- 🔒 Secure file handling
- 🐳 Containerized with Docker
- 🔄 CI/CD pipeline with GitHub Actions

## 🛠 Tech Stack

### Frontend

<div align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/React_Icons-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React Icons" />
</div>

### Backend

<div align="left">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask" />
  <img src="https://img.shields.io/badge/OpenCV-27338e?style=for-the-badge&logo=OpenCV&logoColor=white" alt="OpenCV" />
  <img src="https://img.shields.io/badge/Numpy-013243?style=for-the-badge&logo=numpy&logoColor=white" alt="NumPy" />
  <img src="https://img.shields.io/badge/Pillow-013243?style=for-the-badge&logo=python&logoColor=white" alt="Pillow" />
</div>

### DevOps

<div align="left">
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" alt="GitHub Actions" />
  <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" alt="Nginx" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white" alt="Prettier" />
</div>

## 📦 Prerequisites

- Docker and Docker Compose
- Node.js 18+ and npm/yarn (for local frontend development)
- Python 3.9+ and pip (for local backend development)
- Git

## 🚀 Getting Started

### Using Docker Compose (Recommended)

The easiest way to get started is using Docker Compose:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/bgbluster.git
   cd bgbluster
   ```

2. **Start the application**:
   ```bash
   docker-compose up -d
   ```

3. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

4. **View logs**:
   ```bash
   docker-compose logs -f
   ```

### 🖥️ Local Development

If you prefer to run the services locally:

#### Frontend

```bash
cd Frontend
npm install
npm run dev
```

#### Backend

```bash
cd Backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## 🐳 Docker Deployment

### Using build_and_push.sh

1. Make the script executable:
   ```bash
   chmod +x build_and_push.sh
   ```

2. Set your Docker Hub credentials:
   ```bash
   export DOCKER_HUB_USERNAME=yourusername
   export DOCKER_HUB_ACCESS_TOKEN=your-access-token
   ```

3. Run the script:
   ```bash
   ./build_and_push.sh
   ```

### Manual Build and Push

#### Backend
```bash
cd Backend
docker build -t yourusername/bgbluster-backend:latest .
docker push yourusername/bgbluster-backend:latest
cd ..
```

#### Frontend
```bash
cd Frontend
docker build -t yourusername/bgbluster-frontend:latest .
docker push yourusername/bgbluster-frontend:latest
cd ..
```

## 🤖 CI/CD with GitHub Actions

This project includes GitHub Actions workflows that automatically:
- Build and test on every push
- Build and push Docker images to Docker Hub on push to `main`
- Run security scans

### Required Secrets

Set these in your GitHub repository (Settings > Secrets > Actions):

- `DOCKER_HUB_USERNAME`: Your Docker Hub username
- `DOCKER_HUB_ACCESS_TOKEN`: Your Docker Hub access token

## 📂 Project Structure

```
bgbluster/
├── Frontend/               # React frontend application
│   ├── public/            # Static files
│   ├── src/               # Source files
│   ├── Dockerfile         # Production Dockerfile
│   └── ...
├── Backend/               # Flask backend application
│   ├── app/               # Application code
│   ├── tests/             # Test files
│   ├── Dockerfile         # Production Dockerfile
│   └── ...
├── .github/workflows/     # GitHub Actions workflows
├── docker-compose.yml     # Development environment
├── docker-compose.prod.yml # Production environment
├── build_and_push.sh      # Build and push script
└── README.md             # This file
```

## 🌐 API Documentation

Once the backend is running, access the interactive API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Flask](https://flask.palletsprojects.com/)
- [Docker](https://www.docker.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

---

<div align="center">
  Made with ❤️ by BGBLUSTER Team
</div>
