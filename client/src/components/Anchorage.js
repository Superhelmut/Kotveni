import "./Anchorage.css"
import React, { useState, useEffect } from 'react';
import WaterDeep from "./database/WaterDeep";
import Capacity from "./database/Capacity";


function Anchorage(props) {
	const [name, setName] = useState("");
	const [list, setList] = useState([]);
	const [isChecked, setIsChecked] = useState(""); //nastavuje radiobuttony
	const [selectedItemIdCapacity, setSelectedItemIdCapacity] = useState("");
	props.onAnchorage(name, selectedItemIdCapacity)

	const handleCheckboxChange = (event) => { //zjistí, který checkbox je zaškrtnutý a odešle hodnotu do isChecked
		setIsChecked(event.target.value);
	};

	const handleSelectedItemIdCapacity = (id) => { // definovat callback funkci
		setSelectedItemIdCapacity(id); // aktualizovat stav selectedItemIdCapacity
	};

	return (
		<div>
			<h1>Add anchorage</h1>
			<label>Name </label>
			<input type="text" onChange={(event) => setName(event.target.value)} />
			<p></p>
			<Capacity onSelectedItemIdCapacity={handleSelectedItemIdCapacity} />
			<p></p>
			<WaterDeep />
			<h2>Wind</h2>

			<label>North </label>
			<input type="checkbox" value="1" name='checkbox' checked={isChecked.north} onChange={handleCheckboxChange} />
			<p></p>
			<label> Northeast </label>
			<input type="checkbox" value="2" name='checkbox' checked={isChecked.northeast} onChange={handleCheckboxChange} />
			<p></p>
			<label>East </label>
			<input type="checkbox" value="3" name='checkbox' checked={isChecked.east} onChange={handleCheckboxChange} />
			<p></p>
			<label> Southeast </label>
			<input type="checkbox" value="4" name='checkbox' checked={isChecked.southeast} onChange={handleCheckboxChange} />
			<p></p>
			<label>South </label>
			<input type="checkbox" value="5" name='checkbox' checked={isChecked.south} onChange={handleCheckboxChange} />
			<p></p>
			<label> Southwest </label>
			<input type="checkbox" value="6" name='checkbox' checked={isChecked.southwest} onChange={handleCheckboxChange} />
			<p></p>
			<label>West </label>
			<input type="checkbox" value="7" name='checkbox' checked={isChecked.west} onChange={handleCheckboxChange} />
			<p></p>
			<label> Northwest </label>
			<input type="checkbox" value="8" name='checkbox' checked={isChecked.northwest} onChange={handleCheckboxChange} />
			<p></p>
		</div>
	)
}

export default Anchorage