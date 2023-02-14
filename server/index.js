const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require("cors")

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
	user: 'root',
	host: 'localhost',
	password: '',
	database: 'kotveni',

});

app.post('/create', (reg, res) => {
	const name = reg.body.name
	const latitude = reg.body.latitude
	const longitude = reg.body.longitude

	db.query(
		'INSERT INTO kotva (name, latitude, longitude) VALUES (?, ?, ?)',
		[name, latitude, longitude],
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

app.get('/kot', (reg, res) => {
	db.query('SELECT * FROM kotva',
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

app.listen(3001, () => {
	console.log("tvůj server běží na portu 3001 ")
})