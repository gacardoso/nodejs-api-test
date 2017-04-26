describe('Routes: Books', () => {

    const Books = app.datasource.models.Books,

        defaultBooks = {
            id: 1,
            name: 'Default Book'
        };

    //detroi e roda o teste
    beforeEach(done => {
        Books
            .destroy({ where: {} })
            .then(() => Books.create(defaultBooks))
            .then(() => {
                done();
            });
    });

    describe('Route GET /books', () => {
        it('should retun a list of books', done => {
            request
                .get('/books')
                .end((err, res) => {
                    expect(res.body[0].id).to.be.eql(defaultBooks.id);
                    expect(res.body[0].name).to.be.eql(defaultBooks.name);
                    done(err)
                });
        });
    });

    describe('Route GET /books/{id}', () => {
        it('should retun a book', done => {
            request
                .get('/books/1')
                .end((err, res) => {
                    expect(res.body.id).to.be.eql(defaultBooks.id);
                    done(err);
                });
        });
    })

})