const Post = require('../models/post');

exports.load = async (req, res, next, id) => {
  try {
    // TODO: findOne and findById kıyas ve lean() kullanımı.
    const post = await Post.findById(id);
    if (post) req.post = post;
    else return res.status(404).json({ message: 'Post not found.' });
  } catch (error) {
    if (err.name === 'CastError')
      return res.status(400).json({ message: 'Invalid post id.' });
    return next(error);
  }
  next();
};

exports.create = async (req, res, next) => {
  try {
    const { title, url, category, type, text } = req.body;
    const author = req.user.id;
    const post = await Post.create({
      title,
      url,
      author,
      category,
      type,
      text
    });
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};
