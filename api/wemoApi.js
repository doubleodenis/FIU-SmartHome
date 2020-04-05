const express = require('express');
const router = express.Router();
const db = require("../connection");
const moment = require("moment");
// If using auth tokens
// router.get('/energy', verify, async (req, res) => {
//     return res.send(req.user)
// })

/*
    Fetches real time energy data for the past {time} minutes.
    If no params, fetch all data.
*/
router.get('/', async (req, res) => {
    console.log('GET /energy');
    //get query parameters
    const time = req.query.time;

    if(time) {  
        // db.query(`SELECT MAX(Date) AS currentDate FROM Energy`, function(result) {
            const latestTime = moment(new Date()).format("'YYYY-MM-DD HH:mm:ss'");    
            const pastTime = moment(new Date(new Date().getTime() - (1000 * 60 * time))).format("'YYYY-MM-DD HH:mm:ss'");
        
            db.query(`SELECT * FROM Energy WHERE Date between ${pastTime} and ${latestTime}`, function(result2) {
                return res.status(200).send(result2);
            });
        // });
    } else {
        db.query('SELECT * FROM `Energy`', function(result) {
            return res.status(200).send(result);
        });
    }
})

router.get('/wemo/:wemo', async (req, res) => {
    console.log('GET /energy/wemo/:wemo');
    //get query parameters
    const time = req.query.time;
    const wemo = req.params.wemo;
    if(time) {
        const latestTime = moment(new Date()).format("'YYYY-MM-DD HH:mm:ss'");    
        const pastTime = moment(new Date(new Date().getTime() - (1000 * 60 * time))).format("'YYYY-MM-DD HH:mm:ss'");
        
	db.query(`SELECT AVG(energy), date, device_Serial_number FROM Energy WHERE device_Serial_number='${wemo}' AND Date between ${pastTime} and ${latestTime} GROUP BY date ORDER BY date`, function(result) {
               	const aggregatedEnergy = aggregateEnergy(result);
		//console.log(aggregatedEnergy);
		return res.status(200).send(aggregatedEnergy);
    	});

    } else {
        db.query('SELECT * FROM `Energy`', function(result) {
            return res.status(200).send(result);
        });
    }
});

function aggregateEnergy(sqlResult) {
	console.log(sqlResult);
	if(sqlResult.length == 0) return [];
	//sql result is already ordered by date
	let result = [], currentMin = moment(sqlResult[0].date).minute(), energyPerMin = 0, rowsPerMin = 0;
	sqlResult.forEach((row, idx) => {
		let date = moment(row.date);
		let min = moment(row.date).minute();
		let energy = parseInt(row['AVG(energy)']);
		//in the same minute
		if(currentMin == min) {
			rowsPerMin += 1;
			energyPerMin = (energyPerMin + energy);
			if(sqlResult.length - 1  == idx) result.push({ energy: Math.floor(energyPerMin/rowsPerMin), date: date.seconds(0), device_Serial_number: row.device_Serial_number }); 
		}
		else if(currentMin != min){
			result.push({ energy: Math.floor(energyPerMin/rowsPerMin), date: date.seconds(0), device_Serial_number: row.device_Serial_number });
			energyPerMin = energy != null ? energy : 0;
			rowsPerMin = 1;
			currentMin = min;
		}
	});
	return result;
}

router.get('/devices', async (req, res) => {
    console.log('GET /energy/devices');
    if(req.query.user) {
        db.query(`SELECT DISTINCT device_name, device_Serial_number FROM Energy WHERE user_id=${req.query.user}`, function(result) {
            return res.status(200).send(result);
        });
    }
    else {
        db.query('SELECT DISTINCT device_name, device_Serial_number FROM `Energy`', function(result) {
            return res.status(200).send(result);
        });
    }
})
module.exports = router;
