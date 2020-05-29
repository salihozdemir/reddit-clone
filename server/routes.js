const users = require('./controllers/users');
const posts = require('./controllers/posts');
const requireAuth = require('./middlewares/requireAuth');

const router = require('express').Router();

router.post('/signup', users.signup);
router.post('/authenticate', users.authenticate);

router.param('post', posts.load);
router.post('/posts', requireAuth, posts.create);

module.exports = (app) => {
  app.use('/api', router);

  app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
      message: error.message
    });
  });
};
