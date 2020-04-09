# RESTful

A basic RESTful application with [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS) using [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/).

## Prerequisites

### MongoDB

You'll need the community edition of MongoDB install before running this application. To do this run the following commands in terminal:

```sh
brew update

brew tap mongodb/brew

brew install mongodb-community
```

After installing MongoDB, you'll have to manually create where it saves the databases. This is thanks in part to changes made in macOS 10.15. To do this run the following command in terminal:

```sh
sudo mkdir -p /data/db
```

Next, you'll want to let MongoDB know where this is. To do this with [Visual Studio Code](https://code.visualstudio.com/), open up the config file as such:

```sh
code /usr/local/etc/mongod.conf
```

Now make the following change, replacing `<username>` with your username:

```
storage:
  dbPath: /Users/<username>/data/db
```

Before we can start using the application we'll also need to install a dummy database. From terminal run:

```sh
mongo bookAPI < booksJson.js
```

### Install Dependencies

```sh
yarn
```

### Build the Server

```sh
yarn build
```

## Starting the RESTful API

After build the application and installing MongoDB, start the application by running the following in terminal:

```sh
yarn start
```
