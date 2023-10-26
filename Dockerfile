FROM node:20-alpine

WORKDIR /src
RUN chown -R node:node /src

USER node

ADD package.json /src/
ADD package-lock.json /src/

RUN npm ci --unsafe-perm

ADD . /src/

CMD ["npm", "start"]
