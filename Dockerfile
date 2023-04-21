# Build environment
FROM node:13-alpine as build
USER root

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package-lock.json /app/package-lock.json
COPY package.json /app/package.json
RUN npm ci

COPY ./public /app/public
COPY ./src /app/src

RUN npm run build

# Production environment
FROM nginx:1.16.0-alpine
USER root

ENV GROUP_ID=1000
ENV USER_ID=1000

RUN addgroup -g $GROUP_ID front
RUN adduser -D -u $USER_ID -G front front -s /bin/s

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/*
COPY ./scripts/nginx.conf /etc/nginx/conf.d/
COPY ./scripts/entrypoint.sh /entrypoint.sh

RUN chown -R front:front /run /var/cache/nginx /usr/share/nginx /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV BACKEND_URL="http://localhost:8000"
ENV ROOT_PATH=""

EXPOSE 8000

USER front
ENTRYPOINT ["/entrypoint.sh"]