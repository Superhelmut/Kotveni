import React, { useState, useEffect } from 'react';
import Axios from "axios"


const Capacity = (props) => {

	const [capacity, setCapacity] = useState(100)
	const [maxCapacity, setMaxCapacity] = useState()
	const [minCapacity, setMinCapacity] = useState()
	const [selectedItemId, setSelectedItemId] = useState();
	const [capacityData, setCapacityData] = useState([]);

	const getInfoCapacity = async () => {
		try {
			const response = await Axios.get("http://localhost:3001/capacity");
			setCapacityData(response.data);
			const capacityValues = response.data.map((item) => item.capacity);
			const maxCapacity = Math.max(...capacityValues);
			const minCapacity = Math.min(...capacityValues);
			setMaxCapacity(maxCapacity);
			setMinCapacity(minCapacity);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => { //odešle pžadavek na spojení se serverem  a díky tomu se vypíší data do popupu
		getInfoCapacity()

	}, [])

	useEffect(() => {
		if (capacityData.length > 0) {
			const selectedItem = capacityData.find((item) => item.capacity === capacity);
			if (selectedItem) {
				setSelectedItemId(selectedItem.id);
				props.onSelectedItemIdCapacity(selectedItem.id)
			} else {
				setSelectedItemId(null);
				props.onSelectedItemIdCapacity(null)
			}
		}
	}, [capacityData, capacity]);


	return (
		<div>
			<label>Capacity</label>
			<input
				type="range"
				min={minCapacity}
				max={maxCapacity}
				value={capacity}
				step="1"
				onChange={(event) => {
					const newCapacity = parseInt(event.target.value); // převést řetězec na číslo
					setCapacity(newCapacity); // aktualizovat stav capacity
					const selectedItem = capacityData.find((item) => item.capacity === newCapacity); // najít odpovídající prvek v poli capacityData
					if (selectedItem) {
						setSelectedItemId(selectedItem.id); // aktualizovat stav selectedItemId
					} else {
						setSelectedItemId(null); // při neexistujícím prvku nastavit výchozí id
					}
				}}
			/>

			<input type="text" onChange={(event) => {
				const newCapacity = parseInt(event.target.value); // převést řetězec na číslo
				setCapacity(newCapacity); // aktualizovat stav capacity
				const selectedItem = capacityData.find((item) => item.capacity === newCapacity); // najít odpovídající prvek v poli capacityData
				if (selectedItem) {
					setSelectedItemId(selectedItem.id); // aktualizovat stav selectedItemId
				} else {
					setSelectedItemId(null); // při neexistujícím prvku nastavit výchozí id
				}
			}} />
			<p>{capacity}</p>

		</div>
	)
}

export default Capacity