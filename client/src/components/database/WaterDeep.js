import React, { useState, useEffect } from 'react';
import Axios from "axios"




const WaterDeep = () => {

	const [waterDeep, setWaterDeep] = useState(10)
	const [maxWaterDeep, setMaxWaterDeep] = useState()
	const [minWaterDeep, setMinWaterDeep] = useState()


	const getInfoDeep = () => {
		Axios.get("http://localhost:3001/deep")
			.then((response) => {
				const waterDeepValues = response.data.map((item) => item.deep);
				const maxWaterDeep = Math.max(...waterDeepValues);
				const minWaterDeep = Math.min(...waterDeepValues)
				setMaxWaterDeep(maxWaterDeep); // aktualizace stavu
				setMinWaterDeep(minWaterDeep)

			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => { //odešle pžadavek na spojení se serverem  a díky tomu se vypíší data do popupu
		getInfoDeep()
	}, [])

	return (
		<div>
			<label>Water deep</label>
			<input
				type="range"
				min={minWaterDeep}
				max={maxWaterDeep}
				value={waterDeep} //value prop je spojen s komponentní state pro zobrazení aktuální hodnoty
				step="1"
				onChange={(event) => setWaterDeep(event.target.value)} //onChange obsluhuje změny hodnoty vstupu a aktualizuje stav komponenty
			/>
			<button onClick={() => setWaterDeep(waterDeep + 1)}>+</button>
			<button onClick={() => setWaterDeep(waterDeep - 1)}>-</button>

			<p>{waterDeep}</p>
		</div>
	)
}

export default WaterDeep