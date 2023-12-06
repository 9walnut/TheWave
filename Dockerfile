FROM node:18.14.2

COPY . .

RUN npm install

CMD ["node", "app"]