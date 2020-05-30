exports.load = async (req, res, next, id) => {
  try {
    const comment = await req.post.comments.id(id);
    if (!comment)
      return res.status(404).json({ message: 'Comment not found.' });
    req.comment = comment;
  } catch (error) {
    if (error.name === 'CastError')
      return res.status(400).json({ message: 'Invalid comment id.' });
    return next(error);
  }
  next();
};

exports.create = async (req, res, next) => {
  try {
    const post = await req.post.addComment(req.user.id, req.body.comment);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const post = await req.post.removeComment(req.params.comment);
    res.json(post);
  } catch (error) {
    next(error);
  }
};
