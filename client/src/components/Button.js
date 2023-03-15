/*
Tento kód přidá tlačítko na mapu, po stisknutí tlačítka se na mapě objeví nový marker.
Po kliknutí na tlačítko se zobrazí popup, do kterého lze zadat údaje, které se odešlou do databáze. Automaticky
se odešle i pozice markeru. Marker se dá posouvat
*/

import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import "./Button.css"
import Axios from "axios"
import { Marker, useMap, Popup } from 'react-leaflet'
import Anchorage from './categories/Anchorage';
import Buoy from './categories/Buoy';
import CityDock from "./categories/CityDock";
import Marina from './categories/Marina';
import L from 'leaflet';
import icon from '../../node_modules/leaflet/dist/images/clear.png';
import addAnchorage from './addInfo/addAnchorage';



function Button() {
	const [showCategory, setShowCategory] = useState(false); //po kliknutí na tlačítko přidat zobrazí kategorie
	const [showMaker, setShowMaker] = useState()
	const defaultIcon = L.icon({
		iconUrl: icon,
		iconSize: [25, 35],
	});


	const CustomControl = ({ position }) => {
		const buttonRef = useRef(null);

		const category = () => {
			return (
				<div className='categoryButton'>
					<button className='oneCategoryButton' onClick={() => setShowMaker(1)}>Anchorage</button>
					{showMaker == 1 && AddMarker()}
					<button className='oneCategoryButton' onClick={() => setShowMaker(2)}>Buoy</button>
					{showMaker == 2 && AddMarker()}
					<button className='oneCategoryButton' onClick={() => setShowMaker(3)}>City dock</button>
					{showMaker == 3 && AddMarker()}
					<button className='oneCategoryButton' onClick={() => setShowMaker(4)}>Marina</button>
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
			const [capacityId, setCapacityId] = useState(null)
			const [waterDeepId, setWaterDeepId] = useState(null)
			const [windId, setWindId] = useState(null)
			const [bottomId, setBottomId] = useState(null)
			const [equipmentId, setEquipmentId] = useState()
			const [showConfirm, setShowConfirm] = useState(false)


			const handleSetAnchorage = (name, selectedItemId, selectedItemIdWaterDeep, selectedItemIdWind, selectedItemIdBottom) => { // definovat callback funkci
				setGetName(name); // aktualizovat stav selectedItemId
				setCapacityId(selectedItemId)
				setWaterDeepId(selectedItemIdWaterDeep)
				setWindId(selectedItemIdWind)
				setBottomId(selectedItemIdBottom)
			};

			const handleSetBuoy = (name, selectedItemId, selectedItemIdWind) => { // definovat callback funkci
				setGetName(name); // aktualizovat stav selectedItemId
				setCapacityId(selectedItemId)
				setWindId(selectedItemIdWind)
			};

			const handleSetCityDock = (name, selectedItemId, selectedItemIdWaterDeep, selectedItemIdWind, selectedItemIdCityDock) => { // definovat callback funkci
				setGetName(name); // aktualizovat stav selectedItemId
				setCapacityId(selectedItemId)
				setWaterDeepId(selectedItemIdWaterDeep)
				setWindId(selectedItemIdWind)
				setEquipmentId(selectedItemIdCityDock)
			};

			const handleSetMarina = (name, selectedItemId, selectedItemIdWaterDeep, selectedItemIdWind, selectedItemIdCityDock) => { // definovat callback funkci
				setGetName(name); // aktualizovat stav selectedItemId
				setCapacityId(selectedItemId)
				setWaterDeepId(selectedItemIdWaterDeep)
				setWindId(selectedItemIdWind)
				setEquipmentId(selectedItemIdCityDock)
			};

			/*const addInfo = () => { //spojení se serverem -> přidání záznamu
				const latitude = position.lat
				const longitude = position.lng
				if (showMaker == 1) {
					return <AddAnchorage />
				}
				else if (showMaker == 2) {
					Axios.post("http://localhost:3001/createBuoy", {
						name: getName,
						latitude: latitude,
						longitude: longitude,
						capacity: capacityId,
						wind: windId,
					}).then(() => console.log("úspěch"))
				}
				else if (showMaker == 3) {
					Axios.post("http://localhost:3001/createCityDock", {
						name: getName,
						latitude: latitude,
						longitude: longitude,
						capacity: capacityId,
						waterDeep: waterDeepId,
						wind: windId,
						equipment: equipmentId
					}).then(() => console.log("úspěch"))
				}
				else if (showMaker == 4) {
					Axios.post("http://localhost:3001/createMarina", {
						name: getName,
						latitude: latitude,
						longitude: longitude,
						capacity: capacityId,
						waterDeep: waterDeepId,
						wind: windId,
						equipment: equipmentId
					}).then(() => console.log("úspěch"))
				}

			}*/

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

			const handleAddInfo = () => {
				console.log(position, "position")
				console.log(getName, "name")
				console.log(capacityId, "capacity")
				console.log(waterDeepId, "water")
				console.log(windId, "wind")
				console.log(bottomId, "bottom")

				setShowConfirm(false)
				addAnchorage({
					position: position,
					getName: getName,
					capacityId: capacityId,
					waterDeepId: waterDeepId,
					windId: windId,
					bottomId: bottomId
				});
			};

			return <Marker //přidání markeru
				position={position}
				draggable={draggable}
				eventHandlers={eventHandlers}
				ref={markerRef}
				icon={defaultIcon}>
				<div className='popup'>
					<Popup>
						{showMaker == 1 &&
							<div>
								<Anchorage onAnchorage={handleSetAnchorage} />
							</div>}
						{showMaker == 2 && <Buoy onBuoy={handleSetBuoy} />}
						{showMaker == 3 && <CityDock onCityDock={handleSetCityDock} />}
						{showMaker == 4 && <Marina onMarina={handleSetMarina} />}
						<button onClick={() => { setShowConfirm(true) }}>Přidat info</button>

						{showConfirm == true &&
							<div className='confirm'>
								<h2>Are you sure?</h2>
								<button onClick={handleAddInfo}>Yes</button>
								<button onClick={() => setShowConfirm(false)}>No</button>
							</div>

						}

						<span onClick={toggleDraggable}>
							{draggable
								? <button>Ukončit posouvání bodu</button>
								: <button>Posunout bod</button>}
						</span>

					</Popup>

				</div >

			</Marker >
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
				<button className='addMakerButton' onClick={() => setShowCategory(!showCategory)}>Add maker</button>
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