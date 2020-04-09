const booksController = (Book) => {
    const get = (req, res) => {
        const query = {};

        if (req.query.genre) {
            query.genre = req.query.genre;
        }

        Book.find(query, (err, books) => {
            if (err) {
                return res.send(err);
            }

            const returnBooks = books.map((book) => {
                const newBook = book.toJSON();

                newBook.links = {};
                newBook.links.self = `http://${req.headers.host}/api/books/${book.id}`;

                return newBook;
            });

            return res.json(returnBooks);
        });
    };

    const post = (req, res) => {
        const book = new Book(req.body);

        if (!req.body.title) {
            res.status(400);
            return res.send('Title is required');
        }

        book.save();

        return res.status(201).json(book);
    };

    return { get, post };
};

export default booksController;
