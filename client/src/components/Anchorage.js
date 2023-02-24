import "./Anchorage.css"
import React, { useState, useEffect } from 'react';
import Axios from "axios"




function Anchorage() {
	const [name, setName] = useState("");
	const [capacity, setCapacity] = useState(100)
	const [waterDeep, setWaterDeep] = useState(10)
	const [isChecked, setIsChecked] = useState(""); //nastavuje radiobuttony
	const [list, setList] = useState([]);
	const [maxWaterDeep, setMaxWaterDeep] = useState()
	const [minWaterDeep, setMinWaterDeep] = useState()
	const [maxCapacity, setMaxCapacity] = useState()
	const [minCapacity, setMinCapacity] = useState()


	const handleCheckboxChange = (event) => { //zjistí, který checkbox je zaškrtnutý a odešle hodnotu do isChecked
		setIsChecked(event.target.value);
	};

	/*{
		list.map((val) => (
			setWaterDeep(val.waterDeep)
		))
	}*/

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

	  const getInfoCapacity = () => {
		Axios.get("http://localhost:3001/capacity")
		  .then((response) => {
			const capacityValues = response.data.map((item) => item.capacity);
			const maxCapacity = Math.max(...capacityValues);
			const minCapacity = Math.min(...capacityValues)
			setMaxCapacity(maxCapacity); // aktualizace stavu
			setMinCapacity(minCapacity)
			console.log(maxCapacity)
			

		  })
		  .catch((error) => {
			console.error(error);
		  });
	  };

	useEffect(() => { //odešle pžadavek na spojení se serverem  a díky tomu se vypíší data do popupu
		getInfoDeep()
	}, [])

	useEffect(() => { //odešle pžadavek na spojení se serverem  a díky tomu se vypíší data do popupu
		getInfoCapacity()
	}, [])

	return (
		<div>
			<h1>Add anchorage</h1>
			<label>Name </label>
			<input type="text" onChange={(event) => setName(event.target.value)} />
			<p></p>

			<label>Capacity</label>
			<input
				type="range"
				min={minCapacity}
				max={maxCapacity}
				value={capacity} //value prop je spojen s komponentní state pro zobrazení aktuální hodnoty
				step="1"
				onChange={(event) => setCapacity(event.target.value)} //onChange obsluhuje změny hodnoty vstupu a aktualizuje stav komponenty
			/>
			<button onClick={() => setCapacity(capacity + 1)}>+</button>
			<button onClick={() => setCapacity(capacity - 1)}>-</button>


			<p>{capacity}</p>
			<p></p>


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