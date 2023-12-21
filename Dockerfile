# "Global variables"
ARG PROXY_URL
ARG REACT_APP_BASE_REST_URL

# build environment
FROM node:16-alpine as builder

# Used by react on build time
ARG PROXY_URL
ARG REACT_APP_BASE_REST_URL

ENV PROXY_URL=${PROXY_URL}
ENV REACT_APP_BASE_REST_URL=${REACT_APP_BASE_REST_URL}
RUN echo ${PROXY_URL}
RUN echo ${REACT_APP_BASE_REST_URL}

WORKDIR /app

COPY . .
#install packages
RUN npm i
#build the app
RUN npm run build

# production environment
FROM nginx:1.25.3-alpine

RUN ["apk", "upgrade", "--no-cache"]

# Used by nginx
ARG PROXY_URL
ARG REACT_APP_BASE_REST_URL

ENV PROXY_URL=${PROXY_URL}
ENV REACT_APP_BASE_REST_URL=${REACT_APP_BASE_REST_URL}
RUN echo ${PROXY_URL}
RUN echo ${REACT_APP_BASE_REST_URL}

COPY --from=builder /app/build /var/www
COPY ./nginx/riski.conf.template /nginx.conf.template

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

# envsubst to substitute ENV variables in config
CMD ["/bin/sh" , "-c" , "envsubst < /nginx.conf.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]
