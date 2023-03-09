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

app.post('/createAnchor', (reg, res) => { //přidání záznamu do tabulky anchorage
	const name = reg.body.name
	const latitude = reg.body.latitude
	const longitude = reg.body.longitude
	const capacity_id = reg.body.capacity
	const water_deep_id = reg.body.waterDeep
	const wind_id = reg.body.wind
	const bottom_id = reg.body.bottom

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

app.post('/createBuoy', (reg, res) => { //přidání záznamu do tabulky anchorage
	const name = reg.body.name
	const latitude = reg.body.latitude
	const longitude = reg.body.longitude
	const capacity_id = reg.body.capacity
	const wind_id = reg.body.wind
	console.log(wind_id,"wind")
	db.query('INSERT INTO buoy (name, latitude, longitude, capacity_id ) VALUES (?, ?, ?, ?)',
		[name, latitude, longitude, capacity_id],
		(err, result) => {
			if (err) {
				console.log(err)
			}
			else {
				const buoy_id = result.insertId; //získání ID nového záznamu v tabulce anchorage

				const valuesWind = wind_id.map((id) => [buoy_id, id]); //vytvoření pole hodnot pro vkládání do tabulky anchorage_wind

				db.query('INSERT INTO buoy_wind (buoy_id, wind_id) VALUES ?',
					[valuesWind],
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

app.post('/createCityDock', (reg, res) => { //přidání záznamu do tabulky anchorage
	const name = reg.body.name
	const latitude = reg.body.latitude
	const longitude = reg.body.longitude
	const capacity_id = reg.body.capacity
	const water_deep_id = reg.body.waterDeep
	const wind_id = reg.body.wind
	const equipment_id = reg.body.equipment


	db.query(
		'INSERT INTO city_dock (name, latitude, longitude, capacity_id, water_deep_id) VALUES (?, ?, ?, ?, ?)',
		[name, latitude, longitude, capacity_id, water_deep_id],
		(err, result) => {
			if (err) {
				console.log(err)
			}
			else {
				const cityDock_id = result.insertId; //získání ID nového záznamu v tabulce anchorage

				const valuesWind = wind_id.map((id) => [cityDock_id, id]); //vytvoření pole hodnot pro vkládání do tabulky anchorage_wind
				const valuesEquipment = equipment_id.map((id) => [cityDock_id, id])
				db.query(
					'INSERT INTO city_dock_wind (city_dock_id, wind_id) VALUES ?',
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
					'INSERT INTO city_dock_equipment (city_dock_id, equipment_id) VALUES ?',
					[valuesEquipment],
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

app.post('/createMarina', (reg, res) => { //přidání záznamu do tabulky anchorage
	const name = reg.body.name
	const latitude = reg.body.latitude
	const longitude = reg.body.longitude
	const capacity_id = reg.body.capacity
	const water_deep_id = reg.body.waterDeep
	const wind_id = reg.body.wind
	const equipment_id = reg.body.equipment


	db.query(
		'INSERT INTO marina (name, latitude, longitude, capacity_id, water_deep_id) VALUES (?, ?, ?, ?, ?)',
		[name, latitude, longitude, capacity_id, water_deep_id],
		(err, result) => {
			if (err) {
				console.log(err)
			}
			else {
				const marinaId = result.insertId; //získání ID nového záznamu v tabulce anchorage

				const valuesWind = wind_id.map((id) => [marinaId, id]); //vytvoření pole hodnot pro vkládání do tabulky anchorage_wind
				const valuesEquipment = equipment_id.map((id) => [marinaId, id])
				db.query(
					'INSERT INTO marina_wind (marina_id, wind_id) VALUES ?',
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
					'INSERT INTO marina_equipment (marina_id, equipment_id) VALUES ?',
					[valuesEquipment],
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
		'SELECT anchorage.*, capacity.capacity AS capacity, water_deep.deep AS waterDeep, GROUP_CONCAT(DISTINCT anchorage_wind.wind_id) AS wind_id, GROUP_CONCAT(DISTINCT anchorage_bottom.bottom_id) AS bottom_id, GROUP_CONCAT(DISTINCT wind.wind) AS wind, GROUP_CONCAT(DISTINCT bottom.bottom) AS bottom ' +
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

app.get('/buoy', (reg, res) => {
	db.query(
		'SELECT buoy.*, capacity.capacity AS capacity, GROUP_CONCAT(DISTINCT buoy_wind.wind_id) AS wind_id, GROUP_CONCAT(wind.wind) AS wind ' +
		'FROM buoy ' +
		'JOIN capacity ON buoy.capacity_id = capacity.id ' +
		'LEFT JOIN buoy_wind ON buoy.id = buoy_wind.buoy_id ' +
		'LEFT JOIN wind ON wind.id = buoy_wind.wind_id ' +
		'GROUP BY buoy.id',

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

app.get('/cityDock', (reg, res) => {
	db.query(
		'SELECT city_dock.*, capacity.capacity AS capacity, water_deep.deep AS waterDeep, GROUP_CONCAT(wind.wind) AS wind, GROUP_CONCAT(equipment.equipment) AS equipment ' +
		'FROM city_dock ' +
		'JOIN capacity ON city_dock.capacity_id = capacity.id ' +
		'JOIN water_deep ON city_dock.water_deep_id = water_deep.id ' +
		'LEFT JOIN city_dock_wind ON city_dock.id = city_dock_wind.city_dock_id ' +
		'LEFT JOIN city_dock_equipment ON city_dock.id = city_dock_equipment.city_dock_id ' +
		'LEFT JOIN equipment ON equipment.id = city_dock_equipment.equipment_id ' +
		'LEFT JOIN wind ON wind.id = city_dock_wind.wind_id ' +
		'GROUP BY city_dock.id',

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

app.get('/marina', (reg, res) => {
	db.query(
		'SELECT marina.*, capacity.capacity AS capacity, water_deep.deep AS waterDeep, GROUP_CONCAT(wind.wind) AS wind, GROUP_CONCAT(equipment.equipment) AS equipment ' +
		'FROM marina ' +
		'JOIN capacity ON marina.capacity_id = capacity.id ' +
		'JOIN water_deep ON marina.water_deep_id = water_deep.id ' +
		'LEFT JOIN marina_wind ON marina.id = marina_wind.marina_id ' +
		'LEFT JOIN marina_equipment ON marina.id = marina_equipment.marina_id ' +
		'LEFT JOIN equipment ON equipment.id = marina_equipment.equipment_id ' +
		'LEFT JOIN wind ON wind.id = marina_wind.wind_id ' +
		'GROUP BY marina.id',

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

app.put('/updateAnchorage', (req, res) => { //aktualizace záznamu
	const id = req.body.id
	const name = req.body.name
	const latitude = req.body.latitude
	const longitude = req.body.longitude
	const capacity = req.body.capacity
	const wind = req.body.wind
	const waterDeep = req.body.waterDeep
	const bottom = req.body.bottom

	db.query('UPDATE anchorage SET name = ?, latitude =?, longitude = ?, capacity_id = ?, water_deep_id = ? WHERE id = ?', [name, latitude, longitude, capacity, waterDeep, id], (err, result) => {
		if (err) {
			console.log(err)
		}
		else {
			db.query('DELETE FROM anchorage_wind WHERE anchorage_id = ?', [id], (err, result) => { // odstranění všech záznamů pro spojení m:n
				if (err) {
					console.log(err)
					res.end("Error updating anchorage")
				}
				else {
					db.query('DELETE FROM anchorage_bottom WHERE anchorage_id = ?', [id], (err, result) => { // odstranění všech záznamů pro spojení m:n
						if (err) {
							console.log(err)
							res.end("Error updating anchorage")
						}
						else {
							if (wind.length > 0) { // kontrola pro prázdné pole
								let wind_values = []
								wind.forEach((element) => {
									wind_values.push([id, element])
								})
								db.query('INSERT INTO anchorage_wind (anchorage_id, wind_id) VALUES ?', [wind_values], (err, result) => { // vložení nových záznamů pro spojení m:n
									if (err) {
										console.log(err)
										res.end("Error updating anchorage")
									}
									else {
										if (bottom.length > 0) { // kontrola pro prázdné pole
											let bottom_values = []
											bottom.forEach((element) => {
												bottom_values.push([id, element])
											})
											db.query('INSERT INTO anchorage_bottom (anchorage_id, bottom_id) VALUES ?', [bottom_values], (err, result) => { // vložení nových záznamů pro spojení m:n
												if (err) {
													console.log(err)
													res.end("Error updating anchorage")
												}
												else {
													res.end("Anchorage updated successfully")
												}
											})
										}
										else {
											res.end("Anchorage updated successfully")
										}
									}
								})
							}
							else {
								if (bottom.length > 0) { // kontrola pro prázdné pole
									let bottom_values = []
									bottom.forEach((element) => {
										bottom_values.push([id, element])
									})
									db.query('INSERT INTO anchorage_bottom (anchorage_id, bottom_id VALUES ?', [bottom_values], (err, result) => { // vložení nových záznamů pro spojení m:n
										if (err) {
											console.log(err)
											res.end("Error updating anchorage")
										}
										else {
											res.end("Anchorage updated successfully")
										}
									})
								}
								else {
									res.end("Anchorage updated successfully")
								}
							}
						}
					})
				}
			})
		}
	})
})

app.put('/updateBuoy', (req, res) => { //aktualizace záznamu
	const id = req.body.id
	const name = req.body.name
	const latitude = req.body.latitude
	const longitude = req.body.longitude
	const capacity = req.body.capacity
	const wind = req.body.wind

	db.query('UPDATE buoy SET name = ?, latitude =?, longitude = ?, capacity_id = ? WHERE id = ?', [name, latitude, longitude, capacity, id], (err, result) => {
		if (err) {
			console.log(err)
		}
		else {
			db.query('DELETE FROM buoy_wind WHERE buoy_id = ?', [id], (err, result) => { // odstranění všech záznamů pro spojení m:n
				if (err) {
					console.log(err)
					res.end("Error updating buoy")
				}
				else {
					if (wind.length > 0) { // kontrola pro prázdné pole
						let wind_values = []
						wind.forEach((element) => {
							wind_values.push([id, element])
						})
						db.query('INSERT INTO buoy_wind (buoy_id, wind_id) VALUES ?', [wind_values], (err, result) => { // vložení nových záznamů pro spojení m:n
							if (err) {
								console.log(err)
								res.end("Error updating buoy")
							}
						})
					}
					else {
						if (bottom.length > 0) { // kontrola pro prázdné pole
							let bottom_values = []
							bottom.forEach((element) => {
								bottom_values.push([id, element])
							})
							db.query('INSERT INTO buoy_bottom (buoy_id, bottom_id VALUES ?', [bottom_values], (err, result) => { // vložení nových záznamů pro spojení m:n
								if (err) {
									console.log(err)
									res.end("Error updating buoy")
								}
								else {
									res.end("Buoy updated successfully")
								}
							})
						}
						else {
							res.end("Buoy updated successfully")
						}
					}
				}
			})
		}
	})
}
)




app.delete("/deleteAnchorage/:id", (req, res) => {
	const id = req.params.id;
	db.query("DELETE FROM anchorage_bottom WHERE anchorage_id = ?", id, (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).send("An error occurred while deleting anchorage_bottom");
		} else {
			db.query("DELETE FROM anchorage_wind WHERE anchorage_id = ?", id, (err, result) => {
				if (err) {
					console.log(err);
					res.status(500).send("An error occurred while deleting anchorage_wind");
				} else {
					db.query("DELETE FROM anchorage WHERE id = ?", id, (err, result) => {
						if (err) {
							console.log(err);
							res.status(500).send("An error occurred while deleting anchorage");
						} else {
							res.send("Anchorage and related records deleted successfully");
						}
					})
				}
			})
		}
	})
})

app.delete("/deleteBuoy/:id", (req, res) => {
	const id = req.params.id;
	db.query("DELETE FROM buoy_wind WHERE buoy_id = ?", id, (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).send("An error occurred while deleting buoy_wind");
		} else {
			db.query("DELETE FROM buoy WHERE id = ?", id, (err, result) => {
				if (err) {
					console.log(err);
					res.status(500).send("An error occurred while deleting buoy");
				} else {
					res.send("Buoy and related records deleted successfully");
				}
			})
		}
	})
}
)





app.listen(3001, () => {
	console.log("tvůj server běží na portu 3001 ")
})