FROM node:20.12
LABEL name="ashutoshh"
WORKDIR /ashuapp
COPY package.json  .
RUN npm install 
COPY .  .
CMD [ "node" , "src/index.js" ]