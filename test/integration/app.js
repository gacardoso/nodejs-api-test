describe('Routes Books', () => {

    const defaultBooks = {
        id: 1,
        name: 'Default Book'
    }

    describe('Route GET /books', () => {
        it('should retun a list of books', done => {
            request
                .get('/books')
                .end((err, res) => {
                    expect(res.body[0].id).to.be.eql(defaultBooks.id);
                    expect(res.body[0].name).to.be.eql(defaultBooks.name);
                    done(err);
                });
        });
    });

});