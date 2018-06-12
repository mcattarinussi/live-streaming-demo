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
};

const getUser = email => users[email] || null;

module.exports = {
  getUser,
};
