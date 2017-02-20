FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y sqlite3
RUN apt-get install -y libsqlite3-dev
RUN apt-get install -y python-software-properties
RUN apt-get install -y curl

RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs

WORKDIR /src
ADD . .

RUN npm install

EXPOSE 3000
CMD ["npm", "run", "prod"]
