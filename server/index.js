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
	const water_deep_id = reg.body.waterDeep
	const wind_id = reg.body.wind
	const bottom_id = reg.body.bottom

	console.log(wind_id)

	db.query(
		'INSERT INTO anchorage (name, latitude, longitude, capacity_id, water_deep_id) VALUES (?, ?, ?, ?, ?)',
		[name, latitude, longitude, capacity_id, water_deep_id],
		(err, result) => {
			if (err) {
				console.log(err)
			}
			else {
				const anchorage_id = result.insertId; //získání ID nového záznamu v tabulce anchorage

				const valuesWind = wind_id.map((id) => [anchorage_id, id]); //vytvoření pole hodnot pro vkládání do tabulky anchorage_wind
				const valuesBottom = bottom_id.map((id) => [anchorage_id, id])
				db.query(
					'INSERT INTO anchorage_wind (anchorage_id, wind_id) VALUES ?',
					[valuesWind],
					(err, result) => {
						if (err) {
							console.log(err);
						} else {
							res.end("Data odeslána");
						}
					}
				);

				db.query(
					'INSERT INTO anchorage_bottom (anchorage_id, bottom_id) VALUES ?',
					[valuesBottom],
					(err, result) => {
						if (err) {
							console.log(err);
						} else {
							res.end("Data odeslána");
						}
					}
				);
			}
		}

	)

})

app.get('/kot', (reg, res) => {
	db.query(
		'SELECT anchorage.*, capacity.capacity AS capacity, water_deep.deep AS waterDeep, GROUP_CONCAT(wind.wind) AS wind, GROUP_CONCAT(bottom.bottom) AS bottom ' +
		'FROM anchorage ' +
		'JOIN capacity ON anchorage.capacity_id = capacity.id ' +
		'JOIN water_deep ON anchorage.water_deep_id = water_deep.id ' +
		'LEFT JOIN anchorage_wind ON anchorage.id = anchorage_wind.anchorage_id ' +
		'LEFT JOIN anchorage_bottom ON anchorage.id = anchorage_bottom.anchorage_id ' +
		'LEFT JOIN bottom ON bottom.id = anchorage_bottom.bottom_id ' +
		'LEFT JOIN wind ON wind.id = anchorage_wind.wind_id ' +
		'GROUP BY anchorage.id',

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