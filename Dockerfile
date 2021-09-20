FROM node:14
COPY package* tsconfig.json /tmp
COPY src/ /tmp/src
COPY public/ /tmp/public
RUN ls /tmp
WORKDIR /tmp
RUN npm ci
RUN npm run build
FROM nginx:latest
COPY --from=0 /tmp/build /usr/share/nginx/html
