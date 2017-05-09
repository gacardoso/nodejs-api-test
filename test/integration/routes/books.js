import jwt from 'jwt-simple';

describe('Routes: Books', () => {
  const Books = app.datasource.models.Books;
  const Users = app.datasource.models.Users;
  const jwtSecret = app.config.jwtSecret;

  const defaultBook = {
    id: 1,
    name: 'Default Book',
    description: 'Default Description',
  };

  let token;

  beforeEach((done) => {
    Users
      .destroy({ where: {} })
      .then(() => Users.create({
        name: 'John',
        email: 'john@mail.com',
        password: '12345',
      }))
      .then((user) => {
        Books
          .destroy({ where: {} })
          .then(() => Books.create(defaultBook))
          .then(() => {
            token = jwt.encode({ id: user.id }, jwtSecret);
            done();
          });
      });
  });

  describe('GET /books', () => {
    it('should return a list of books', (done) => {
      request
        .get('/books')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body[0].name).to.eql(defaultBook.name);
          expect(res.body[0].id).to.eql(defaultBook.id);
          done(err);
        });
    });
  });

  describe('Route GET /books/{id}', () => {
    it('should retun a book', (done) => {
      request
        .get('/books/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultBook.id);
          expect(res.body.name).to.be.eql(defaultBook.name);
          expect(res.body.description).to.be.eql(defaultBook.description);
          done(err);
        });
    });
  });

  describe('Route POST /book', () => {
    it('should create a book', (done) => {
      const newBook = {
        id: 2,
        name: 'newBook',
        description: 'newDescription',
      };

      request
        .post('/books')
        .set('Authorization', `JWT ${token}`)
        .send(newBook)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newBook.id);
          expect(res.body.name).to.be.eql(newBook.name);
          expect(res.body.description).to.be.eql(newBook.description);
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

      request
        .put('/books/1')
        .set('Authorization', `JWT ${token}`)
        .send(UpdatedBook)
        .end((err, res) => {
          // console.log('RESPONSE', res.body) //teste retorna linha afetadas
          expect(res.body).to.be.eql([1]);
          done(err);
        });
    });
  });

  // don't have body
  describe('Route DELETE /books/{id}', () => {
    it('should delete a book', (done) => {
      request
        .delete('/books/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});
