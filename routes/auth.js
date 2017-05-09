import HttpStatus from 'http-status';
import jwt from 'jwt-simple';

export default (app) => {
  const config = app.config;
  const User = app.datasource.models.Users;

  app.post('/token', (req, res) => {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;

      User.findOne({ where: { email } })
                .then((user) => {
                  if (User.isPassword(user.password, password)) {
                    const payload = { id: user.id };
                    res.json({
                      token: jwt.encode(payload, config.jwtSecret),
                    });
                  } else {
                        // finaliza a request
                    res.sendStatus(HttpStatus.UNAUTHORIZED);
                  }
                })
                .catch(() => res.sendStatus(HttpStatus.UNAUTHORIZED));
    } else {
      res.sendStatus(HttpStatus.UNAUTHORIZED);
    }
  });
};
