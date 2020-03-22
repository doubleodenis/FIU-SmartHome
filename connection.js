const mysql = require("mysql");

var connection = mysql.createConnection({
    host     : process.env.RDS_HOSTNAME || "hassio-senior.ch89zlanp2xd.us-east-2.rds.amazonaws.com",
    user     : process.env.RDS_USERNAME || "admin",
    password : process.env.RDS_PASSWORD || "0Lp18&Pl&pG#2u3*",
    // port     : process.env.RDS_PORT || 5000
    database : 'Smart_Home'
  });
  

connection.connect(function(err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
});


function query(q, callback) {

    connection.query(q, function (error, results, fields) {
        if (error) throw error;
        console.log(fields)
        return callback(results);
    });
}

function insert(sql, callback) {
    connection.connect(function(err) {
        if (err) {
            console.error('Database connection failed: ' + err.stack);
            return;
        }
        // console.log('Connected to database.');
    });

    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        
        return callback(results);
    });
}

module.exports = {
    query,
    insert,
    connection
};  