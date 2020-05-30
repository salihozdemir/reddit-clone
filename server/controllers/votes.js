exports.upvote = async (req, res) => {
  const post = await req.post.vote(req.user.id, 1);
  res.json(post);
};

exports.downvote = async (req, res) => {
  const post = await req.post.vote(req.user.id, -1);
  res.json(post);
};

exports.unvote = async (req, res) => {
  const post = await req.post.vote(req.user.id, 0);
  res.json(post);
};
