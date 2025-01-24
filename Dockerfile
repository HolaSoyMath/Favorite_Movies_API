# Use Node.js 18 as the base image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package and Prisma files
COPY package*.json ./
COPY prisma ./prisma/

# Install OpenSSL and dependencies
RUN apt-get update -y && apt-get install -y openssl

# Install Node.js dependencies
RUN npm install

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Expose the port your app runs on
EXPOSE 3333

# Start the application
CMD ["npm", "start"]
