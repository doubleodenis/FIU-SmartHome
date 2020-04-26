var Wemo = require("wemo-client");
var moment = require("moment");
var wemo = new Wemo();
var db = require("../connection");
var occ = require("./occupancy");

//Time rounded to closes 5 second interval for calling occupancy script
let tempDate = moment();

const tempRemainder = 5 - (tempDate.seconds() % 5);
tempDate = moment(tempDate)
  .add(tempRemainder, "seconds")
  .format("YYYY-MM-DD HH:mm:ss");

let prevTime = tempDate;

//Function that continually scans for Wemo Insight devices and retrieves their current energy usage, and insert the energy data rounded to the next 5 second interval
function foundDevice(err, device) {
  if (device.deviceType === Wemo.DEVICE_TYPE.Insight) {
    //console.log("Wemo Insight Switch found: %s", device.friendlyName);
    var client = this.client(device);
    client.on("insightParams", function (state, power) {
      // console.log(
      //   "%s’s power consumption: %s W",
      //   this.device.friendlyName,
      //   power
      // );

      let date = moment();

      const remainder = 5 - (date.seconds() % 5);
      date = moment(date)
        .add(remainder, "seconds")
        .format("YYYY-MM-DD HH:mm:ss");

      let val =
        "'" +
        device.friendlyName +
        "', '" +
        device.UDN.substring(17) +
        "'," +
        power +
        ",'" +
        date +
        "', " +
        "1";
      var sql = `Call 5Energy(${val})`;
      console.log(sql);
      db.insert(sql);

      //Call the occupancy script once the time changes to the next 5 second interval
      if (prevTime != date) {
        occ.occupancy(prevTime);
      }

      prevTime = date;
    });
  }
}

wemo.discover(foundDevice);

module.exports = foundDevice;
