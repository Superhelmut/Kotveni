import "./Anchorage.css"
import React, { useState, useEffect } from 'react';
import WaterDeep from "./database/WaterDeep";
import Capacity from "./database/Capacity";


function Anchorage(props) {
	const [name, setName] = useState("");
	const [list, setList] = useState([]);
	const [isChecked, setIsChecked] = useState(""); //nastavuje radiobuttony
	const [selectedItemIdCapacity, setSelectedItemIdCapacity] = useState("");
	const [selectedItemIdWaterDeep, setSelectedItemIdWaterDeep] = useState("")
	props.onAnchorage(name, selectedItemIdCapacity, selectedItemIdWaterDeep)

	const handleCheckboxChange = (event) => { //zjistí, který checkbox je zaškrtnutý a odešle hodnotu do isChecked
		setIsChecked(event.target.value);
	};

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


		</div>
	)
}

export default Anchorage