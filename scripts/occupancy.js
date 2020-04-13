var moment = require("moment");
var db = require("../connection");
var tf = require('@tensorflow/tfjs');


async function loadModel(data, date) {
  const model = await tf.loadLayersModel('https://raw.githubusercontent.com/syorizzo/test/master/converted_model2/model.json')
  const pred = model.predict(data)
  const tensorData = pred.dataSync()
  let occupancy = Math.round(tensorData[0] < 0 ? 0 : (tensorData[0] > 1 ? 1 : tensorData[0]))
  let sql = `INSERT INTO Occupancy(occupancy, date, user_id) VALUES(${occupancy}, '${date}', 1)`
  console.log(sql);
  db.insert(sql);
}


async function occupancy() {
  let date = moment();

  let remainder = date.seconds() % 10;
  remainder = remainder === 0 ? 5 : (remainder > 5 ? remainder - 5 : remainder)
  date = moment(date)
    .add(-1 * remainder, "seconds")
    .format("YYYY-MM-DD HH:mm:ss");

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
	)))ORDER BY id_energy  DESC LIMIT 1 )`

  db.query(query,
    function(result2) {
      console.log(result2);
      let result =  result2 === [] ? tf.tensor2d([[0,0]]) :tf.tensor2d([
        [result2[0].energy, result2[0].bytes]
      ]);
      loadModel(result, date)
    });
}

module.exports = {
  occupancy,
}
