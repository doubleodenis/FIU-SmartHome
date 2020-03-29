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
        // db.query(`SELECT MAX(Date) AS currentDate FROM Energy WHERE device_Serial_number=${wemo}`, function(result) {
            const latestTime = moment(new Date()).format("'YYYY-MM-DD HH:mm:ss'");    
            const pastTime = moment(new Date(new Date().getTime() - (1000 * 60 * time))).format("'YYYY-MM-DD HH:mm:ss'");
        
            db.query(`SELECT * FROM Energy WHERE Date between ${pastTime} and ${latestTime} WHERE device_Serial_number=${wemo}`, function(result2) {
                return res.status(200).send(result2);
            });
        // });
    } else {
        db.query('SELECT * FROM `Energy`', function(result) {
            return res.status(200).send(result);
        });
    }
});

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