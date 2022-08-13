const { Pool } = require('pg');
// the pool constant is being defined by requiring postgres

const { DATABASE_URL, PGSSLMODE } = process.env;
// the database url is being defined as what the value for DBURL is in the .env, don't understand whats happening here with PGSSLMODE as it is not defined in the .env
const config = {};
// config is defined as an empty object
if (DATABASE_URL) config.connectionString = DATABASE_URL;
// if there is a database url the connection string is configured to allow the database to connect with the server
if (PGSSLMODE) config.ssl = { rejectUnauthorized: false };
// dont understand what PGSSLMODE is doing here

const pool = new Pool(config);
// pool constant being defined here as new postgres database data object

let hasLogged = false;
// sets hasLogged as false

// eslint-disable-next-line no-console
pool.on('connect', ({ database, host, port }) => {
  // this function activates the pool connection to the database, host, and port
  if (!hasLogged) {
    // if the pool has not logged
    // eslint-disable-next-line no-console
    console.log(
      '🐘 Postgres is now connected to',
      `${database} on ${host}:${port}`
    );
    // then display this msg that the db was connected to this host and port
    hasLogged = true;
  }
});

module.exports = pool;
// exports the pool module to be imported elsewhere
