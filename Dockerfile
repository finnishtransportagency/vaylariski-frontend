FROM node:16-alpine

WORKDIR /app

COPY . .
ENV GENERATE_SOURCEMAP=false
#install packages
RUN npm ci
#build the app
RUN npm run build


EXPOSE 3000
CMD [ "serve", "-s", "build" ]