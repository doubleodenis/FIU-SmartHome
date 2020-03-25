var Wemo = require("wemo-client");
var moment = require("moment");
var wemo = new Wemo();
var db = require("../connection");

function foundDevice(err, device) {
  if (device.deviceType === Wemo.DEVICE_TYPE.Insight) {
    console.log("Wemo Insight Switch found: %s", device.friendlyName);
    var client = this.client(device);
    client.on("insightParams", function(state, power) {
      console.log(
        "%s’s power consumption: %s W",
        this.device.friendlyName,
        power
      );

      let date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      let val =
        power +
        ", " +
        "'" +
        date +
        "', '" +
        device.friendlyName +
        "', '" +
        device.UDN.substring(17) +
        "'";
      var sql = `INSERT INTO Energy (energy, date, device_name, device_serial_number) VALUES (${val})`;

      db.insert(sql);
    });
  }
}

wemo.discover(foundDevice);

module.exports = foundDevice;
