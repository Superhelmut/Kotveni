/*
Tento kód přidá tlačítko na mapu, po stisknutí tlačítka se na mapě objeví nový marker.
Po kliknutí na tlačítko se zobrazí popup, do kterého lze zadat údaje, které se odešlou do databáze. Automaticky
se odešle i pozice markeru. Marker se dá posouvat
*/

import React, { useRef, useState, useCallback, useMemo, } from 'react';
import "./Button.css"
import Axios from "axios"
import { Marker, useMap, Popup } from 'react-leaflet'

function Button() {
	const [showInfo, setShowInfo] = useState(false); //nastavení zobrazení makeru

	const CustomControl = ({ position }) => {
		const buttonRef = useRef(null);

		const AddMarker = () => {
			const map = useMap()
			const latlng = map.getCenter(); // získání souřadnic středu mapy
			const [name, setName] = useState("");
			const [capacity, setCapacity] = useState(100)
			const [waterDeep, setWaterDeep] = useState(10)
			const [draggable, setDraggable] = useState(false)
			const [position, setPosition] = useState(latlng)
			const markerRef = useRef(null)
			const [isChecked, setIsChecked] = useState(""); //nastavuje radiobuttony

			const addInfo = () => { //spojení se serverem -> přidání záznamu
				const latitude = position.lat
				const longitude = position.lng
				Axios.post("http://localhost:3001/create", {
					name: name,
					latitude: latitude,
					longitude: longitude,
					category_id: isChecked,
					capacity: capacity,
				}).then(() => console.log("úspěch"))
			}

			const eventHandlers = useMemo( //zjišťování pozice markeru při přesouvání
				() => ({
					dragend() {
						const marker = markerRef.current
						if (marker != null) {
							setPosition(marker.getLatLng())
						}
					},
				}),
				[],
			)
			const toggleDraggable = useCallback(() => { //zjišťování, zda bylo z markerem hnuto
				setDraggable((d) => !d)
			}, [])

			const handleCheckboxChange = (event) => { //zjistí, který radiobutton je zaškrtnutý a odešlš hodnotu do isChecked
				setIsChecked(event.target.value);
			};


			return <Marker //přidání markeru
				position={position}
				draggable={draggable}
				eventHandlers={eventHandlers}
				ref={markerRef}>
				<Popup minWidth={90}>
					<span onClick={toggleDraggable}>
						{draggable
							? <button>Ukončit posouvání bodu</button>
							: <button>Posunout bod</button>}
					</span>
					<p></p>
					<label>Název </label>
					<input type="text" onChange={(event) => setName(event.target.value)} />
					<p></p>
					<label>Směr větru</label>
					<p></p>
					<label>Kotvení </label>
					<input type="radio" value="1" name='radiobutton' checked={isChecked.kotva} onChange={handleCheckboxChange} />
					<label> Bojka </label>
					<input type="radio" value="2" name='radiobutton' checked={isChecked.bojka} onChange={handleCheckboxChange} />
					<label>Městské mole </label>
					<input type="radio" value="3" name='radiobutton' checked={isChecked.mestkeMolo} onChange={handleCheckboxChange} />
					<label> Marina </label>
					<input type="radio" value="4" name='radiobutton' checked={isChecked.marina} onChange={handleCheckboxChange} />
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

					<p>{waterDeep}</p>					<p></p>
					<button onClick={addInfo}>Přidat info</button>
					<p></p>
					{console.log(position.lat)}
				</Popup>
			</Marker>
		}

		return ( //nastavení tlačítka tak, aby bylo vidět
			<div
				ref={buttonRef}
				style={{
					position: 'absolute',
					top: position[0],
					left: position[1],
					zIndex: 1000
				}}
			>
				<button onClick={() => setShowInfo(!showInfo)}>Tlačítko</button>
				{showInfo && AddMarker()}
			</div>
		);
	};

	return (
		<div>
			<CustomControl position={[300, 100]}>
			</CustomControl>


		</div>


	)
}

export default Button
