FROM node:18-alpine as develop
WORKDIR /app
COPY *.json yarn.lock ./
RUN yarn install -s
COPY src ./
VOLUME src ./src
CMD [ "yarn", "run", "start:dev" ]
