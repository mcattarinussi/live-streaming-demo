FROM node:10.3-alpine

ENV PORT 5000
ENV HOST 0.0.0.0

COPY package.json .
COPY server.js .
COPY users.js .

RUN yarn install

VOLUME /stream

CMD ["yarn", "start"]
