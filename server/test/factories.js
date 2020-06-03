const faker = require('faker');

exports.validUser = () => ({
  username: faker.name.firstName(),
  password: 'password'
});