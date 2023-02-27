/*
Tento kód přidá tlačítko na mapu, po stisknutí tlačítka se na mapě objeví nový marker.
Po kliknutí na tlačítko se zobrazí popup, do kterého lze zadat údaje, které se odešlou do databáze. Automaticky
se odešle i pozice markeru. Marker se dá posouvat
*/

import React, { useRef, useState, useCallback, useMemo, } from 'react';
import "./Button.css"
import Axios from "axios"
import { Marker, useMap, Popup } from 'react-leaflet'
import Anchorage from './Anchorage';
import Buoy from './Buoy';
import CityDock from "./CityDock";
import Marina from './Marina';


function Button() {
	const [showCategory, setShowCategory] = useState(false); //po kliknutí na tlačítko přidat zobrazí kategorie
	const [showMaker, setShowMaker] = useState()

	const CustomControl = ({ position }) => {
		const buttonRef = useRef(null);

		const category = () => {
			return (
				<div>
					<button onClick={() => setShowMaker(1)}>Anchorage</button>
					{showMaker == 1 && AddMarker()}
					<button onClick={() => setShowMaker(2)}>Buoy</button>
					{showMaker == 2 && AddMarker()}
					<button onClick={() => setShowMaker(3)}>City dock</button>
					{showMaker == 3 && AddMarker()}
					<button onClick={() => setShowMaker(4)}>Marina</button>
					{showMaker == 4 && AddMarker()}
				</div>
			)
		}

		const AddMarker = () => {
			const map = useMap()
			const latlng = map.getCenter(); // získání souřadnic středu mapy

			const [draggable, setDraggable] = useState(false)
			const [position, setPosition] = useState(latlng)
			const markerRef = useRef(null)
			const [getName, setGetName] = useState("")
			const [capacityId, setCapacityId] = useState()

			const handleSetAnchorage = (name, selectedItemId) => { // definovat callback funkci
				setGetName(name); // aktualizovat stav selectedItemId
				setCapacityId(selectedItemId)
			};

			const handleSetCapacityId = (selectedItemId) => {
				setCapacityId(selectedItemId)
			}

			const addInfo = () => { //spojení se serverem -> přidání záznamu
				const latitude = position.lat
				const longitude = position.lng
				Axios.post("http://localhost:3001/create", {
					name: getName,
					latitude: latitude,
					longitude: longitude,
					capacity: capacityId
					/*category_id: isChecked,
					waterDeep: waterDeep,*/
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

			const [category, setCategory] = useState()

			return <Marker //přidání markeru
				position={position}
				draggable={draggable}
				eventHandlers={eventHandlers}
				ref={markerRef}>
				<Popup minWidth={90}>
				{showMaker == 1 && <Anchorage onAnchorage={handleSetAnchorage} />}
					{showMaker == 2 && <Buoy />}
					{showMaker == 3 && <CityDock />}
					{showMaker == 4 && <Marina />}

					<button onClick={addInfo}>Přidat info</button>

					<span onClick={toggleDraggable}>
						{draggable
							? <button>Ukončit posouvání bodu</button>
							: <button>Posunout bod</button>}
					</span>

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
				<button onClick={() => setShowCategory(!showCategory)}>Add maker</button>
				{showCategory && category()}
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
