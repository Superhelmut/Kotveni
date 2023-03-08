import "./Buoy.css"
import React, { useState, useEffect } from 'react';
import WaterDeep from "../database/WaterDeep";
import Capacity from "../database/Capacity";
import Wind from "../database/Wind";
import Bottom from "../database/Bottom";



function Buoy(props) {
	const [name, setName] = useState("");
	const [selectedItemIdCapacity, setSelectedItemIdCapacity] = useState("");
	const [selectedItemIdWaterDeep, setSelectedItemIdWaterDeep] = useState("")
	const [selectedItemIdWind, setSelectedItemIdWind] = useState("")
	const [selectedItemIdBottom, setSelectedItemIdBottom] = useState("")
	props.onBuoy(name, selectedItemIdCapacity, selectedItemIdWaterDeep, selectedItemIdWind, selectedItemIdBottom)

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
		<div className="container">
			<h1>Add buyo</h1>
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
					<div className="bottom">
						<h2>Bottom</h2>
						<Bottom onSelectedItemIdBottom={handleSelectedItemIdBottom} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Buoy