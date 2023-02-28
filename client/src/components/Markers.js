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

	const updateMarker = (id, latitude, longitude) => { //databázové spojení pro aktualizaci dat
		Axios.put("http://localhost:3001/update", { name: name, id: id, latitude: latitude, longitude: longitude}).then((response) => {
			setList(
				list.map((val) => {
					return val.id == id
						? {
							id: val.id,
							name: name,
							latitude: val.latitude,
							longitude: val.longitude
						}
						: val;
				})
			)
		})
	}

	const deleteMarker = (id) => { //smazání záznamu z databáze -> spojení s databází
		Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
			setList(
				list.filter((val) => {
					return val.id != id;
				})
			)
		})

	}

	useEffect(() => { //odešle pžadavek na spojení se serverem  a díky tomu se vypíší data do popupu
		getInfo()
	}, [])



	return (
		<div>
			{list.map((val) => ( // získáme data z databáze, které vypíšeme do marker->popup

				<Marker key={val.id} position={[val.latitude, val.longitude]}>
					<Popup>
						<h1>{val.name} </h1>
						<input type="text" onChange={(event) => setName(event.target.value)} />
						<button onClick={() => {
							updateMarker(val.id)
						}
						}>Aktualizovat</button>
						<h2>{val.latitude}</h2>
						<h2>{val.longitude}</h2>
						<label>Capacity</label>
						<h2>{val.capacity}</h2>
						<label>Water deep</label>
						<h2>{val.waterDeep}</h2>

						<button onClick={() => deleteMarker(val.id)}>Smazat</button>
					</Popup>
				</Marker>
			))}
		</div>
	)
}

export default Markers
