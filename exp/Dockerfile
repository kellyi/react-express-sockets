FROM node:12-alpine

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm install pm2 -g

RUN npm install --quiet --no-optional

COPY . .

EXPOSE 9700

CMD ["pm2-runtime", "src/server.js"]
