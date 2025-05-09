FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN pnpm run build

CMD ["pnpm", "run", "start"]