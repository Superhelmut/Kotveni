import React, { useState, useEffect } from 'react';
import Axios from "axios"


const WaterDeep = (props) => {

	const [waterDeep, setwaterDeep] = useState(props.waterDeep)
	const [maxwaterDeep, setMaxwaterDeep] = useState()
	const [minwaterDeep, setMinwaterDeep] = useState()
	const [selectedItemWaterDeepIdDeep, setSelectedItemWaterDeepId] = useState();
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
			const selectedItemWaterDeep = waterDeepData.find((item) => item.deep === waterDeep);
			if (selectedItemWaterDeep) {
				setSelectedItemWaterDeepId(selectedItemWaterDeep.id);
				props.onSelectedItemIdWaterDeep(selectedItemWaterDeep.id)
			} else {
				setSelectedItemWaterDeepId(null);
				props.onSelectedItemIdWaterDeep(null)
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
					const selectedItemWaterDeep = waterDeepData.find((item) => item.waterDeep === newwaterDeep); // najít odpovídající prvek v poli waterDeepData
					if (selectedItemWaterDeep) {
						setSelectedItemWaterDeepId(selectedItemWaterDeep.id); // aktualizovat stav selectedItemWaterDeepIdDeep
					} else {
						setSelectedItemWaterDeepId(null); // při neexistujícím prvku nastavit výchozí id
					}
				}}
			/>

			<input type="text" onChange={(event) => {
				const newwaterDeep = parseInt(event.target.value); // převést řetězec na číslo
				setwaterDeep(newwaterDeep); // aktualizovat stav waterDeep
				const selectedItemWaterDeep = waterDeepData.find((item) => item.waterDeep === newwaterDeep); // najít odpovídající prvek v poli waterDeepData
				if (selectedItemWaterDeep) {
					setSelectedItemWaterDeepId(selectedItemWaterDeep.id); // aktualizovat stav selectedItemWaterDeepIdDeep
				} else {
					setSelectedItemWaterDeepId(null); // při neexistujícím prvku nastavit výchozí id
				}
			}} />
			<p>{waterDeep}</p>

		</div>
	)
}

export default WaterDeep