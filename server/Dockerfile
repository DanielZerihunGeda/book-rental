# Use the official Node.js image as the base image
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Port
EXPOSE 5000

CMD ["node", "server.js"]