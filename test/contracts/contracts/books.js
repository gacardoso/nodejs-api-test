describe('Routes: Books', () => {
  const Books = app.datasource.models.Books;

  const defaultBooks = {
    id: 1,
    name: 'Default Book',
  };

    // detroi e roda o teste
  beforeEach((done) => {
    Books
            .destroy({ where: {} })
            .then(() => Books.create(defaultBooks))
            .then(() => {
              done();
            });
  });

  describe('Route GET /books', () => {
    it('should retun a list of books', (done) => {
      const booksList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      }));

      request
                .get('/books')
                .end((err, res) => {
                  joiAssert(res.body, booksList);
                  done(err);
                });
    });
  });

  describe('Route GET /books/{id}', () => {
    it('should retun a book', (done) => {
      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });

      request
                .get('/books/1')
                .end((err, res) => {
                  joiAssert(res.body, book);
                  done(err);
                });
    });
  });

  describe('Route POST /book', () => {
    it('should create a book', (done) => {
      const newBook = {
        id: 2,
        name: 'newBook',
      };

      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });

      request
                .post('/books')
                .send(newBook)
                .end((err, res) => {
                  joiAssert(res.body, book);
                  done(err);
                });
    });
  });

  describe('Route PUT /books/{id}', () => {
    it('should update a book', (done) => {
      const UpdatedBook = {
        id: 1,
        name: 'Updated Book',
      };

      const updateCount = Joi.array().items(1);

      request
                .put('/books/1')
                .send(UpdatedBook)
                .end((err, res) => {
                  joiAssert(res.body, updateCount);
                  done(err);
                });
    });
  });

  describe('Route DELETE /books/{id}', () => {
    it('should delete a book', (done) => {
      request
                .delete('/books/1')
                .end((err, res) => {
                  expect(res.statusCode).to.be.eql(204);
                  done(err);
                });
    });
  });
});
