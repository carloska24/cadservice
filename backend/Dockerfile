FROM node:20-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:20-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001

COPY package*.json ./

RUN npm install --only=production && npm cache clean --force

# Copy only the built artifacts and Prisma client from the build stage
COPY --from=development --chown=nestjs:nodejs /usr/src/app/dist ./dist
COPY --from=development --chown=nestjs:nodejs /usr/src/app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=development --chown=nestjs:nodejs /usr/src/app/node_modules/prisma ./node_modules/prisma
COPY --from=development --chown=nestjs:nodejs /usr/src/app/node_modules/.prisma ./node_modules/.prisma

# Copy prisma schema (needed for migrations at runtime)
COPY --chown=nestjs:nodejs prisma ./prisma

# Run as non-root user
USER nestjs

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

CMD ["node", "dist/src/main"]
