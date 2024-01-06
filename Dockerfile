FROM node:21

WORKDIR /app

COPY package.json .

RUN yarn

COPY prisma ./prisma

RUN yarn gen

COPY . .

# For Production only
RUN yarn build

EXPOSE 3000

CMD [ "yarn" , "start"]