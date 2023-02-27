const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require("cors")

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({ //vytvoření databázového spojení
	user: 'root',
	host: 'localhost',
	password: '',
	database: 'kotveni',

});

app.post('/create', (reg, res) => { //přidání záznamu
	const name = reg.body.name
	const latitude = reg.body.latitude
	const longitude = reg.body.longitude
	const capacity_id = reg.body.capacity

	console.log(capacity_id)

	db.query(
		'INSERT INTO anchorage (name, latitude, longitude, capacity_id) VALUES (?, ?, ?, ?)',
		[name, latitude, longitude, capacity_id],
		(err, result) => {
			if (err) {
				console.log(err)
			}
			else {
				res.send("Data odeslána")
			}
		}

	)

})

app.get('/kot', (reg, res) => { //čtení záznamu
	db.query('SELECT anchorage.*, capacity.capacity AS capacityID FROM anchorage JOIN capacity ON anchorage.capacity_id = capacity.id',
		(err, result) => {
			if (err) {
				console.log(err)
			}
			else {
				res.send(result)
				console.log("data")
			}
		}
	)
})


app.get('/deep', (reg, res) => { //čtení záznamu
	db.query('SELECT * FROM water_deep',
		(err, result) => {
			if (err) {
				console.log(err)
			}
			else {
				res.send(result)
				console.log("data from deep")
			}
		}
	)
})

app.get('/capacity', (reg, res) => { //čtení záznamu
	db.query('SELECT * FROM capacity',
		(err, result) => {
			if (err) {
				console.log(err)
			}
			else {
				res.send(result)
				console.log("data from capacity")
			}
		}
	)
})

app.put('/update', (reg, res) => { //aktualizace záznamu
	const id = reg.body.id
	const name = reg.body.name
	const latitude = reg.body.latitude
	const longitude = reg.body.longitude
	db.query('UPDATE anchorage SET name = ? WHERE id = ?', [name, id], (err, result) => {
		if (err) {
			console.log(err)
		}
		else {
			res.send(result)
		}
	})
})

app.delete("/delete/:id", (req, res) => { //smazání záznamu
	const id = req.params.id;
	db.query("DELETE FROM anchorage WHERE id = ?", id, (err, result) => {
	  if (err) {
		console.log(err);
	  } else {
		res.send(result);
	  }
	});
  });

app.listen(3001, () => {
	console.log("tvůj server běží na portu 3001 ")
})