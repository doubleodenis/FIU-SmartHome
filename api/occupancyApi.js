const express = require('express');
const router = express.Router();
const db = require("../connection");
const moment = require("moment");

router.get('/', async (req, res) => {
  console.log('GET /occupancy');
  //get query parameters
  const time = req.query.time;

  if (time) {
    const latestTime = moment(new Date()).format("'YYYY-MM-DD HH:mm:ss'");
    const pastTime = moment(new Date(new Date().getTime() - (1000 * 60 * time))).format("'YYYY-MM-DD HH:mm:ss'");

    db.query(`SELECT * FROM Occupancy WHERE date between ${pastTime} and ${latestTime}`, function(result2) {
      return res.status(200).send(result2);
    });
  } else {
    db.query('SELECT * FROM `Occupancy`', function(result) {
      return res.status(200).send(result);
    });
  }
})

router.get('/occupancy/:time', async (req, res) => {
  console.log('GET /occupancy');
  //get query parameters
  const time = req.query.time;
  if (time) {
    const latestTime = moment(new Date()).format("'YYYY-MM-DD HH:mm:ss'");
    const pastTime = moment(new Date(new Date().getTime() - (1000 * 60 * time))).format("'YYYY-MM-DD HH:mm:ss'");

    db.query(`SELECT SELECT * FROM Occupancy WHERE date between ${pastTime} and ${latestTime} GROUP BY date ORDER BY date`, function(result) {
      return res.status(200).send(result);
    });

  } else {
    db.query('SELECT * FROM `Occupancy`', function(result) {
      return res.status(200).send(result);
    });
  }
});


module.exports = router;
