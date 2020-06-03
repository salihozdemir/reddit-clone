const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const { validUser } = require('./factories');
const User = mongoose.model('user');

process.env.TEST_SUITE = 'auth';

describe('auth endpoints', () => {
  let user;
  const username = {
    nonExisting: 'new',
    nonTrimmed: ' user ',
    invalid: 'user!$@',
    long: 'a'.repeat(33)
  };
  const password = {
    wrong: 'incorrect',
    short: 'aaa',
    long: 'a'.repeat(73)
  };

  beforeEach(async () => {
    user = validUser();
    await new User(user).save();
  });

  describe('/authenticate', () => {
    test('rejects requests with no credentials', (done) => {
      request(app)
        .post('/api/authenticate')
        .expect((res) => {
          expect(res.body.errors).toBeDefined();
          res.body.errors.forEach((err) => {
            expect(err.msg).toContain('required');
          });
        })
        .expect(422, done);
    });

    test('reject requests with incorrect name', (done) => {
      request(app)
        .post('/api/authenticate')
        .send({ ...user, username: username.nonExisting })
        .expect((res) => {
          expect(res.body.message).toContain('Wrong username or password.');
        })
        .expect(403, done);
    });

    test('reject requests with incorrect password', done => {
      request(app)
        .post('/api/authenticate')
        .send({ ...user, password: password.wrong })
        .expect(res => {
          expect(res.body.message).toContain('Wrong username or password.');
        })
        .expect(403, done);
    });
  });
});
