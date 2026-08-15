import 'should';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../index.js';

const Book = mongoose.model('Book');
const agent = request.agent(app);

process.env.NODE_ENV = 'development';

describe('Book CRUD Test', () => {
    afterEach(async () => {
        await Book.deleteMany({}).exec();
    });

    after(async () => {
        await mongoose.connection.close();
        await new Promise((resolve) => {
            app.server.close(resolve);
        });
    });

    it('should allow a book to be posted and return read and _id', async () => {
        const bookPost = {
            author: 'Jon',
            genre: 'Fiction',
            title: 'My Book',
        };

        const results = await agent.post('/api/books')
            .send(bookPost)
            .expect(201);

        results.body.should.have.property('_id');
        results.body.should.have.property('read').which.is.false();
    });

    it('should get a list of books', async () => {
        await Book.create({
            title: 'Sample Book',
            author: 'Author A',
            genre: 'Fiction',
            read: false,
        });

        const res = await agent.get('/api/books')
            .expect(200);

        res.body.should.be.an.Array();
        res.body.length.should.equal(1);
        res.body[0].should.have.property('links');
        res.body[0].links.should.have.property('self');
    });

    it('should get a single book by id', async () => {
        const book = await Book.create({
            title: 'Single Book',
            author: 'Author B',
            genre: 'Sci-Fi',
            read: false,
        });

        const res = await agent.get(`/api/books/${book.id}`)
            .expect(200);

        res.body.title.should.equal('Single Book');
        res.body.links.should.have.property('FilterByThisGenre');
    });

    it('should update a book via PUT', async () => {
        const book = await Book.create({
            title: 'Original Title',
            author: 'Author C',
            genre: 'Sci-Fi',
            read: false,
        });

        const res = await agent.put(`/api/books/${book.id}`)
            .send({
                title: 'Updated Title',
                author: 'Author C',
                genre: 'Sci-Fi',
                read: true,
            })
            .expect(200);

        res.body.title.should.equal('Updated Title');
        res.body.read.should.be.true();
    });

    it('should patch a book field via PATCH', async () => {
        const book = await Book.create({
            title: 'Patch Book',
            author: 'Author D',
            genre: 'Drama',
            read: false,
        });

        const res = await agent.patch(`/api/books/${book.id}`)
            .send({ read: true })
            .expect(200);

        res.body.read.should.be.true();
        res.body.title.should.equal('Patch Book');
    });

    it('should delete a book via DELETE', async () => {
        const book = await Book.create({
            title: 'Delete Book',
            author: 'Author E',
            genre: 'Drama',
            read: false,
        });

        await agent.delete(`/api/books/${book.id}`)
            .expect(204);

        const found = await Book.findById(book.id);
        (found === null).should.be.true();
    });

    it('should return 404 for non-existent book', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        await agent.get(`/api/books/${fakeId}`)
            .expect(404);
    });
});
