const express = require('express');
const router = express.Router();
const db = require("../connection");
const moment = require("moment");
// If using auth tokens
// router.get('/energy', verify, async (req, res) => {
//     return res.send(req.user)
// })

router.get('/wemo/:wemo', async (req, res) => {
    console.log('GET /energy/wemo/:wemo');
    //get query parameters
    const time = req.query.time;
    const wemo = req.params.wemo;
    if(time) {
        const currentTime = moment().format("'YYYY-MM-DD HH:mm:ss'");    
        const startTime = moment().subtract(time, 'minute').format("'YYYY-MM-DD HH:mm:ss'");
        
	db.query(`SELECT energy, date, device_Serial_number FROM Energy WHERE device_Serial_number='${wemo}' AND Date between ${startTime} and ${currentTime}`, function(result) {
               	//const aggregatedEnergy = aggregateEnergy(result);
		const data = parseData(result, time);
		//console.log(aggregatedEnergy);
		return res.status(200).send(data);
    	});

    } else {
        db.query('SELECT * FROM `Energy`', function(result) {
            return res.status(200).send(result);
        });
    }
});

//result is an array, totalTime is a Number
function parseData(result, totalTime) {
	let res = [];
	const startTime = moment().subtract(totalTime, 'minute').seconds(0);
	const deviceSerial = result.length > 0 ? result[0].device_Serial_number : null;
	//return energy, date, device_Serial_number
	for(let i = 0; i < totalTime; i++) {
		let currentTime = startTime.clone().add(i, 'minute');
		let foundRows = result.filter(row => currentTime.isSame(moment(row.date), 'hour') && currentTime.isSame(moment(row.date), 'minute'));
		
		if(foundRows.length > 0) {
			let totalEnergy = 0;
			foundRows.forEach(row => {
				totalEnergy += row.energy;
			});
			res.push({ energy: totalEnergy/foundRows.length, date: currentTime.format("YYYY-MM-DD HH:mm:ss"), device_Serial_number: deviceSerial });
		
		}
		else res.push({ energy: 0, date: currentTime.format("YYYY-MM-DD HH:mm:ss"), device_Serial_number: deviceSerial });
	}
	return res;
}

router.get('/devices', async (req, res) => {
    console.log('GET /energy/devices');
    if(req.query.user) {
        db.query(`SELECT DISTINCT device_name, device_Serial_number FROM Energy WHERE user_id=${req.query.user}`, function(result) {
	   
            return res.status(200).send(results);
        });
    }
    else {
        db.query('SELECT DISTINCT device_name, device_Serial_number FROM `Energy`', function(result) {
          const results = [];
	    result.forEach(row => {
		if(row.device_Serial_number != null) results.push(row);
	    });   
	 return res.status(200).send(results);
        });
    }
})
module.exports = router;
