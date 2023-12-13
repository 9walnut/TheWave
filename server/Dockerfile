FROM node:20-alpine

WORKDIR /home/wave/server

COPY . .

RUN npm install

EXPOSE 8000

CMD ["node", "app"]