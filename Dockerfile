FROM node:16

WORKDIR /usr/app/teste-acesso

COPY ./package.json .
RUN npm install --only=prod
