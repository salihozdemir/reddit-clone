module.exports = {
  port: 8080,
  db: {
    url:
      process.env.DATABASE_URL ||
      'mongodb://localhost/reddit-clone',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'development_secret',
    expiry: '7d'
  }
};
