const express = require("express"),
    bodyParser = require("body-parser"),
    PORT = process.env.PORT || 3001;

const wemo = require("./scripts/wemo");
const db = require("./connection");
const app = express();

process.env.NODE_ENV === "production" ? app.use(express.static("energy-io/build")) : null;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use("/api", apiRoutes);

// app.get("*", function(req, res) {
//     res.sendFile(path.join(__dirname, "./client/build/index.html"));
// })

app.listen(PORT, function() {
    console.log(`Server running on port ${PORT}!`);
});

db.query('SELECT * FROM `Energy`');