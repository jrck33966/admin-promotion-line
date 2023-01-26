FROM node:16.13.2

WORKDIR /app
# install app dependencies
COPY package.json /app
COPY package-lock.json /app

RUN npm install
 
# add app
COPY . /app
EXPOSE 3006
 
# start app
CMD ["npm", "start"]


