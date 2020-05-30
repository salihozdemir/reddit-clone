const Post = require('../models/post');
const User = require('../models/user');

exports.load = async (req, res, next, id) => {
  try {
    const post = await Post.findById(id);
    if (post) req.post = post;
    else return res.status(404).json({ message: 'Post not found.' });
  } catch (error) {
    if (error.name === 'CastError')
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

exports.show = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.post.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const { sortType = '-score' } = req.body;
    const posts = await Post.find().sort(sortType);
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

exports.listByCategory = async (req, res, next) => {
  try {
    const category = req.params.category;
    const { sortType = '-score' } = req.body;
    const posts = await Post.find({ category }).sort(sortType);
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

exports.listByUser = async (req, res, next) => {
  try {
    const username = req.params.user;
    const { sortType = '-score' } = req.body;
    const author = await User.findOne({ username });
    const posts = await Post.find({ author: author.id }).sort(sortType);
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    if (req.post.author._id.equals(req.user.id)) {
      await req.post.remove();
      res.json({ message: 'Your post successfully deleted.' });
    } else {
      res
        .status(400)
        .json({ message: "User's only authorized to delete this post." });
    }
  } catch (error) {
    next(error);
  }
};
