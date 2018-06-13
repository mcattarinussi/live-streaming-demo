// TODO: fetch from database
const users = {
  'mcattarinussi@gmail.com': {
    info: {
      id: '1a363a59-ce41-426f-8910-7edaec12d8ae',
      email: 'mcattarinussi@gmail.com',
      firstName: 'Mattia',
      lastName: 'Cattarinussi',
    },
    password: 'pass',
  },
  'guest@example.com': {
    info: {
      id: '9b31a8c5-c319-466c-a284-65fe4e9e3cd6',
      email: 'guest@example.com',
      firstName: 'Guest',
      lastName: 'Foo',
    },
    password: 'pass',
  },
};

const getUser = email => users[email] || null;

module.exports = {
  getUser,
};
