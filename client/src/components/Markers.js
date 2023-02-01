import "./Markers.css"
import { Marker, Popup } from 'react-leaflet'

function Markers() {
  
	return (
		<Marker position={[44.119370, 15.231365]}>
		<Popup>
			<div>
				<h1>Název</h1>
				
			</div>
		</Popup>
	  </Marker>
	)
  }

export default Markers
