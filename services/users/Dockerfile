FROM node:10.22.1

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/node_modules/.bin` to $PATH
ENV PATH /usr/src/node_modules/.bin:$PATH
ENV DATABASE_URL=postgres://postgres:postgres@users-db:5432/roost_users
ENV TOKEN_SECRET=changeme

# install and cache app dependencies
ADD package.json /usr/src/app/package.json
RUN npm install

COPY . .

EXPOSE 3005

# start app
CMD ["npm", "start"]
