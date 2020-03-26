const express = require('express');
const router = express.Router();
const db = require("../connection");
const moment = require("moment");

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

//Get network data for a cetrtain ip
router.get('/:ip', async (req, res) => {
    console.log('GET /network/:ip');
    //get query parameters
    const time = req.query.time;
    const ip = req.params.ip;
    const ipRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

    if(ipRegex.test(req.params.ip)) {
        
        if(time) {  
            db.query(`SELECT MAX(time) AS currentTime FROM Network ip_address=${ip}`, function(result) {
                const latestTime = moment(new Date(result[0].currentTime)).format("'YYYY-MM-DD HH:mm:ss'");    
                const pastTime = moment(new Date(new Date(result[0].currentTime).getTime() - (1000 * 60 * time))).format("'YYYY-MM-DD HH:mm:ss'");
            
                db.query(`SELECT * FROM Network WHERE ip_address=${ip} AND time between ${pastTime} and ${latestTime}`, function(result2) {
                    return res.status(200).send(result2);
                });
            });
        } else {
            db.query(`SELECT * FROM Network WHERE ip_address=${ip}`, function(result) {
                return res.status(200).send(result);
            });
        }
    }
    else {
        return res.status(400).send({ error: "Invalid ip address query parameter" });
    }
    
})

//Get all devices from a certain user : ?user=[user]
router.get('/devices', async (req, res) => {
    console.log('GET /network/devices');
    if(req.query.user) {
        db.query(`SELECT DISTINCT ip_address FROM Network WHERE user_id=${req.query.user}`, function(result) {
            return res.status(200).send(result);
        });
    }
    else {
        db.query(`SELECT DISTINCT ip_address FROM Network`, function(result) {
            return res.status(200).send(result);
        }); 
    }
    
})
module.exports = router;