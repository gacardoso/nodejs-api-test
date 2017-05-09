import UsersControllers from '../controllers/users';

export default (app) => {
  const usersControllers = new UsersControllers(app.datasource.models.Users);

  app.route('/users')
    .all(app.auth.authenticate())
    .get((req, res) => {
      usersControllers.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      usersControllers.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/users/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      usersControllers.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      usersControllers.update(req.body, req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      usersControllers.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
