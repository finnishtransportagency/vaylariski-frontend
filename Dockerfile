FROM node:16-alpine

WORKDIR /app

COPY . .
ENV GENERATE_SOURCEMAP=false
#install packages
RUN npm i
#build the app
RUN npm run build


EXPOSE 3000
CMD ["npx", "serve", "-s", "build" ]