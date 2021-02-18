FROM node:lts-slim

RUN mkdir usr/src/app

WORKDIR /src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

COPY package-lock.json ./

RUN npm install

# add app
COPY . ./

EXPOSE 4000

# You can change this
CMD [ "npm", "run", "server" ]