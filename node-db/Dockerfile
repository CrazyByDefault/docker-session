FROM node:8-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy list of dependencies
COPY package.json /usr/src/app/

# Install dependencies
RUN npm i

# Copy our actual application files
COPY index.js .env /usr/src/app/

CMD [ "npm", "start" ]
