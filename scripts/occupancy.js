var db = require("../connection");
var tf = require('@tensorflow/tfjs');
let meanEnergy = 3306.91358024691
let meanBytes = 217525.888888889
let stdEnergy = 869.752898036412
let stdBytes = 1929437.1903038

async function loadModel(data, date) {
  const model = await tf.loadLayersModel('https://raw.githubusercontent.com/syorizzo/test/master/converted_model2/model.json')
  const pred = model.predict(data)
  const tensorData = pred.dataSync()
  console.log(tensorData)
  let occupancy = Math.round(tensorData[0] < 0 ? 0 : (tensorData[0] > 1 ? 1 : tensorData[0]))
  let sql = `INSERT INTO Occupancy(occupancy, date, user_id) VALUES(${occupancy}, '${date}', 1)`
  console.log(sql);
  db.insert(sql);
}


async function occupancy(date) {


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
    	let result = 0
    	console.log(result2)
    	if (result2 == null || result2.length == 0 ){
    		result = tf.tensor2d([[0,0]])
    	}
    	else{
    		result = tf.tensor2d([[ (result2[0].energy - meanEnergy)/stdEnergy , (result2[0].bytes - meanEnergy)/stdBytes]])
    	}
      result.print()
      loadModel(result, date)
    });
}

module.exports = {
  occupancy,
}
