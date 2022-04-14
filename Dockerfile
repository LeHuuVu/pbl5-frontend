FROM node:latest

RUN mkdir -p /frontend/scr

WORKDIR /frontend/scr

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn config set network-timeout 300000

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "serve"]
