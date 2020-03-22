const express = require('express');
const router = express.Router();
const db = require("../connection");
const moment = require("moment");
// const netList = require('network-list');
/*
    Fetches real time energy data for the past {time} minutes.
    If no params, fetch all data.
*/
router.get('/', async (req, res) => {
    console.log('GET /network');
    //get query parameters
    const time = req.query.time;

    if(time) {  
        db.query(`SELECT MAX(Date) AS currentDate FROM Network`, function(result) {
            const latestDate = moment(new Date(result[0].currentDate)).format("'YYYY-MM-DD HH:mm:ss'");    
            const pastTime = moment(new Date(new Date(result[0].currentDate).getTime() - (1000 * 60 * time))).format("'YYYY-MM-DD HH:mm:ss'");
        
            db.query(`SELECT * FROM Network WHERE Date between ${pastTime} and ${latestDate}`, function(result2) {
                return res.status(200).send(result2);
            });
        });
    } else {
        db.query('SELECT * FROM `Network`', function(result) {
            return res.status(200).send(result);
        });
    }
});


router.get('/:ip', async (req, res) => {
    console.log('GET /network/:ip');
    const ipRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
    // const params = req.query;

    if(ipRegex.test(req.params.ip)) {
        db.query(`SELECT * FROM Network WHERE ip_address=${req.params.ip}`, function(result) {
            return res.status(200).send(result);
        });
    }
    
})


router.get('/devices', async (req, res) => {
    console.log('GET /network/devices');
    
    // netList.scan({}, (err, arr) => {
    //     return res.status(200).send(arr); // array with all devices
    // });
    
})
module.exports = router;