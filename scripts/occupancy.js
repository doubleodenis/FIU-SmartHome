var db = require("../connection");
var tf = require("@tensorflow/tfjs");
let meanEnergy = 3306.91358024691;
let meanBytes = 217525.888888889;
let stdEnergy = 869.752898036412;
let stdBytes = 1929437.1903038;

//Function loads TesnorFlow model, the model must be loaded throught the internet since local methods don't work.
//The function then predicts the occupancy using the tensor given to it, and insert the result to the database.
async function loadModel(data, date) {
  const model = await tf.loadLayersModel(
    "https://raw.githubusercontent.com/doubleodenis/energy_io/master/model/model.json"
  );
  const pred = model.predict(data);
  const tensorData = pred.dataSync();
  console.log(tensorData);
  let occupancy = Math.round(
    tensorData[0] < 0 ? 0 : tensorData[0] > 1 ? 1 : tensorData[0]
  );
  let sql = `INSERT INTO Occupancy(occupancy, date, user_id) VALUES(${occupancy}, '${date}', 1)`;
  console.log(sql);
  db.insert(sql);
}

async function occupancy(date) {
  //MySQL query that selects energy usage for a given datetime and joins it with the corresponding network row.
  // If no network row exists 0 is selectes as the byte transferred during the time period
  let query = `(SELECT energy, bytes FROM (
	(SELECT energy ,date FROM Energy e where e.user_id = 1 AND e.date = '${date}' ORDER BY id_energy  DESC LIMIT 1) as L
	JOIN
	(Select received_bytes + sent_bytes as bytes, time FROM Network n Where user_id = 1) as R
	ON L.date = R.time
	))
UNION ALL
(SELECt energy , 0 as bytes FROM Energy e2 where e2.user_id = 1 AND e2.date = '${date}' AND e2.date NOT IN (
	(SELECT date FROM (
	(SELECT energy ,date FROM Energy  where user_id = 1 ORDER BY id_energy  DESC LIMIT 1) as LL
	JOIN
	(Select time FROM Network n2 Where n2.user_id = 1) as RR
	ON LL.date = RR.time
	)))ORDER BY id_energy  DESC LIMIT 1 )`;

  //Run the MySQL query and select the first row returned. The standard score of the data is calculated and then loaded into a tensor.
  db.query(query, function (result2) {
    let result = 0;
    console.log(result2);
    if (result2 == null || result2.length == 0) {
      result = tf.tensor2d([
        [(0 - meanEnergy) / stdEnergy, (0 - meanBytes) / stdBytes],
      ]);
    } else {
      result = tf.tensor2d([
        [
          (result2[0].energy - meanEnergy) / stdEnergy,
          (result2[0].bytes - meanBytes) / stdBytes,
        ],
      ]);
    }
    result.print();
    loadModel(result, date);
  });
}

module.exports = {
  occupancy,
};
