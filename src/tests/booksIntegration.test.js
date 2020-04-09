import 'should';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../index';

const Book = mongoose.model('Book');
const agent = request.agent(app);

process.env.NODE_ENV = 'development';

describe('Book CRUD Test', () => {
    it('should allow a book to be posted and return read and _id', (done) => {
        const bookPost = {
            author: 'Jon',
            genre: 'Fiction',
            title: 'My Book',
        };

        agent.post('/api/books')
            .send(bookPost)
            .expect(200)
            .end((err, results) => {
                results.body.should.have.property('_id');
                done();
            });
    });

    afterEach((done) => {
        Book.deleteMany({}).exec();
        done();
    });

    after((done) => {
        mongoose.connection.close();
        app.server.close(done());
    });
});
