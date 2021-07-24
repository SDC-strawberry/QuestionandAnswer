FROM node:latest
RUN mkdir -p /app/src
WORKDIR /app/src
COPY package.json .
RUN npm install
COPY . /app/src
EXPOSE 3000
RUN node index.js 