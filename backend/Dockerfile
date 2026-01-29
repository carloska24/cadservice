FROM node:20-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:20-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=development /usr/src/app/node_modules/prisma ./node_modules/prisma
COPY --from=development /usr/src/app/node_modules/.bin ./node_modules/.bin
COPY --from=development /usr/src/app/node_modules/.prisma ./node_modules/.prisma

CMD ["node", "dist/src/main"]
