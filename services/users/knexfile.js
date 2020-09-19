const path = require('path');
module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'users_dev',
      user: 'postgres',
      password: 'postgres',
      host: '127.0.0.1',
      port: '5433'
    },
    pool: {
      min: 1,
      max: 15
    },
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds')
    }
  },
  test: {
    client: 'pg',
    connection: process.env.DATABASE_TEST_URL,
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds')
    }
  }
};
