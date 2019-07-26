FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --quiet --no-optional

COPY . .

EXPOSE 3000

CMD [ "npm", "start"]
