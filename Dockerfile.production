FROM node:18-alpine as builder
WORKDIR /app
COPY *.json yarn.lock ./
RUN yarn install -s
COPY src ./
RUN yarn build

FROM node:18-alpine as running
WORKDIR /app
COPY --from=builder /app ./
EXPOSE ${API_PORT}
CMD [ "yarn", "run", "start:prod" ]
