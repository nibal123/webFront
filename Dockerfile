FROM centos:centos7
RUN yum install -y git

FROM node:latest as build
RUN git clone https://github.com/nibal123/webFront 
RUN mkdir /app
COPY package*.json /app/
WORKDIR /app
RUN npm install
COPY . /app/.
RUN npm install axios --save
RUN npm run build --prod

FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/build/.  /usr/share/nginx/html/.
RUN  rm -f /etc/nginx/sites-enabled/default

EXPOSE 80
EXPOSE 8080
#EXPOSE Backend port
CMD ["nginx"]
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
