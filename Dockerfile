FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm i --omit=dev

COPY src src
COPY public public
COPY next-env.d.ts tsconfig.json ./

RUN npm run build

CMD npm run start