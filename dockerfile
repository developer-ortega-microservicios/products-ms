FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm config set fetch-retries 5 \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm install --legacy-peer-deps

COPY . .


EXPOSE 3001