FROM node:20-alpine

WORKDIR /home/wave/server

COPY . .

RUN apk add --no-cache mysql-client

RUN npm install

EXPOSE 8000 8001

CMD ["node", "app"]