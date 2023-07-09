FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x /usr/src/app/wait-for-it.sh

EXPOSE 8080

CMD /usr/src/app/wait-for-it.sh backend-db-1:3306 -- npm run dev