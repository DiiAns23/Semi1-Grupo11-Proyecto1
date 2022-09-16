FROM mhart/alpine-node:16 AS builder

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn run build

FROM nginx:1.16.0-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY deploy/nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]

### docker build --tag diians2302/frontend-react-proyecto1semi1 .
### docker push diians2302/frontend-react-proyecto1semi1
### docker run -d -p 4200:4200 --name pruebackend diians2302/frontend-react-proyecto1semi1
### docker run -p 4200:4200 --name pruebackend diians2302/frontend-react-proyecto1semi1

