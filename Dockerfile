FROM node:16

WORKDIR /server

COPY . .

RUN ["npm","init","-y"]

RUN ["npm","install"]

ENTRYPOINT ["npm","run","start"]
