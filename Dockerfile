# "Global variables"
ARG PROXY_URL
ARG REACT_APP_BASE_REST_URL

# build environment
FROM node:24-alpine AS builder

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
RUN npm ci

#build the app
RUN npm run build

# set access rights for distributed files
RUN chmod a+r -R /app/dist
RUN find /app/dist -name "*.js" -exec chmod +x {} +
RUN find /app/dist -name "*.css" -exec chmod +x {} +
RUN find /app/dist -name "*.html" -exec chmod +x {} +

# substitute nginx variables (PROXY_URL, REACT_APP_BASE_REST_URL) in config at build time
RUN cp /app/nginx/riski.conf.template /app/nginx/nginx.conf
RUN sed -i 's|!REACT_APP_BASE_REST_URL!|'${REACT_APP_BASE_REST_URL}'|' /app/nginx/nginx.conf
RUN sed -i 's|!PROXY_URL!|'${PROXY_URL}'|' /app/nginx/nginx.conf

# production environment
FROM nginx:1.29-alpine

RUN ["apk", "upgrade", "--no-cache"]

COPY --from=builder /app/dist /var/www
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/nginx.conf

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

# substitute nameserver url in nginx conf at runtime
CMD [ "/bin/sh", "-c", "sed -i 's|!NAMESERVER!|'$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}')'|' /etc/nginx/nginx.conf \
  && exec nginx -g 'daemon off;'" ]
