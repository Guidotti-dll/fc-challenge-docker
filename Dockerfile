FROM node:15

RUN echo "deb http://archive.debian.org/debian stretch main" > /etc/apt/sources.list
RUN apt update -y
RUN  apt-get install -y wget netcat
RUN wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for 
RUN chmod 777 /usr/bin/wait-for

USER node

WORKDIR /home/node/app
