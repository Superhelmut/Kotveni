import React, { useState, useEffect } from 'react';
import Axios from "axios"


const Capacity = (props) => {

	const [capacity, setCapacity] = useState(props.capacity)
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
		// Pokud pole capacityData obsahuje alespoň jeden prvek
		if (capacityData.length > 0) {
		  // Najdi prvek v poli capacityData, jehož capacity odpovídá hodnotě proměnné capacity
		  const selectedItem = capacityData.find((item) => item.capacity === capacity);
	  
		  // Pokud byl nalezen odpovídající prvek
		  if (selectedItem) {
			// Nastav jeho id jako novou hodnotu proměnné selectedItemId
			setSelectedItemId(selectedItem.id);
			// Zavolej funkci onSelectedItemIdCapacity s novou hodnotou id jako argumentem
			props.onSelectedItemIdCapacity(selectedItem.id);
		  } 
		  // Pokud nebyl nalezen žádný odpovídající prvek
		  else {
			// Nastav hodnotu proměnné selectedItemId na null
			setSelectedItemId(null);
			// Zavolej funkci onSelectedItemIdCapacity s hodnotou null jako argumentem
			props.onSelectedItemIdCapacity(null);
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