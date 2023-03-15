/*
Tento kód vypíše všechny markery z databáze a a údaje markeru (po kliknutí na marker)
*/
import React, { useEffect } from 'react';
import "./Markers.css"
import GetAnchorage from "./getInfo/GetAnchorage"
import Getbuoy from "./getInfo/GetBuoy"
import GetCityDock from "./getInfo/GetCityDock"
import GetMarina from "./getInfo/GetMarina"


function Markers(props) {

	useEffect(() => {
		// získání markerů ze serveru a aktualizace stavu
	}, [props.onUpdatePage]);
	return (
		<div>
			<GetAnchorage />
			<Getbuoy />
			<GetCityDock />
			<GetMarina />
		</div>
	)
}

export default Markers
