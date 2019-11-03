FROM node:8-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy list of dependencies
COPY package.json /usr/src/app/

# Install dependencies, use either yarn or npm i don't matter
RUN yarn
# RUN npm i

# Copy our actual application files
COPY . /usr/src/app

CMD [ "npm", "start" ]
