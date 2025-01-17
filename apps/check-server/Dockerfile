# check-server Dockerfile
FROM node:22

WORKDIR /apps/check-server

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 4000
CMD ["npm","run","dev"]