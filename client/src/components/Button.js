/*
Tento kód přidá tlačítko na mapu, po stisknutí tlačítka se na mapě objeví nový marker.
Po kliknutí na tlačítko se zobrazí popup, do kterého lze zadat údaje, které se odešlou do databáze. Automaticky
se odešle i pozice markeru. Marker se dá posouvat
*/

import React, { useRef, useState, useCallback, useMemo, } from 'react';
import "./Button.css"
import Axios from "axios"
import { Marker, useMap, Popup } from 'react-leaflet'
import Anchorage from './categories/Anchorage';
import Buoy from './categories/Buoy';
import CityDock from "./categories/CityDock";
import Marina from './categories/Marina';


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
			const [waterDeepId, setWaterDeepId] = useState()
			const [windId, setWindId] = useState()
			const [bottomId, setBottomId] = useState()

			const handleSetAnchorage = (name, selectedItemId, selectedItemIdWaterDeep, selectedItemIdWind, selectedItemIdBottom) => { // definovat callback funkci
				setGetName(name); // aktualizovat stav selectedItemId
				setCapacityId(selectedItemId)
				setWaterDeepId(selectedItemIdWaterDeep)
				setWindId(selectedItemIdWind)
				setBottomId(selectedItemIdBottom)
			};

			const handleSetBuoy = (name, selectedItemId, selectedItemIdWaterDeep, selectedItemIdWind, selectedItemIdBottom) => { // definovat callback funkci
				setGetName(name); // aktualizovat stav selectedItemId
				setCapacityId(selectedItemId)
				setWaterDeepId(selectedItemIdWaterDeep)
				setWindId(selectedItemIdWind)
				setBottomId(selectedItemIdBottom)
			};


			const addInfo = () => { //spojení se serverem -> přidání záznamu
				const latitude = position.lat
				const longitude = position.lng
				if (showMaker == 1) {
					Axios.post("http://localhost:3001/createAnchor", {
						name: getName,
						latitude: latitude,
						longitude: longitude,
						capacity: capacityId,
						waterDeep: waterDeepId,
						wind: windId,
						bottom: bottomId
					}).then(() => console.log("úspěch"))
				}
				else if (showMaker == 2) {
					Axios.post("http://localhost:3001/createBuoy", {
						name: getName,
						latitude: latitude,
						longitude: longitude,
						capacity: capacityId,
						waterDeep: waterDeepId,
						wind: windId,
						bottom: bottomId
					}).then(() => console.log("úspěch"))
				}
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
				<div className='popup'>
					<Popup>
						{showMaker == 1 && <Anchorage onAnchorage={handleSetAnchorage} />}
						{showMaker == 2 && <Buoy onBuoy={handleSetBuoy}/>}
						{showMaker == 3 && <CityDock />}
						{showMaker == 4 && <Marina />}

						<button onClick={addInfo}>Přidat info</button>

						<span onClick={toggleDraggable}>
							{draggable
								? <button>Ukončit posouvání bodu</button>
								: <button>Posunout bod</button>}
						</span>

					</Popup>

				</div>

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
