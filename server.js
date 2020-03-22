const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
// const wemo = require("./scripts/EnergyUsageWemo")
const db = require("./connection")
const network = require("./scripts/network");
const app = express();

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5050;
process.env.NODE_ENV === "production" ? app.use(express.static("energy-io/build")) : null;

// app.use("/api", apiRoutes);

// app.get("*", function(req, res) {
//     res.sendFile(path.join(__dirname, "./client/build/index.html"));
// })

app.get("/", function(req, res) {
    console.log("GET /")
    return res.status(200).send("GET /")
})
//Middleware Routes
const energyApi = require('./api/wemoApi');
app.use("/energy", energyApi);

const networkApi = require('./api/networkApi');
app.use("/network", networkApi);


app.listen(PORT, function() {
    console.log(`Server running on port ${PORT}!`);
});

//id_network, user_id, received_bytes, sent bytes, ip_address, time
// db.query('SELECT * FROM Network', function(res) {
//     console.log(res);
// });

const net = network.startNetworkTracking();

//List of devices
setTimeout(function () {
    console.log("Devices:", net.devices);
}, 5000);
