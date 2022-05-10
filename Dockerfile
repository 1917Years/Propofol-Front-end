FROM node:16

WORKDIR /server

COPY ./* .

CMD ["npm","init","-y"]

CMD ["npm","install"]

ENTRYPOINT ["npm","run","start"]
