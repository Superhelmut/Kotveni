import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet'
import Axios from "axios"


const Getbuoy = () => {
	const [list, setList] = useState([]);
	const [name, setName] = useState(0);



	const getInfo = () => { //vytvoření spojení s databází, ze ktré získáme data
		Axios.get("http://localhost:3001/buoy").then((response) => {
			const buoyData = response.data;
			const buoyMap = new Map();
			buoyData.forEach((buoy) => {
				if (!buoyMap.has(buoy.id)) {
					buoyMap.set(buoy.id, {
						id: buoy.id,
						name: buoy.name,
						latitude: buoy.latitude,
						longitude: buoy.longitude,
						winds: [buoy.wind],
						bottom: [buoy.bottom],
						capacity: buoy.capacity,
						waterDeep: buoy.waterDeep,
					});
				} else {
					let currBuoy = buoyMap.get(buoy.id);
					currBuoy.winds.push(buoy.wind);
					currBuoy.bottom.push(buoy.bottom)
					buoyMap.set(buoy.id, currBuoy);
				}
			})
			const uniqueBuoyData = Array.from(buoyMap.values());
			setList(uniqueBuoyData);
		})
	}

	const updateMarker = (id, latitude, longitude) => { //databázové spojení pro aktualizaci dat
		Axios.put("http://localhost:3001/update", { name: name, id: id, latitude: latitude, longitude: longitude }).then((response) => {
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
						<h1>Buoy</h1>
						<input type="text" onChange={(event) => setName(event.target.value)} />
						<button onClick={() => {
							updateMarker(val.id)
						}
						}>Aktualizovat</button>
						<h2>{val.latitude}</h2>
						<h2>{val.longitude}</h2>
						<h2>Capacity</h2>
						<p>{val.capacity}</p>
						<h2>Water deep</h2>
						<p>{val.waterDeep}</p>
						<h2>Wind</h2>
						{val.winds.map((wind) => (
							<p key={wind}>{wind}</p>
						))}
						<h2>Bottom</h2>
						{val.bottom.map((bottom) => (
							<p key={bottom}>{bottom}</p>
						))}

						<button onClick={() => deleteMarker(val.id)}>Smazat</button>
					</Popup>
				</Marker>
			))}

		</div>
	)
}

export default Getbuoy