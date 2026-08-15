const booksController = (Book) => {
    const get = async (req, res) => {
        const query = {};

        if (req.query.genre) {
            query.genre = req.query.genre;
        }

        try {
            const books = await Book.find(query);

            const returnBooks = books.map((book) => {
                const newBook = book.toJSON();

                newBook.links = {};
                newBook.links.self = `http://${req.headers.host}/api/books/${book.id}`;

                return newBook;
            });

            return res.json(returnBooks);
        } catch (err) {
            return res.status(500).send(err);
        }
    };

    const post = async (req, res) => {
        if (!req.body.title) {
            res.status(400);
            return res.send('Title is required');
        }

        try {
            const book = new Book(req.body);
            await book.save();

            return res.status(201).json(book);
        } catch (err) {
            return res.status(500).send(err);
        }
    };

    return { get, post };
};

export default booksController;
