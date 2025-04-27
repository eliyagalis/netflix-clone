FROM node:18

WORKDIR /app

# RUN package*.json ./
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001

CMD ["npm", "run","dev"]