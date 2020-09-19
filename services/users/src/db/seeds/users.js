const bcrypt = require('bcryptjs');

exports.seed = (knex, Promise) => {
  return knex('users').del()
  .then(() => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync('herman', salt);
    return Promise.join(
      knex('users').insert({
        name: 'Michael Doe',
        company: 'Info Objects',
        username: 'michael@gmail.com',
        password: hash,
        contact: 1234567890
      }) // eslint-disable-line
    );
  })
  .catch((err) => { console.log(err); }); // eslint-disable-line
};
