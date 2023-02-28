/*
Tento kód vypíše všechny markery z databáze a a údaje markeru (po kliknutí na marker)
*/

import "./Markers.css"
import GetAnchorage from "./getInfo/GetAnchorage"
import Getbuoy from "./getInfo/GetBuoy"
import GetCityDock from "./getInfo/GetCityDock"
import GetMarina from "./getInfo/GetMarina"

function Markers() {
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
