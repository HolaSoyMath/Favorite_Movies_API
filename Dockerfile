# Use Node.js como imagem base
FROM node:18-slim

# Diretório de trabalho no container
WORKDIR /app

# Copiar arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar dependências do sistema necessárias para o Prisma
RUN apt-get update -y && apt-get install -y openssl

# Instalar dependências do Node.js
RUN npm install

# Copiar o restante do código, incluindo o diretório `prisma`
COPY . .

# Gerar o Prisma Client
RUN npx prisma generate --schema=./prisma/schema.prisma

# Compilar o TypeScript para JavaScript
RUN npm run build

# Expõe a porta do servidor
EXPOSE 8002

# Inicia a aplicação usando o JavaScript gerado
CMD ["npx", "dotenv", "-e", ".env", "npm", "start"]
