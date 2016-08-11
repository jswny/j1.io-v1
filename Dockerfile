FROM node:argon
RUN mkdir -p /usr/src/j1.io
WORKDIR /usr/src/j1.io
COPY package.json /usr/src/j1.io
RUN npm install
RUN npm install -g gulp
COPY . /usr/src/j1.io
RUN gulp build
EXPOSE 3000
CMD ["NODE_ENV=production", "npm", "start"]
