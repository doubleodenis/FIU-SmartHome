var Wemo = require("wemo-client");
var moment = require("moment");
var wemo = new Wemo();
let mysql = require("mysql");

function foundDevice(err, device) {
  var con = mysql.createConnection({
    host:
      process.env.RDS_HOSTNAME ||
      "hassio-senior.ch89zlanp2xd.us-east-2.rds.amazonaws.com",
    user: process.env.RDS_USERNAME || "admin",
    password: process.env.RDS_PASSWORD || "0Lp18&Pl&pG#2u3*",
    database: "Smart_Home"
  });

  con.connect(function(error) {
    console.log("connected");
    if (error) throw error;
  });

  if (device.deviceType === Wemo.DEVICE_TYPE.Insight) {
    console.log("Wemo Insight Switch found: %s", device.friendlyName);
    var client = this.client(device);
    client.on("insightParams", function(state, power) {
      console.log(
        "%s’s power consumption: %s W",
        this.device.friendlyName,
        power
      );

      date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      let val = power + ", " + "'" + date + "'";
      var sql = `INSERT INTO Energy (Energy, Date) VALUES (${val})`;

      con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("1 record inserted, ID: " + result.insertId);
      });
    });
  }
}

wemo.discover(foundDevice);

module.exports = foundDevice;
