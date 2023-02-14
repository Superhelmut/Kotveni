import "./Markers.css"
import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet'
import Axios from "axios"

function Markers() {
	const [list, setList] = useState([]);

	const getInfo = () => {
		Axios.get("http://localhost:3001/kot").then((response) => {
			setList(response.data)
			console.log(response.data)
		})
	}

	useEffect(() => {
		getInfo()
	}, [])

	return (
		<div>
			{list.map((val) => (
				<Marker key={val.id} position={[val.latitude, val.longitude]}>
					<Popup>
						<h1>{val.name}</h1>
						<h2>{val.latitude}</h2>
						<h2>{val.longitude}</h2>
					</Popup>
				</Marker>
			))}		</div>
	)
}

export default Markers
