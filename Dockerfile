FROM node:18.17.0
FROM npm:10.8.0

WORKDIR /src/index

COPY package*.json ./

RUN npm install

COPY . .

RUN start build

EXPOSE 3000

CMD ["npm", "start"]