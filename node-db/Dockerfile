FROM node:8

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN yarn
RUN npm i

COPY index.js .env /usr/src/app/

CMD [ "npm", "start" ]

