import "./Anchorage.css"
import React, { useState, useEffect } from 'react';
import WaterDeep from "../database/WaterDeep";
import Capacity from "../database/Capacity";
import Wind from "../database/Wind";
import Bottom from "../database/Bottom";


function Anchorage(props) {
	const [name, setName] = useState("");
	const [list, setList] = useState([]);
	const [selectedItemIdCapacity, setSelectedItemIdCapacity] = useState("");
	const [selectedItemIdWaterDeep, setSelectedItemIdWaterDeep] = useState("")
	const [selectedItemIdWind, setSelectedItemIdWind] = useState("")
	const [selectedItemIdBottom, setSelectedItemIdBottom] = useState("")
	props.onAnchorage(name, selectedItemIdCapacity, selectedItemIdWaterDeep, selectedItemIdWind, selectedItemIdBottom)

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

	return (
		<div>
			<h1>Add anchorage</h1>
			<label>Name </label>
			<input type="text" onChange={(event) => setName(event.target.value)} />
			<p></p>
			<Capacity onSelectedItemIdCapacity={handleSelectedItemIdCapacity} />
			<p></p>
			<WaterDeep onSelectedItemIdWaterDeep={handleSelectedItemIdWaterDeep} />
			<h2>Wind</h2>
			<Wind onSelectedItemIdWind={handleSelectedItemIdWind} />
			<h2>Bottom</h2>
			<Bottom onSelectedItemIdBottom={handleSelectedItemIdBottom}/>


		</div>
	)
}

export default Anchorage