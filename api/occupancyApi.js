const express = require('express');
const router = express.Router();
const db = require("../connection");
const moment = require("moment");

router.get('/:userid', async (req, res) => {
  console.log('GET /occupancy');
  //get query parameters
  const time = req.query.time;
  const id = req.params.userid;

  if (time) {
    const latestTime = moment().format("'YYYY-MM-DD HH:mm:ss'");
    const pastTime = moment().subtract(time, 'minute').format("'YYYY-MM-DD HH:mm:ss'");

    db.query(`SELECT * FROM Occupancy WHERE user_id=${id} AND date between ${pastTime} and ${latestTime}`, function(result) {
     const data = parseData(result, time);

      return res.status(200).send(data);
    });

  } else {
    db.query('SELECT * FROM `Occupancy`', function(result) {
      return res.status(200).send(result);
    });
  }
});

function parseData(result, totalTime) {
	let res = [];
	const startTime = moment().subtract(totalTime, 'minute');
	const userid = result && result.length > 0 ? result[0].user_id : null;
	//return occupancy, date, user_id
	for(let i = 0; i < totalTime; i++) {
		let currentTime = startTime.clone().add(i, 'minute');
		let foundRows = result.filter(row => currentTime.isSame(moment(row.date), 'hour') && currentTime.isSame(moment(row.date), 'minute'));0
		
		if(foundRows.length > 0) {
			let currentOccupancy = 0, countFalse = 0, countTrue = 0;
			
			foundRows.forEach(row => {
				row.occupancy ? countFalse++ : countTrue++;
			});

			currentOccupancy = countTrue > countFalse;
			res.push({ occupancy: currentOccupancy, date: currentTime.format("YYYY-MM-DD HH:mm:ss"), user_id: userid }); 
		}
		else res.push({ occupancy: 0, date: currentTime.format("YYYY-MM-DD HH:mm:ss"), user_id: userid });
	}
	return res;
}

module.exports = router;
