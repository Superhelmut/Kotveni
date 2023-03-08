import "./Buoy.css"
import React, { useState } from 'react';
import Capacity from "../database/Capacity";
import Wind from "../database/Wind";



function Buoy(props) {
	const [name, setName] = useState("");
	const [selectedItemIdCapacity, setSelectedItemIdCapacity] = useState("");
	const [selectedItemIdWind, setSelectedItemIdWind] = useState("")
	props.onBuoy(name, selectedItemIdCapacity, selectedItemIdWind)

	const handleSelectedItemIdCapacity = (id) => { // definovat callback funkci
		setSelectedItemIdCapacity(id); // aktualizovat stav selectedItemIdCapacity
	};

	const handleSelectedItemIdWind = (id) => {
		setSelectedItemIdWind(id)
		
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

			</div>
			<div className="row">

				<div className="col">
					<div className="wind">
						<h2>Wind</h2>
						<Wind onSelectedItemIdWind={handleSelectedItemIdWind} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Buoy