FROM node

WORKDIR /app

COPY ./package.json ./

RUN npm install

RUN npm install dotenv

RUN npm install bcryptjs

RUN npm install jsonwebtoken

COPY ./ ./

EXPOSE 9000

CMD ["npm", "run", "start"]
