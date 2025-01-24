# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose application port
EXPOSE 8002

# Define environment variables for Render
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Start the application
CMD ["npm", "run", "start:prod"]
