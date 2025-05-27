# Step 1: Build the React (Vite) app
ARG NODE_VERSION=18-alpine
FROM --platform=$TARGETPLATFORM node:${NODE_VERSION} AS builder

# Set build arguments
ARG TARGETPLATFORM
ARG BUILDPLATFORM

RUN echo "Building for $TARGETPLATFORM on $BUILDPLATFORM"

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .


# Build the app (for Vite, output goes to /app/dist)
RUN npm run build

# Step 2: Serve the app using NGINX
FROM nginx:alpine

# Remove default NGINX static files
RUN rm -rf /usr/share/nginx/html/*

# Copy the build from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: Custom NGINX configuration
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static files (optional: if you have favicon, robots.txt, etc.)
# COPY public /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
