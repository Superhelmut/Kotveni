import React, { useState, useEffect } from 'react';
import Axios from "axios"


const Capacity = () => {

	const [capacity, setCapacity] = useState(100)
	const [maxCapacity, setMaxCapacity] = useState()
	const [minCapacity, setMinCapacity] = useState()
	const [selectedItemId, setSelectedItemId] = useState();
	const [capacityData, setCapacityData] = useState([]);
	console.log("capacityData")

	const getInfoCapacity = async () => {
		try {
			const response = await Axios.get("http://localhost:3001/capacity");
			setCapacityData(response.data);
			const capacityValues = response.data.map((item) => item.capacity);
			const maxCapacity = Math.max(...capacityValues);
			const minCapacity = Math.min(...capacityValues);
			setMaxCapacity(maxCapacity);
			setMinCapacity(minCapacity);
			console.log("server")
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => { //odešle pžadavek na spojení se serverem  a díky tomu se vypíší data do popupu
		getInfoCapacity()

	}, [])

	useEffect(() => {
		console.log("capacitydata", capacityData)
		console.log("capacity", capacity)
		const selectedItem = capacityData.find((item) => item.capacity === capacity);
		console.log("selecteditemid", capacityData.find((item) => item.capacity === capacity))
		if (selectedItem) {
			setSelectedItemId(selectedItem.id);
		} else {
			setSelectedItemId(3);
		}

	}, [capacityData, capacity]);

	return (
		<div>
			<label>Capacity</label>
			<input
				type="range"
				min={minCapacity}
				max={maxCapacity}
				value={capacity} //value prop je spojen s komponentní state pro zobrazení aktuální hodnoty
				step="1"
				onChange={(event) => { setCapacity(event.target.value); console.log("change",event.target.value)}} //onChange obsluhuje změny hodnoty vstupu a aktualizuje stav komponenty

			/>
			<input type="text" onChange={(event) => { setCapacity(event.target.value) }} />
			<button onClick={() => setCapacity(capacity + 1)}>+</button>
			<button onClick={() => setCapacity(capacity - 1)}>-</button>
			<p>{selectedItemId}</p>

			<p>{capacity}</p>

		</div>
	)
}

export default Capacity