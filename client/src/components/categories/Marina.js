import "./Buoy.css"
import React, { useState, useEffect } from 'react';
import WaterDeep from "../database/WaterDeep";
import Capacity from "../database/Capacity";
import Wind from "../database/Wind";
import Equipment from "../database/Equipment";



function Marina(props) {
	const [name, setName] = useState("");
	const [selectedItemIdCapacity, setSelectedItemIdCapacity] = useState("");
	const [selectedItemIdWaterDeep, setSelectedItemIdWaterDeep] = useState("")
	const [selectedItemIdWind, setSelectedItemIdWind] = useState("")
	const [selectedItemIdEquipment, setSelectedItemIdEquipment] = useState("")
	props.onMarina(name, selectedItemIdCapacity, selectedItemIdWaterDeep, selectedItemIdWind, selectedItemIdEquipment)

	const handleSelectedItemIdCapacity = (id) => { // definovat callback funkci
		setSelectedItemIdCapacity(id); // aktualizovat stav selectedItemIdCapacity
	};

	const handleSelectedItemIdWaterDeep = (id) => {
		setSelectedItemIdWaterDeep(id)
	}

	const handleSelectedItemIdWind = (id) => {
		setSelectedItemIdWind(id)
	}

	const handleSelectedItemIdEquipment = (id) => {
		setSelectedItemIdEquipment(id)
	}

	return (
		<div className="container">
			<h1>Add marina dock</h1>
			<div className="row">
				<div className="col">
					<label>Name</label>
					<input type="text" onChange={(event) => setName(event.target.value)} />
				</div>
				<div className="col">
					<Capacity onSelectedItemIdCapacity={handleSelectedItemIdCapacity} />
				</div>
				<div className="col">
					<div className="waterdeep">
						<WaterDeep onSelectedItemIdWaterDeep={handleSelectedItemIdWaterDeep} />
					</div>
				</div>

			</div>
			<div className="row">

				<div className="col">
					<div className="wind">
						<h2>Wind</h2>
						<Wind onSelectedItemIdWind={handleSelectedItemIdWind} />
					</div>
				</div>
				<div className="col">
					<div className="equipment">
						<h2>Equipment</h2>
						<Equipment onSelectedItemIdEquipment={handleSelectedItemIdEquipment} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Marina