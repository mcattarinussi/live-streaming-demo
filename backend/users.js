// TODO: fetch from database
const users = {
  'mcattarinussi@gmail.com': {
    info: {
      email: 'mcattarinussi@gmail.com',
      firstName: 'Mattia',
      lastName: 'Cattarinussi',
    },
    password: 'pass'
  },
};

const getUser = email => users[email] || null;

module.exports = {
  getUser,
};
