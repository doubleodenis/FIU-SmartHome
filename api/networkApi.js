const express = require('express');
const router = express.Router();
const db = require("../connection");
const moment = require("moment");

//Get network data for a cetrtain ip
router.get('/ip/:ip', async (req, res) => {
    console.log('GET /network/ip/:ip');
    //get query parameters
    const time = req.query.time;
    const ip = req.params.ip;

    //This regex tests if the IP is a valid IP address format
    const ipRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

    if (ipRegex.test(req.params.ip)) {

        if (time) {

            //Get times for start and end of given time frame
            const latestTime = moment().format("'YYYY-MM-DD HH:mm:ss'");
            const pastTime = moment().subtract(time, 'minute').format("'YYYY-MM-DD HH:mm:ss'");
            const between = pastTime + " and " + latestTime;

            //Query the database based on params
            db.query(`SELECT * FROM Network WHERE ip_address='${ip}' AND time between ${between}`, function (results) {
                const data = parseData(results, time);
                return res.status(200).send(data);
            });
    
        } else {
            db.query(`SELECT * FROM Network WHERE ip_address=${ip}`, function (result) {
                return res.status(200).send(result);
            });
        }
    }
    else {
        return res.status(400).send({ error: "Invalid ip address query parameter" });
    }

})

/**
 * This method parses the sql result and formats the response by aggregating data by minute. It also
 * converts bytes into megabytes.
 * @param {Array} result The result from the sql query
 * @param {Number} totalTime The total timeframe in minutes
 */
function parseData(result, totalTime) {
    let res = [], startTime = moment().subtract(totalTime, 'minute').seconds(0);
    
    //Getting the rest of the non-changing data such as id, etc.
    const data = result.length > 0 ? result[0] : null; 

    for (let i = 0; i < totalTime; i++) {

        //Clone is necessary to not get a reference to the original moment object
        let currentTime = startTime.clone().add(i, 'minute');

        //Searching for all results within the same minute
        let foundRows = result.filter(row => currentTime.isSame(moment(row.time), 'hour') && currentTime.isSame(moment(row.time), 'minute'));

        if (foundRows.length > 0) {
            let totalReceived = 0, totalSent = 0;

            //Average the traffic by minute
            foundRows.forEach(row => {
                totalReceived += row.received_bytes;
                totalSent += row.sent_bytes;

            });

            //Calculating traffic and converting to MB
            const received = (totalReceived / foundRows.length) / 1000;
            const sent = (totalSent / foundRows.length) / 1000;

            res.push({ ...data, time: currentTime.format("YYYY-MM-DD HH:mm:ss"), received_bytes: received, sent_bytes: sent });
        }
        //If no data is found for this minute, return 0 for bytes
        else res.push({ ...data, time: currentTime.format("YYYY-MM-DD HH:mm:ss"), received_bytes: 0, sent_bytes: 0 });
    }
    return res;
}

//Get all devices from a certain user : ?user=[user]
router.get('/devices', async (req, res) => {

    console.log('GET /network/devices');
    
    if (req.query.user) {
        db.query(`SELECT DISTINCT ip_address FROM Network WHERE user_id=${req.query.user}`, function (result) {
            return res.status(200).send(result);
        });
    }
    else {
        db.query(`SELECT DISTINCT ip_address FROM Network`, function (result) {
            const filtered = [];
            
            result.forEach(row => {
                //Filter IPs that start with the RaspAP mask
                if (row.ip_address.startsWith('10.3.141')) filtered.push(row);
            })

            return res.status(200).send(filtered);
        });
    }

})
module.exports = router;

