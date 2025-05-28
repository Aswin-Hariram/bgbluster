# BGBLUSTER - Frontend

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

## 📋 Table of Contents
- [Project Overview](#-project-overview)
- [✨ Features](#-features)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [🛠 Development](#-development)
  - [Available Scripts](#available-scripts)
  - [Environment Variables](#environment-variables)
- [🏗 Project Structure](#-project-structure)
- [🔧 Configuration](#-configuration)
- [🐳 Docker Support](#-docker-support)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🌟 Project Overview

BGBLUSTER Frontend is a modern web application built with React 19, Vite, and Tailwind CSS. This project serves as the user interface for the BGBLUSTER platform, providing a responsive and interactive experience.

## ✨ Features

- ⚡ Blazing fast development with Vite
- 🎨 Beautiful UI components with Tailwind CSS
- 🔄 Hot Module Replacement (HMR)
- 🧪 Comprehensive ESLint configuration
- 🐳 Docker support for containerized deployment
- 📱 Fully responsive design

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher (or yarn/pnpm)
- Docker (optional, for containerized deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/bgbluster.git
   cd bgbluster/Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## 🛠 Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_BASE_URL=http://localhost:3000
# Add other environment variables here
```

## 🏗 Project Structure

```
Frontend/
├── public/              # Static files
├── src/                  # Source files
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── styles/          # Global styles
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main App component
│   └── main.jsx         # Application entry point
├── .dockerignore        # Docker ignore file
├── .env                 # Environment variables
├── .eslintrc.js         # ESLint configuration
├── .gitignore           # Git ignore file
├── Dockerfile           # Docker configuration
├── nginx.conf           # Nginx configuration
├── package.json         # Project dependencies
├── README.md            # This file
└── vite.config.js       # Vite configuration
```

## 🔧 Configuration

### Vite

Vite configuration can be found in `vite.config.js`. This includes:
- React plugin configuration
- Build settings
- Proxy configuration for development

### Tailwind CSS

Tailwind CSS is configured in `tailwind.config.js` with custom theme settings and plugins.

## 🐳 Docker Support

The project includes Docker configuration for containerized deployment:

1. **Build the Docker image**
   ```bash
   docker build -t bgbluster-frontend .
   ```

2. **Run the container**
   ```bash
   docker run -p 8080:80 bgbluster-frontend
   ```

The application will be available at `http://localhost:8080`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Made with ❤️ by BGBLUSTER Team
</div>
