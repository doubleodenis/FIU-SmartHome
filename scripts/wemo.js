const Wemo = require('wemo-client');
const wemo = new Wemo();

let wemos = [];
wemo.discover(function(err, deviceInfo) {
//   console.log('Wemo Device Found: %j', deviceInfo);

  // Get the client for the found device
  var client = wemo.client(deviceInfo);
  wemos.push(client);
  
  // You definitely want to listen to error events (e.g. device went offline),
  // Node will throw them as an exception if they are left unhandled  
  client.on('error', function(err) {
    console.log('Error: %s', err.code);
  });
 
  // Handle BinaryState events
  client.on('binaryState', function(value) {
    console.log('Binary State changed to: %s', value);
  });
 
  // Turn the switch on
//   client.setBinaryState(1);
});

//Wait to discover the wemos
setTimeout(function() {
    wemos.forEach(w => {
        console.log(w);
        if(w.device.modelName == "Insight") {

            // String binaryState 1 = on, 0 = off, 8 = standby
            // String instantPower Current power consumption in mW
            // Object data Aggregated usage data
            w.getInsightParams(function(err, binaryState, instantPower, data) {
                console.log(instantPower)
                console.log(data);
            })
        }
    })
}, 3000);

module.exports = wemo;