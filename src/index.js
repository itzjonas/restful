import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

import bookRouter from './routes/bookRouter.js';
import Book from './models/bookModel.js';

const { log } = console;
const app = express();
const {
    NODE_ENV,
    PORT = 80,
    MONGODB_URI,
} = process.env;

mongoose.set('strictQuery', true);

const defaultDbUri = NODE_ENV === 'development'
    ? 'mongodb://127.0.0.1:27017/bookAPI_Test'
    : 'mongodb://127.0.0.1:27017/bookAPI';

const dbUri = MONGODB_URI || defaultDbUri;

if (NODE_ENV === 'development') {
    log(`DEVELOPMENT! Connecting to ${dbUri}`);
} else {
    log(`PRODUCTION! Connecting to ${dbUri}`);
}

mongoose.connect(dbUri);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
