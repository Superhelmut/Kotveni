import "./Maps.css"
import { TileLayer } from 'react-leaflet'

const Maps = () => {
	return(
		<TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"        
      />
	)
}

export default Maps
