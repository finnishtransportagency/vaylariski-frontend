FROM node:16-alpine

ARG PROXY_URL
ARG REACT_APP_BASE_REST_URL

WORKDIR /app

COPY . .
ENV GENERATE_SOURCEMAP=false
ENV PROXY_URL=${PROXY_URL}
ENV REACT_APP_BASE_REST_URL=${REACT_APP_BASE_REST_URL}
#install packages
RUN npm i
#build the app
# RUN npm run build


EXPOSE 3000
# CMD ["npx", "serve", "-l", "3000", "-s", "build" ]
CMD ["npm", "start"]