const axios = require('axios');

let ensureAuthenticated = (req, res, next) => {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).json({ status: 'Please log in' });
  }
  const authUrl = 'http://users-service:3005/users/user';

  return axios.get(authUrl, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.headers.authorization.split(' ')[1]}`,
    }
  })
    .then((response) => {
      req.user = response.data.user;
      return next();
    })
    .catch((err) => { 
      return next(err);
     });
};

module.exports = {
  ensureAuthenticated,
};
