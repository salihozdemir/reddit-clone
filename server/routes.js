const users = require('./controllers/users');

const router = require("express").Router();

router.post('/signup', users.signup)
router.post('/authenticate', users.authenticate)

module.exports = (app) => {
  app.use("/api", router);

  app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
      message: error.message,
    });
  });
};
