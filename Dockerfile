FROM node:10-alpine

LABEL org.label-schema.vcs-url="https://github.com/ajmyyra/telltale"

WORKDIR /usr/src/app

COPY . /usr/src/app

CMD [ "npm", "start" ]