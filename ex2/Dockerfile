FROM node:22.1.0-alpine

WORKDIR /app

COPY ./interface/package.json ./interface/package-lock.json* ./

RUN npm install

COPY ./interface .

EXPOSE 16001

CMD ["npm", "start"]
