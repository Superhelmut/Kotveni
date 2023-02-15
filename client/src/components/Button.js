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
			const [draggable, setDraggable] = useState(false)
			const [position, setPosition] = useState(latlng)
			const markerRef = useRef(null)
			const [isChecked, setIsChecked] = useState(
				{
					checkbox1: false,
					checkbox2: false,
				}
			);

			const addInfo = () => { //spojení se serverem -> přidání záznamu
				const latitude = position.lat
				const longitude = position.lng
				const s = isChecked.checkbox1
				console.log(s)
				Axios.post("http://localhost:3001/create", {
					name: name,
					latitude: latitude,
					longitude: longitude,
					s: s,
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

			const handleCheckboxChange = (event) => { //změna zaškrtnutí/nezaškrtnutí checkboxu
				const { name, checked } = event.target;
				setIsChecked(prevState => ({
					...prevState,
					[name]: checked
				}));
			}

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
					<label>S </label>
					<input type="checkbox" value="S" name='checkbox1' checked={isChecked.checkbox1} onChange={handleCheckboxChange} />
					<label> SV </label>
					<input type="checkbox" value="SV" name='checkbox2' checked={isChecked.checkbox2} onChange={handleCheckboxChange} />
					<p></p>
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
