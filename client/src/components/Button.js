import React, { useRef, useState, useCallback, useMemo, MapEvents } from 'react';
import "./Button.css"
import Axios from "axios"
import { Marker, useMap, Popup } from 'react-leaflet'

function Button() {
	const [showInfo, setShowInfo] = useState(false);

	const CustomControl = ({ position }) => {
		const buttonRef = useRef(null);
		const map = useMap()

		const AddMarker = () => {
			const latlng = map.getCenter(); // získání souřadnic středu mapy
			const [name, setName] = useState("");
			const [draggable, setDraggable] = useState(false)
			const [position, setPosition] = useState(latlng)
			const markerRef = useRef(null)

			const addInfo = () => {
				const latitude = position.lat
				const longitude = position.lng
				Axios.post("http://localhost:3001/create", {
					name: name, latitude, longitude,
				}).then(() => console.log("úspěch"))
			}

			const eventHandlers = useMemo(
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
			const toggleDraggable = useCallback(() => {
				setDraggable((d) => !d)
			}, [])

			return <Marker
				position={position}
				draggable={draggable}
				eventHandlers={eventHandlers}
				ref={markerRef}>
				<Popup minWidth={90}>
					<span onClick={toggleDraggable}>
						{draggable
							? 'Marker is draggable'
							: 'Click here to make marker draggable'}
					</span>
					<p></p>
					<label>Název</label>
					<input type="text" onChange={(event) => setName(event.target.value)} />
					<button onClick={addInfo}>Přidat info</button>
					<p></p>
					{console.log(position.lat)}
				</Popup>
			</Marker>
		}

		return (
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
