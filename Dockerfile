FROM node:16-alpine as BUILD_FRONTEND

RUN mkdir -p /usr/app/
WORKDIR /usr/src/app/

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]