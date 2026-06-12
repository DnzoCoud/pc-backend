FROM node:24-alpine

WORKDIR /app

RUN apk add --no-cache wget

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]