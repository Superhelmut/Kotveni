import "./Marina.css"
import React, { useState } from 'react';



function Marina() {
	const [name, setName] = useState("");
	const [capacity, setCapacity] = useState(100)
	const [waterDeep, setWaterDeep] = useState(10)
	const [isChecked, setIsChecked] = useState(""); //nastavuje radiobuttony

	const handleCheckboxChange = (event) => { //zjistí, který checkbox je zaškrtnutý a odešle hodnotu do isChecked
		setIsChecked(event.target.value);
	};



	return (
		<div>
			<h1>Add marina</h1>
			<label>Name </label>
			<input type="text" onChange={(event) => setName(event.target.value)} />
			<p></p>

			<label>Capacity</label>
			<input
				type="range"
				min="0"
				max="200"
				value={capacity} //value prop je spojen s komponentní state pro zobrazení aktuální hodnoty
				step="1"
				onChange={(event) => setCapacity(event.target.value)} //onChange obsluhuje změny hodnoty vstupu a aktualizuje stav komponenty
			/>
			<button onClick={() => setCapacity(capacity + 1)}>+</button>
			<button onClick={() => setCapacity(capacity - 1)}>-</button>


			<p>{capacity}</p>
			<p></p>
			<label>Water deep</label>
			<input
				type="range"
				min="0"
				max="20"
				value={waterDeep} //value prop je spojen s komponentní state pro zobrazení aktuální hodnoty
				step="1"
				onChange={(event) => setWaterDeep(event.target.value)} //onChange obsluhuje změny hodnoty vstupu a aktualizuje stav komponenty
			/>
			<button onClick={() => setWaterDeep(waterDeep + 1)}>+</button>
			<button onClick={() => setWaterDeep(waterDeep - 1)}>-</button>

			<p>{waterDeep}</p>

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

			<h2>Equipment</h2>

			<label>WC </label>
			<input type="checkbox" value="1" name='checkbox' checked={isChecked.wc} onChange={handleCheckboxChange} />
			<p></p>
			<label> Shower </label>
			<input type="checkbox" value="2" name='checkbox' checked={isChecked.shower} onChange={handleCheckboxChange} />
			<p></p>
		</div>
	)
}

export default Marina