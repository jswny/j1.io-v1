FROM node:argon
RUN mkdir -p /usr/src/j1.io
WORKDIR /usr/src/j1.io
COPY package.json /usr/src/j1.io
RUN npm install
COPY . /usr/src/j1.io
RUN npm build
EXPOSE 3000
CMD ["npm", "start"]
