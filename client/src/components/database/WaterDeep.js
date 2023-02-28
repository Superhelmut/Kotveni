import React, { useState, useEffect } from 'react';
import Axios from "axios"


const WaterDeep = () => {

	const [waterDeep, setwaterDeep] = useState(10)
	const [maxwaterDeep, setMaxwaterDeep] = useState()
	const [minwaterDeep, setMinwaterDeep] = useState()
	const [selectedItemIdDeep, setSelectedItemIdDeep] = useState();
	const [waterDeepData, setwaterDeepData] = useState([]);

	const getInfowaterDeep = async () => {
		try {
			const response = await Axios.get("http://localhost:3001/deep");
			setwaterDeepData(response.data);
			const waterDeepValues = response.data.map((item) => item.deep);
			const maxwaterDeep = Math.max(...waterDeepValues);
			const minwaterDeep = Math.min(...waterDeepValues);
			setMaxwaterDeep(maxwaterDeep);
			setMinwaterDeep(minwaterDeep);
			console.log("water",waterDeepValues)
			
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => { //odešle pžadavek na spojení se serverem  a díky tomu se vypíší data do popupu
		getInfowaterDeep()

	}, [])

	useEffect(() => {
		if (waterDeepData.length > 0) {
			const selectedItem = waterDeepData.find((item) => item.deep === waterDeep);
			if (selectedItem) {
				setSelectedItemIdDeep(selectedItem.id);
				//props.onSelectedItemIdDeep(selectedItem.id)
			} else {
				setSelectedItemIdDeep(15);
				//props.onSelectedItemIdDeep(null)
			}
		}
	}, [waterDeepData, waterDeep]);


	return (
		<div>
			<label>Water deep</label>
			<input
				type="range"
				min={minwaterDeep}
				max={maxwaterDeep}
				value={waterDeep}
				step="1"
				onChange={(event) => {
					const newwaterDeep = parseInt(event.target.value); // převést řetězec na číslo
					setwaterDeep(newwaterDeep); // aktualizovat stav waterDeep
					const selectedItem = waterDeepData.find((item) => item.waterDeep === newwaterDeep); // najít odpovídající prvek v poli waterDeepData
					if (selectedItem) {
						setSelectedItemIdDeep(selectedItem.id); // aktualizovat stav selectedItemIdDeep
					} else {
						setSelectedItemIdDeep(3); // při neexistujícím prvku nastavit výchozí id
					}
				}}
			/>

			<input type="text" onChange={(event) => {
				const newwaterDeep = parseInt(event.target.value); // převést řetězec na číslo
				setwaterDeep(newwaterDeep); // aktualizovat stav waterDeep
				const selectedItem = waterDeepData.find((item) => item.waterDeep === newwaterDeep); // najít odpovídající prvek v poli waterDeepData
				if (selectedItem) {
					setSelectedItemIdDeep(selectedItem.id); // aktualizovat stav selectedItemIdDeep
				} else {
					setSelectedItemIdDeep(3); // při neexistujícím prvku nastavit výchozí id
				}
			}} />
			<p>{selectedItemIdDeep}</p>

			<p>{waterDeep}</p>

		</div>
	)
}

export default WaterDeep