FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=4200

EXPOSE 4200

CMD ["npm","start"]

### docker build --tag diians2302/backend-node-proyecto1semi1 .
### docker push diians2302/backend-node-proyecto1semi1
### docker run -d -p 4200:4200 --name pruebackend diians2302/backend-proyectoayd1
### docker run -p 4200:4200 --name pruebackend diians2302/backend-proyectoayd1
