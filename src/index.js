/* eslint-disable no-unused-vars */
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import bookRouter from './routes/bookRouter';
import Book from './models/bookModel';

const { log } = console;
const app = express();
const {
    NODE_ENV,
    PORT = 80,
} = process.env;

if (NODE_ENV === 'development') {
    log('DEVELOPMENT!');
    mongoose.connect('mongodb://localhost/bookAPI_Test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
} else {
    log('PRODUCTION!');
    mongoose.connect('mongodb://localhost/bookAPI', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter(Book));

app.all('*', (req, res) => {
    res.status(404).send({
        error: `${req.originalUrl} not found, try https://${req.headers.host}/api/books`,
    });
});

app.server = app.listen(PORT, () => {
    log(`Now running at: http://localhost:${PORT}/api/books`);
});

export default app;
