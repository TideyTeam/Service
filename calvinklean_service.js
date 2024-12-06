/* Link for Database Fetch: https://calvinkleanapp-gkard6gxf8g8d6em.eastus2-01.azurewebsites.net/ */

/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
const pgp = require('pg-promise')();

const db = pgp({
  host: process.env.DB_SERVER,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false },
});

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
router.use(express.json());

router.get('/', readHelloMessage); // Welcome message
router.get('/allmachines/:id', getMachineById); // Fetch a specific machine by ID
router.get('/availablewashers', readWasherAvailability); // Fetch available washers
router.get('/unavailablewashers', readWasherUnavailability); // Fetch unavailable washers
router.get('/availabledryers', readDryerAvailability); // Fetch available dryers
router.get('/unavailabledryers', readDryerUnavailability); // Fetch unavailable dryers

app.use(router);
app.listen(port, () => console.log(`Listening on port ${port}`));

/**
 * Checks if data is null and sends a 404 response if true, otherwise sends the data.
 * @param {object} res - The Express response object.
 * @param {object} data - The data to be checked and sent.
 */
function returnDataOr404(res, data) {
  if (data == null) {
    res.sendStatus(404);
  } else {
    res.send(data);
  }
}

/**
 * Sends a welcome message to the client.
 * Endpoint: GET /
 */
function readHelloMessage(req, res) {
  res.send('Hello, Welcome to the CalvinKlean App Service!');
}

/**
 * Fetches a specific machine by its ID.
 * Endpoint: GET /allwashers/:id
 */
function getMachineById(req, res, next) {
  const id = req.params.id;
  db.oneOrNone(
    `SELECT machine.ID, machine.availability, machine.type 
    FROM machine 
    WHERE machine.ID = $1`,
    [id]
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}

/**
 * Fetches all available washers.
 * Endpoint: GET /availablewashers
 */
function readWasherAvailability(req, res, next) {
  db.manyOrNone(
    `SELECT machine.ID, machine.type
       FROM Machine
       WHERE machine.type = 'washer' AND machine.availability = TRUE`
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}

/**
 * Fetches all unavailable washers.
 * Endpoint: GET /unavailablewashers
 */
function readWasherUnavailability(req, res, next) {
  db.manyOrNone(
    `SELECT machine.ID, machine.type
       FROM Machine
       WHERE machine.type = 'washer' AND machine.availability = FALSE`
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}

/**
 * Fetches all available dryers.
 * Endpoint: GET /availabledryers
 */
function readDryerAvailability(req, res, next) {
  db.manyOrNone(
    `SELECT machine.ID, machine.type
       FROM Machine
       WHERE machine.type = 'dryer' AND machine.availability = TRUE`
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}

/**
 * Fetches all unavailable dryers.
 * Endpoint: GET /unavailabledryers
 */
function readDryerUnavailability(req, res, next) {
  db.manyOrNone(
    `SELECT machine.ID, machine.type
       FROM Machine
       WHERE machine.type = 'dryer' AND machine.availability = FALSE`
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}
