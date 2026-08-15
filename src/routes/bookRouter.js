import express from 'express';

import booksController from '../controllers/booksController.js';

const routes = (Book) => {
    const bookRouter = express.Router();
    const controller = booksController(Book);

    bookRouter.route('/books')
        .get(controller.get)
        .post(controller.post);

    bookRouter.use('/books/:bookId', async (req, res, next) => {
        try {
            const book = await Book.findById(req.params.bookId);
            if (book) {
                req.book = book;
                return next();
            }
            return res.sendStatus(404);
        } catch (err) {
            return res.status(500).send(err);
        }
    });

    bookRouter.route('/books/:bookId')
        .get((req, res) => {
            const returnBook = req.book.toJSON();

            returnBook.links = {};
            returnBook.links.FilterByThisGenre = `http://${req.headers.host}/api/books/?genre=${encodeURIComponent(req.book.genre)}`;

            return res.json(returnBook);
        })
        .put(async (req, res) => {
            const { book } = req;

            book.title = req.body.title;
            book.author = req.body.author;
            book.genre = req.body.genre;
            book.read = req.body.read;

            try {
                await req.book.save();
                return res.json(book);
            } catch (err) {
                return res.status(500).send(err);
            }
        })
        .patch(async (req, res) => {
            const { book } = req;
            if (req.body._id) {
                delete req.body._id;
            }

            Object.entries(req.body).forEach(([key, value]) => {
                book[key] = value;
            });

            try {
                await req.book.save();
                return res.json(book);
            } catch (err) {
                return res.status(500).send(err);
            }
        })
        .delete(async (req, res) => {
            try {
                await req.book.deleteOne();
                return res.sendStatus(204);
            } catch (err) {
                return res.status(500).send(err);
            }
        });

    return bookRouter;
};

export default routes;
