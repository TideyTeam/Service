const pgp = require('pg-promise')();
const db = pgp({
  host: process.env.DB_SERVER,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE, // Confirm this prints the correct database name
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false },
});

console.log("Connecting to database:", process.env.DB_DATABASE); // Log to confirm the database name

/**
 * Fetches all records from the 'Machine' table and logs them.
 * Logs any errors encountered during the query.
 */
db.many('SELECT * FROM Machine')
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log('ERROR:', error);
  });
