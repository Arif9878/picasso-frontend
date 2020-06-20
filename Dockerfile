# build stage
FROM node:10.16-alpine as build-stage

# Create app folder
RUN mkdir /app
WORKDIR /app

# Copy all files to app folder
COPY .babelrc .
COPY package*.json ./
RUN npm install --progress=false
COPY . /app
# Environment app
ARG VUE_APP_SECURE
ARG VUE_APP_BASE_API
ARG VUE_APP_BASE_API_PORT
ARG VUE_APP_SECRET_CLIENT_GOOGLE

ENV VUE_APP_SECURE $VUE_APP_SECURE
ENV VUE_APP_BASE_API $VUE_APP_BASE_API
ENV VUE_APP_BASE_API_PORT $VUE_APP_BASE_API_PORT
ENV VUE_APP_SECRET_CLIENT_GOOGLE $VUE_APP_SECRET_CLIENT_GOOGLE

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
