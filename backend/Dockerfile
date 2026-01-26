# Build Stage
FROM node:20-slim AS builder

# Install OpenSSL for Prisma
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY package*.json ./
# Install all dependencies for build
RUN npm ci

COPY prisma ./prisma/
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build
# Prune dev dependencies
RUN npm prune --production

# Production Stage
FROM node:20-slim

# Install OpenSSL for Prisma
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

# Copy package.json for potential runtime needs
COPY package*.json ./

# Copy built assets and production modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Cloud Run defaults
ENV PORT=8080
ENV NODE_ENV=production

EXPOSE 8080

USER node

CMD ["node", "dist/main"]
