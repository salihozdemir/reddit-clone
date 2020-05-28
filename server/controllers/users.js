const User = require('../models/user');
const jwtDecode = require('jwt-decode');

const {
  createToken,
  hashPassword,
  verifyPassword
} = require('../utils/authentication');

exports.signup = async (req, res) => {
  try {
    const { username } = req.body;

    const hashedPassword = await hashPassword(
      req.body.password
    );

    const userData = {
      username: username.toLowerCase(),
      password: hashedPassword
    };

    const existingUsername = await User.findOne({
      username: userData.username
    }).lean();

    if (existingUsername) {
      return res.status(400).json({
        message: 'Username already exists.'
      });
    }

    const newUser = new User(userData);
    const savedUser = await newUser.save();

    if (savedUser) {
      const token = createToken(savedUser);
      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;

      const { username, role } = savedUser;
      const userInfo = {
        username,
        role
      };

      return res.json({
        message: 'User created!',
        token,
        userInfo,
        expiresAt
      });
    } else {
      return res.status(400).json({
        message:
          'There was a problem creating your account.'
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: 'There was a problem creating your account.'
    });
  }
};

exports.authenticate = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      username: username.toLowerCase()
    });

    if (!user) {
      return res.status(403).json({
        message: 'Wrong username or password.'
      });
    }

    const passwordValid = await verifyPassword(
      password,
      user.password
    );

    if (passwordValid) {
      const token = createToken(user);
      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;
      const { username, role } = user;
      const userInfo = { username, role };

      res.json({
        message: 'Authentication successful!',
        token,
        userInfo,
        expiresAt
      });
    } else {
      res.status(403).json({
        message: 'Wrong username or password.'
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.'
    });
  }
};
