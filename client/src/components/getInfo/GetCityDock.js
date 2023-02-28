import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet'
import Axios from "axios"


const GetCityDock = () => {
	const [list, setList] = useState([]);
	const [name, setName] = useState(0);



	const getInfo = () => { //vytvoření spojení s databází, ze ktré získáme data
		Axios.get("http://localhost:3001/cityDock").then((response) => {
			const cityDockData = response.data;
			const CityDockMap = new Map();
			cityDockData.forEach((city_dock) => {
				if (!CityDockMap.has(city_dock.id)) {
					CityDockMap.set(city_dock.id, {
						id: city_dock.id,
						name: city_dock.name,
						latitude: city_dock.latitude,
						longitude: city_dock.longitude,
						winds: [city_dock.wind],
						equipment: [city_dock.equipment],
						capacity: city_dock.capacity,
						waterDeep: city_dock.waterDeep,
					});
				} else {
					let currCityDock = CityDockMap.get(city_dock.id);
					currCityDock.winds.push(city_dock.wind);
					currCityDock.bottom.push(city_dock.bottom)
					CityDockMap.set(city_dock.id, currCityDock);
				}
			})
			const uniquecityDockData = Array.from(CityDockMap.values());
			setList(uniquecityDockData);
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
						<h1>City dock</h1>
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
						<h2>Equipment</h2>
						{val.equipment.map((equipment) => (
							<p key={equipment}>{equipment}</p>
						))}

						<button onClick={() => deleteMarker(val.id)}>Smazat</button>
					</Popup>
				</Marker>
			))}

		</div>
	)
}

export default GetCityDock