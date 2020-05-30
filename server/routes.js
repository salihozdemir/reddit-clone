const users = require('./controllers/users');
const posts = require('./controllers/posts');
const votes = require('./controllers/votes');
const requireAuth = require('./middlewares/requireAuth');

const router = require('express').Router();

//Authentication
router.post('/signup', users.signup);
router.post('/authenticate', users.authenticate);

//Posts
router.param('post', posts.load);
router.post('/posts', requireAuth, posts.create);
router.get('/post/:post', posts.show);
router.get('/posts', posts.list);
router.get('/posts/:category', posts.listByCategory);
router.get('/user/:user', posts.listByUser);
router.delete('/post/:post', requireAuth, posts.delete);

//Post votes
router.get('/post/:post/upvote', requireAuth, votes.upvote);
router.get('/post/:post/downvote', requireAuth, votes.downvote);
router.get('/post/:post/unvote', requireAuth, votes.unvote);



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
