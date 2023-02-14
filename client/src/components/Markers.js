/*
Tento kód vypíše všechny markery z databáze a a údaje markeru (po kliknutí na marker)
*/

import "./Markers.css"
import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet'
import Axios from "axios"

function Markers() {
	const [list, setList] = useState([]);
	const [name, setName] = useState(0);


	const getInfo = () => { //vytvoření spojení s databází, ze ktré získáme data
		Axios.get("http://localhost:3001/kot").then((response) => {
			setList(response.data)
			console.log(response.data)
		})
	}

	const updateMarker = (id) => {
		Axios.put("http://localhost:3001/update", { name: name, id: id }).then((response) => {
			setList(
				list.map((val) => {
					return val.id == id
						? {
							id: val.id,
							name: name,
						}
						: val;
				})
			)
		})
	}

	const deleteMarker = (id) => {
		Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
			setList(
				list.filter((val) => {
					return val.id != id;
				})
			)
		})

	}

	useEffect(() => { //odešle pžadavek na spojení se serverem
		getInfo()
	}, [])

	return (
		<div>
			{list.map((val) => ( // získáme data z databáze, které vypíšeme do marker->popup
				<Marker key={val.id} position={[val.latitude, val.longitude]}>
					<Popup>
						<h1>{val.name}</h1>
						{" "}
						<input type="text" onChange={(event) => setName(event.target.value)} />
						<button onClick={() => {
							updateMarker(val.id)
							getInfo()
						}
						}>Aktualizovat</button>
						<h2>{val.latitude}</h2>
						<h2>{val.longitude}</h2>

						<button onClick={() => deleteMarker(val.id)}>Smazat</button>
					</Popup>
				</Marker>
			))}		</div>
	)
}

export default Markers
