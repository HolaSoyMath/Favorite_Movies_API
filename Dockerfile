# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
COPY prisma ./prisma

# Install dependencies and generate Prisma client
RUN npm install
RUN npx prisma generate

# Copy all other files (source code, etc.)
COPY . .

# Expose the application port
EXPOSE 8002

# Start the application
CMD ["npm", "start"]
