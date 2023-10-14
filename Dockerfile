FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY src src
COPY public public
COPY next-env.d.ts tsconfig.json ./

RUN npm run build

CMD npm run start