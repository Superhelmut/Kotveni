/*
Tento kód vypíše všechny markery z databáze a a údaje markeru (po kliknutí na marker)
*/

import "./Markers.css"
import GetAnchorage from "./getInfo/GetAnchorage"
import Getbuoy from "./getInfo/GetBuoy"

function Markers() {
	return (
		<div>
			<GetAnchorage />
			<Getbuoy />
		</div>
	)
}

export default Markers
