import 'should';
import sinon from 'sinon';

import bookController from '../controllers/booksController';

process.env.NODE_ENV = 'development';

describe('Book Controller Tests:', () => {
    describe('Post', () => {
        it('should not allow an empty title on post', () => {
            const Book = function Book() { this.save = () => { }; };

            const req = {
                body: {
                    author: 'Jon',
                },
            };

            const res = {
                json: sinon.spy(),
                send: sinon.spy(),
                status: sinon.spy(),
            };

            const controller = bookController(Book);

            controller.post(req, res);

            res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
            res.send.calledWith('Title is required').should.equal(true);
        });
    });
});
