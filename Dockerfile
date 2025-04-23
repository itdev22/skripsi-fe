FROM node:20.18.1

# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# Copying this separately prevents re-running npm install on every code change
COPY . .

RUN yarn

RUN yarn build

CMD node .output/server/index.mjs


EXPOSE 3000