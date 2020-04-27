const express = require('express');
const router = express.Router();
const db = require("../connection");
const moment = require("moment");

//This route returns the energy data by device serial number and time frame
router.get('/wemo/:wemo', async (req, res) => {
	console.log('GET /energy/wemo/:wemo');

	//get query parameters
	const time = req.query.time;
	const wemo = req.params.wemo;
	if (time) {

		//Get times for start and end of given time frame
		const currentTime = moment().format("'YYYY-MM-DD HH:mm:ss'");
		const startTime = moment().subtract(time, 'minute').format("'YYYY-MM-DD HH:mm:ss'");

		//Query the database based on params
		db.query(`SELECT energy, date, device_Serial_number FROM Energy WHERE device_Serial_number='${wemo}' AND Date between ${startTime} and ${currentTime}`, function (result) {
			const data = parseData(result, time);
			return res.status(200).send(data);
		});

	} else {
		db.query('SELECT * FROM `Energy`', function (result) {
			return res.status(200).send(result);
		});
	}
});

/**
 * This method parses the sql result and formats the response by aggregating data by minute. 
 * The energy is averaged per minute.
 * @param {Array} result The result from the sql query
 * @param {Number} totalTime The total timeframe in minutes
 */
function parseData(result, totalTime) {
	let res = [];
	const startTime = moment().subtract(totalTime, 'minute').seconds(0);

	//Store the device serial number for the current result
	const deviceSerial = result.length > 0 ? result[0].device_Serial_number : null;

	for (let i = 0; i < totalTime; i++) {

		//Clone is necessary to not get a reference to the original moment object
		let currentTime = startTime.clone().add(i, 'minute');

		//Searching for all results within the same minute
		let foundRows = result.filter(row => currentTime.isSame(moment(row.date), 'hour') && currentTime.isSame(moment(row.date), 'minute'));

		if (foundRows.length > 0) {
			let totalEnergy = 0;
			foundRows.forEach(row => {
				totalEnergy += row.energy;
			});

			//Average the incoming energy for the found rows for this minute
			const averageEnergy = totalEnergy / foundRows.length;

			res.push({ energy: averageEnergy, date: currentTime.format("YYYY-MM-DD HH:mm:ss"), device_Serial_number: deviceSerial });

		}
		//if no results for this minute, return 0 energy
		else res.push({ energy: 0, date: currentTime.format("YYYY-MM-DD HH:mm:ss"), device_Serial_number: deviceSerial });
	}
	return res;
}

//Route to return all wemo devices, by user id or ALL if no user id is provided
router.get('/devices', async (req, res) => {
	console.log('GET /energy/devices');
	if (req.query.user) {
		db.query(`SELECT DISTINCT device_name, device_Serial_number FROM Energy WHERE user_id=${req.query.user}`, function (result) {
			return res.status(200).send(results);
		});
	}
	else {
		db.query('SELECT DISTINCT device_name, device_Serial_number FROM `Energy`', function (result) {
			const results = [];
			//Do not return null devices
			result.forEach(row => {
				if (row.device_Serial_number != null) results.push(row);
			});
			return res.status(200).send(results);
		});
	}
})

module.exports = router;
