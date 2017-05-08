describe('Routes: Users', () => {
  const Users = app.datasource.models.Users;

  const defaultUsers = {
    id: 1,
    name: 'Default User',
    email: 'test@email.com',
    password: 'test'
  };

  // detroi e roda o teste
  beforeEach((done) => {
    Users
      .destroy({ where: {} })
      .then(() => Users.create(defaultUsers))
      .then(() => {
        done();
      });
  });

  describe('Route GET /users', () => {
    it('should retun a list of users', (done) => {
      request
        .get('/users')
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultUsers.id);
          expect(res.body[0].name).to.be.eql(defaultUsers.name);
          expect(res.body[0].email).to.be.eql(defaultUsers.email);
          done(err);
        });
    });
  });

  describe('Route GET /users/{id}', () => {
    it('should retun a user', (done) => {
      request
        .get('/users/1')
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultUsers.id);
          expect(res.body.name).to.be.eql(defaultUsers.name);
          expect(res.body.email).to.be.eql(defaultUsers.email);
          done(err);
        });
    });
  });

  describe('Route POST /user', () => {
    it('should create a user', (done) => {
      const newUser = {
        id: 2,
        name: 'newUser',
        email: 'newEmail@email.com',
        password: 'teste'
      };

      request
        .post('/users')
        .send(newUser)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newUser.id);
          expect(res.body.name).to.be.eql(newUser.name);
          expect(res.body.email).to.be.eql(newUser.email);
          done(err);
        });
    });
  });

  describe('Route PUT /users/{id}', () => {
    it('should update a user', (done) => {
      const UpdatedUser = {
        id: 1,
        name: 'Updated User',
        email: 'update@mail.com'
      };

      request
        .put('/users/1')
        .send(UpdatedUser)
        .end((err, res) => {
          // console.log('RESPONSE', res.body) //teste retorna linha afetadas
          expect(res.body).to.be.eql([1]);
          done(err);
        });
    });
  });

  // don't have body
  describe('Route DELETE /users/{id}', () => {
    it('should delete a user', (done) => {
      request
        .delete('/users/1')
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});
