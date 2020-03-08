# build stage
FROM node:10.16-alpine as build-stage

# Create app folder
RUN mkdir /app
WORKDIR /app

# Install git, nginx, nano, bash
RUN apk update && apk upgrade && \
	apk add --no-cache git bash nano

# Copy all files to app folder
COPY . /app

RUN npm install --progress=false
# Environment app
ARG VUE_APP_BASE_API
ENV VUE_APP_BASE_API $VUE_APP_BASE_API
RUN npm run build:prod

# production stage
FROM nginx:stable-alpine as production-stage

# Environment app
ARG VUE_APP_BASE_API
ENV VUE_APP_BASE_API $VUE_APP_BASE_API

COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
