FROM node as build

WORKDIR /app

COPY ./package.json ./

RUN npm install

RUN npm install axios

COPY ./ ./

EXPOSE 80

CMD ["npm", "run", "dev"]
