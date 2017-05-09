import BooksControllers from '../controllers/books';

export default (app) => {
  const booksControllers = new BooksControllers(app.datasource.models.Books);

  app.route('/books')
    .all(app.auth.authenticate())
    .get((req, res) => {
      booksControllers.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      booksControllers.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/books/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      booksControllers.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      booksControllers.update(req.body, req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      booksControllers.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
