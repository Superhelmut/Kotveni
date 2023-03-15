import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet'
import Axios from "axios"
import Capacity from '../database/Capacity';
import WaterDeep from '../database/WaterDeep';
import Wind from '../database/Wind';
import Bottom from '../database/Bottom';
import L from 'leaflet';
import icon from '../../../node_modules/leaflet/dist/images/anchorage.png';




const GetAnchorage = () => {
	const [list, setList] = useState([]);
	const [name, setName] = useState("");
	const [show, setShow] = useState(1)
	const [selectedItemIdCapacity, setSelectedItemIdCapacity] = useState("");
	const [selectedItemIdWaterDeep, setSelectedItemIdWaterDeep] = useState("")
	const [selectedItemIdWind, setSelectedItemIdWind] = useState("")
	const [selectedItemIdBottom, setSelectedItemIdBottom] = useState("")
	const [latitudeData, setLatitudeData] = useState()
	const [longitudeData, setLongitudeData] = useState()


	const defaultIcon = L.icon({
		iconUrl: icon,
		iconSize: [25, 35],
	});



	const handleSelectedItemIdCapacity = (id) => { // definovat callback funkci
		setSelectedItemIdCapacity(id); // aktualizovat stav selectedItemIdCapacity
	};

	const handleSelectedItemIdWaterDeep = (id) => {
		setSelectedItemIdWaterDeep(id)
	}
	const handleSelectedItemIdWind = (id) => {
		setSelectedItemIdWind(id)
	}
	const handleSelectedItemIdBottom = (id) => {
		setSelectedItemIdBottom(id)
	}




	const getInfo = () => { //vytvoření spojení s databází, ze ktré získáme data
		Axios.get("http://localhost:3001/kot").then((response) => {
			const anchorageData = response.data;
			const anchorageMap = new Map();
			anchorageData.forEach((anchorage) => {
				if (!anchorageMap.has(anchorage.id)) {
					anchorageMap.set(anchorage.id, {
						id: anchorage.id,
						name: anchorage.name,
						latitude: anchorage.latitude,
						longitude: anchorage.longitude,
						winds: [anchorage.wind], // přidává wind hodnotu
						bottom: [anchorage.bottom],
						capacity: anchorage.capacity,
						waterDeep: anchorage.waterDeep,
						windId: [anchorage.wind_id],
						bottomId: [anchorage.bottom_id],
					});
				} else {
					let currAnchorage = anchorageMap.get(anchorage.id);
					currAnchorage.winds.push(anchorage.wind); // přidává wind hodnotu					
					currAnchorage.bottom.push(anchorage.bottom)
					currAnchorage.windId.push(anchorage.wind_id); // přidává wind_id hodnotu	
					currAnchorage.bottomId.push(anchorage.bottom_id); // přidává bottom_id hodnotu					


					anchorageMap.set(anchorage.id, currAnchorage);
				}
			})
			const uniqueAnchorageData = Array.from(anchorageMap.values());
			setList(uniqueAnchorageData);
			const name = uniqueAnchorageData[0].name;
			setLatitudeData(uniqueAnchorageData[0].latitude)
			setLongitudeData(uniqueAnchorageData[0].longitude)
			setName(name);
		})
	}
	const updateMarker = (id) => { //databázové spojení pro aktualizaci dat
		Axios.put("http://localhost:3001/updateAnchorage", { name: name, id: id, latitude: latitudeData, longitude: longitudeData, capacity: selectedItemIdCapacity, wind: selectedItemIdWind, waterDeep: selectedItemIdWaterDeep, bottom: selectedItemIdBottom }).then((response) => {
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
							waterDeep: selectedItemIdWaterDeep,
							bottom: selectedItemIdBottom
						}
						: val;
				})
			)
		})
	}
	const deleteMarker = (id) => { //smazání záznamu z databáze -> spojení s databází
		Axios.delete(`http://localhost:3001/deleteAnchorage/${id}`).then((response) => {
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
								<h1>Anchorage</h1>
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
								<button onClick={() => setShow(2)}>Update</button>
							</div>
						}
						{show == 2 &&
							<div>
								<h2>Update name</h2>
								<input type="text" value={name} onChange={(event) => setName(event.target.value)} />
								<h2>Update capacity</h2>
								<Capacity capacity={val.capacity} onSelectedItemIdCapacity={handleSelectedItemIdCapacity} />
								<h2>Update water deep</h2>
								<WaterDeep waterDeep={val.waterDeep} onSelectedItemIdWaterDeep={handleSelectedItemIdWaterDeep} />
								<h2>Update wind</h2>
								<Wind wind={Array.isArray(val.windId) ? val.windId[0].split(",") : []} onSelectedItemIdWind={handleSelectedItemIdWind} />
								<h2>Update bottom</h2>
								<Bottom bottom={Array.isArray(val.bottomId) ? val.bottomId[0].split(",") : []} onSelectedItemIdBottom={handleSelectedItemIdBottom} />

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

export default GetAnchorage