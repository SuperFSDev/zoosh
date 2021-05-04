FROM node:lts-slim

RUN mkdir usr/src/app

WORKDIR /src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

RUN npm install

# add app
COPY . ./

EXPOSE 3000

CMD [ "npm", "start" ]