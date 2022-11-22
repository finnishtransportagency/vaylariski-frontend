# build environment
FROM node:16-alpine as builder

WORKDIR /app

COPY . .
#install packages
RUN npm i
#build the app
RUN npm run build

#prouction environment
FROM nginx:1.23.2-alpine

ARG PROXY_URL
ARG REACT_APP_BASE_REST_URL
ENV PROXY_URL=${PROXY_URL}
ENV REACT_APP_BASE_REST_URL=${REACT_APP_BASE_REST_URL}
ENV WDS_SOCKET_PORT=0

COPY --from=builder /app/build /var/www
COPY ./nginx/riski.conf.template /nginx.conf.template
# envsubst to substitute ENV variables in config
CMD ["/bin/sh" , "-c" , "envsubst < /nginx.conf.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]