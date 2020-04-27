const express = require('express');
const router = express.Router();
const db = require("../connection");
const moment = require("moment");

//Occupancy route to retrieve occupancy data for a certain user
router.get('/:userid', async (req, res) => {
	console.log('GET /occupancy');
	//get query parameters
	const time = req.query.time;
	const id = req.params.userid;

	if (time) {

		//Get times for start and end of given time frame
		const latestTime = moment().format("'YYYY-MM-DD HH:mm:ss'");
		const pastTime = moment().subtract(time, 'minute').format("'YYYY-MM-DD HH:mm:ss'");

		//Query the database based on params
		db.query(`SELECT * FROM Occupancy WHERE user_id=${id} AND date between ${pastTime} and ${latestTime}`, function (result) {
			const data = parseData(result, time);
			return res.status(200).send(data);
		});

	} else {
		db.query('SELECT * FROM `Occupancy`', function (result) {
			return res.status(200).send(result);
		});
	}
});

/**
 * This method parses the sql result and formats the response by aggregating data by minute. 
 * The occupancy is aggregated to either true or false depending on the majority of the result for
 * that minute.
 * @param {Array} result The result from the sql query
 * @param {Number} totalTime The total timeframe in minutes
 */
function parseData(result, totalTime) {
	let res = [];
	const startTime = moment().subtract(totalTime, 'minute');
	//storing the persistent user id
	const userid = result && result.length > 0 ? result[0].user_id : null;

	for (let i = 0; i < totalTime; i++) {

		//Clone is necessary to not get a reference to the original moment object
		let currentTime = startTime.clone().add(i, 'minute');

		//Searching for all results within the same minute
		let foundRows = result.filter(row => currentTime.isSame(moment(row.date), 'hour') && currentTime.isSame(moment(row.date), 'minute'));
		
		if (foundRows.length > 0) {
			let currentOccupancy = 0, countFalse = 0, countTrue = 0;

			foundRows.forEach(row => {
				row.occupancy == 0 ? countFalse++ : countTrue++;
			});

			// return true if majority are true
			currentOccupancy = countTrue > countFalse ? 1 : 0;

			res.push({ occupancy: currentOccupancy, date: currentTime.format("YYYY-MM-DD HH:mm:ss"), user_id: userid });
		}
		//if no results for this minute return 0 occupancy
		else res.push({ occupancy: 0, date: currentTime.format("YYYY-MM-DD HH:mm:ss"), user_id: userid });
	}
	return res;
}

module.exports = router;
