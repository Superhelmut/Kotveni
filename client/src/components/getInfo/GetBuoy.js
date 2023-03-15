import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet'
import Axios from "axios"
import Capacity from '../database/Capacity';
import Wind from '../database/Wind';
import L from 'leaflet';
import icon from '../../../node_modules/leaflet/dist/images/buoy_min.png';



const Getbuoy = () => {
	const [list, setList] = useState([]);
	const [name, setName] = useState(0);
	const [show, setShow] = useState(1)
	const [selectedItemIdCapacity, setSelectedItemIdCapacity] = useState("");
	const [selectedItemIdWind, setSelectedItemIdWind] = useState("")
	const [latitudeData, setLatitudeData] = useState()
	const [longitudeData, setLongitudeData] = useState()


	const defaultIcon = L.icon({
		iconUrl: icon,
		iconSize: [25, 35],
	});

	const handleSelectedItemIdCapacity = (id) => { // definovat callback funkci
		setSelectedItemIdCapacity(id); // aktualizovat stav selectedItemIdCapacity
	};

	const handleSelectedItemIdWind = (id) => {
		setSelectedItemIdWind(id)
	}


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
						windId: [buoy.wind_id],
					});
				} else {
					let currBuoy = buoyMap.get(buoy.id);
					currBuoy.winds.push(buoy.wind);
					currBuoy.bottom.push(buoy.bottom)
					currBuoy.windId.push(buoy.wind_id)

					buoyMap.set(buoy.id, currBuoy);
				}
			})
			const uniqueBuoyData = Array.from(buoyMap.values());
			setList(uniqueBuoyData);
			const name = uniqueBuoyData[0].name
			setLatitudeData(uniqueBuoyData[0].latitude)
			setLongitudeData(uniqueBuoyData[0].longitude)
			setName(name)
		})
	}

	const updateMarker = (id) => { //databázové spojení pro aktualizaci dat
		Axios.put("http://localhost:3001/updateBuoy", { name: name, id: id, latitude: latitudeData, longitude: longitudeData, capacity: selectedItemIdCapacity, wind: selectedItemIdWind, }).then((response) => {
			setList(
				list.map((val) => {
					return val.id == id
						? {
							id: val.id,
							name: name,
							latitude: latitudeData,
							longitude: longitudeData,
							capacity: selectedItemIdCapacity,
							wind: selectedItemIdWind,

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
				<Marker key={val.id} position={[val.latitude, val.longitude]} icon={defaultIcon}>
					<Popup>
						{show == 1 &&

							<div>
								<h1>{val.name} </h1>
								<h1>Buoy</h1>
								<h2>{val.latitude}</h2>
								<h2>{val.longitude}</h2>
								<h2>Capacity</h2>
								<p>{val.capacity}</p>
								<h2>Wind</h2>
								{val.winds.map((wind) => (
									<p key={wind}>{wind}</p>
								))}
								<button onClick={() => setShow(2)}>Update</button>
							</div>

						}
						{show == 2 &&
							<div>
								<h2>Update name</h2>
								<input type="text" value={name} onChange={(event) => setName(event.target.value)} />
								<h2>Update capacity</h2>
								<Capacity capacity={val.capacity} onSelectedItemIdCapacity={handleSelectedItemIdCapacity} />
								<h2>Update wind</h2>
								<Wind wind={Array.isArray(val.windId) ? val.windId[0].split(",") : []} onSelectedItemIdWind={handleSelectedItemIdWind} />

								<button onClick={() => {
									updateMarker(val.id)
								}
								}>Aktualizovat</button>
							</div>
						}

						<button onClick={() => deleteMarker(val.id)}>Smazat</button>
					</Popup>
				</Marker>
			))}

		</div>
	)
}

export default Getbuoy