# RESTful

A modern RESTful application with [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS) using [Node.js](https://nodejs.org/en/) (ES Modules), [Express](https://expressjs.com/), and [MongoDB](https://www.mongodb.com/).

## Prerequisites

### Node.js
Node.js >= 20 is recommended (see `.nvmrc`).

### MongoDB
Ensure MongoDB is installed and running locally:

```sh
brew services start mongodb-community
```

To seed initial sample data:
```sh
mongosh bookAPI < booksJson.js
```

## Getting Started

### Install Dependencies
```sh
yarn
```

### Environment Configuration (Optional)
You can configure environment variables via a `.env` file or shell variables:
- `PORT`: Server port (default: `80` or `4000` under dev)
- `MONGODB_URI`: MongoDB connection string (e.g. `mongodb://127.0.0.1:27017/bookAPI`)
- `NODE_ENV`: Environment mode (`development` or `production`)

### Run Development Server
```sh
yarn dev
```

### Run Production Server
```sh
yarn start
```

### Run Tests
```sh
yarn tests
```

### Linting
```sh
yarn lint
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/books` | Get all books (filter by `?genre=...`) |
| `POST` | `/api/books` | Create a new book |
| `GET` | `/api/books/:bookId` | Get a specific book with HATEOAS links |
| `PUT` | `/api/books/:bookId` | Replace/update a book |
| `PATCH` | `/api/books/:bookId` | Partially update a book |
| `DELETE` | `/api/books/:bookId` | Delete a book |
