FROM node:16.13-alpine
WORKDIR "/app"
COPY package*.json ./
RUN npm install
RUN npm install pm2
RUN ./node_modules/.bin/pm2 install typescript
COPY . . 
CMD ["./node_modules/.bin/pm2-runtime","start","./src/index.ts","--watch"]
