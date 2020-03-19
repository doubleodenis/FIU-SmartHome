const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const wemo = require("./scripts/EnergyUsageWemo")
// const wemo = require("./scripts/wemo");
const network = require("./scripts/network");
const app = express();

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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

app.listen(PORT, function() {
    console.log(`Server running on port ${PORT}!`);
});

// db.query('SELECT * FROM Energy', function(res) {
//     res.forEach(r => {
//         console.log(moment(new Date(r.Date)).format("'YYYY-MM-DD HH:mm:ss'"));
//     })
// });

