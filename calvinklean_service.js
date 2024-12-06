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
  ssl: { rejectUnauthorized: false},
});

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
router.use(express.json());

router.get('/', readHelloMessage);
router.get('/allwashers/:id', readAllWashers);
router.get('/availablewashers', readWasherAvailability);
router.get('/unavailablewashers', readWasherUnavailability);
router.get('/availabledryers', readDryerAvailability);
router.get('/unavailabledryers', readDryerUnavailability);
router.get('/testtemp', testing);
router.get('/getmachine1', getmachine1);
router.get('/getmachine4', getmachine4);

// router.get('/players', readPlayers);
// router.get('/players/:id', readPlayer);
// router.get('/players_games', readPlayersAndGames);  // New join endpoint
// router.put('/players/:id', updatePlayer);
// router.post('/players', createPlayer);
// router.delete('/players/:id', deletePlayer);

app.use(router);
app.listen(port, () => console.log(`Listening on port ${port}`));

function returnDataOr404(res, data) {
  if (data == null) {
    res.sendStatus(404);
  } else {
    res.send(data);
  }
}

function readHelloMessage(req, res) {
  res.send('Hello, Welcome to the CalvinKlean App Service!');
}

// All washing machines (id 1 is available and id 3 is unavailable)
function readAllWashers(req, res, next) {
  db.oneOrNone(
    `SELECT * 
     FROM Machine 
     WHERE machine.id = $1`, 
    [req.params.id]
  )
  .then((data) => {
    returnDataOr404(res, data);
  })
  .catch((err) => {
    next(err);
  });
}

  

// Available washer machines
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
// Get all machines (both washer and dryer) by dorm ID
function readMachinesByDorm(req, res, next) {
    const dormId = req.params.dormId;
    db.manyOrNone(
      `SELECT machine.ID, machine.type, machine.availability, dorm.name AS dorm_name
       FROM Machine
       JOIN MachineLocation ON Machine.ID = MachineLocation.machineID
       JOIN Dorm ON MachineLocation.dormID = Dorm.ID
       WHERE dorm.ID = $1`,
      [dormId]
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        next(err);
      });
  }
  
  // Update the availability of a specific machine by its ID
  function updateMachineAvailability(req, res, next) {
    const machineId = req.params.id;
    const { availability } = req.body;
    db.oneOrNone(
      `UPDATE Machine SET availability = $1 WHERE ID = $2 RETURNING ID`,
      [availability, machineId]
    )
      .then((data) => {
        returnDataOr404(res, data);
      })
      .catch((err) => {
        next(err);
      });
  }

  function testing(req, res, next) {
    db.manyOrNone(
      `SELECT *
       FROM temp`
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  function getmachine1(req, res, next) {
    db.oneOrNone(
      `SELECT machine.ID, machine.availability, machine.type 
      FROM machine 
      WHERE machine.ID = 1`
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  function getmachine4(req, res, next) {
    db.oneOrNone(
      `SELECT machine.ID, machine.availability, machine.type 
      FROM machine 
      WHERE machine.ID = 4`
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        next(err);
      });
  }
