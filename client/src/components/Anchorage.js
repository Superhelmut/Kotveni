import "./Anchorage.css"
import React, { useState, useEffect } from 'react';
import WaterDeep from "./database/WaterDeep";
import Capacity from "./database/Capacity";
import Wind from "./database/Wind";


function Anchorage(props) {
	const [name, setName] = useState("");
	const [list, setList] = useState([]);
	const [selectedItemIdCapacity, setSelectedItemIdCapacity] = useState("");
	const [selectedItemIdWaterDeep, setSelectedItemIdWaterDeep] = useState("")
	props.onAnchorage(name, selectedItemIdCapacity, selectedItemIdWaterDeep)

	const handleSelectedItemIdCapacity = (id) => { // definovat callback funkci
		setSelectedItemIdCapacity(id); // aktualizovat stav selectedItemIdCapacity
	};

	const handleSelectedItemIdWaterDeep = (id) => {
		setSelectedItemIdWaterDeep(id)
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
			<Wind />


		</div>
	)
}

export default Anchorage