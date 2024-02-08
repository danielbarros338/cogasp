FROM node:20.10.0-alpine

RUN mkdir -p /usr/src/backend/cogasp
WORKDIR /usr/src/backend/cogasp

RUN apk update && apk upgrade
RUN apk add git
RUN apk add yarn

COPY . /usr/src/backend/cogasp
RUN yarn install

EXPOSE 3030

CMD ["yarn", "start"]