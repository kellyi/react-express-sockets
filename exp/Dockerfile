FROM node:12-alpine

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm install --quiet --no-optional

COPY . .

EXPOSE 9700

CMD [ "npm", "run", "prod-server" ]
