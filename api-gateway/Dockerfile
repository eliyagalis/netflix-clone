FROM node:18

WORKDIR /app

RUN package*.json /app

COPY . .

EXPOSE 3000

CMD ["npm", "run","dev"]