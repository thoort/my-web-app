FROM ubuntu
RUN apt-get update
RUN apt-get install -y --no-install-recommends nodejs npm
WORKDIR my-web-app
COPY . .
RUN npm install
CMD node server.js
