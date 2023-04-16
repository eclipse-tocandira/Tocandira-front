# Build environment
FROM node:13-alpine as build
USER root

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package-lock.json /app/package-lock.json
COPY package.json /app/package.json
RUN npm ci

COPY . /app
RUN npm run build

# Production environment
FROM nginx:1.16.0-alpine
USER root

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/*
COPY ./config/nginx.conf /etc/nginx/conf.d/

ENV GROUP_ID=1000
ENV USER_ID=1000

RUN addgroup -g $GROUP_ID front
RUN adduser -D -u $USER_ID -G front front -s /bin/s

RUN chown -R front:front /run
RUN chown -R front:front /var/cache/nginx
RUN chown -R front:front /usr/share/nginx

EXPOSE 8000

USER front
CMD ["nginx", "-g", "daemon off;"]