import jwt from 'jwt-simple';

describe('Routes: Users', () => {
  const Users = app.datasource.models.Users;
  const jwtSecret = app.config.jwtSecret;

  const defaultUser = {
    id: 1,
    name: 'Default User',
    email: 'test@email.com',
    password: 'test',
  };

  let token;

  // detroi e roda o teste
  beforeEach((done) => {
    Users
      .destroy({ where: {} })
      .then(() => Users.create({
        name: 'John',
        email: 'john@gmail.com',
        password: '12345',
      }))
      .then((user) => {
        Users.create(defaultUser)
          .then(() => {
            token = jwt.encode({ id: user.id }, jwtSecret);
            done();
          });
      });
  });

  describe('Route GET /users', () => {
    it('should retun a list of users', (done) => {
      request
        .get('/users')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultUser.id);
          expect(res.body[0].name).to.be.eql(defaultUser.name);
          expect(res.body[0].email).to.be.eql(defaultUser.email);
          done(err);
        });
    });
  });

  describe('Route GET /users/{id}', () => {
    it('should retun a user', (done) => {
      request
        .get('/users/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultUser.id);
          expect(res.body.name).to.be.eql(defaultUser.name);
          expect(res.body.email).to.be.eql(defaultUser.email);
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
        password: 'teste',
      };

      request
        .post('/users')
        .set('Authorization', `JWT ${token}`)
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
        email: 'update@mail.com',
      };

      request
        .put('/users/1')
        .set('Authorization', `JWT ${token}`)
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
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});
