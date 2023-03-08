import './App.css';
import { MapContainer } from 'react-leaflet'
import Maps from './components/Maps';
import Markers from './components/Markers';
import Button from './components/Button';
import "../node_modules/leaflet/dist/leaflet.css"
import "../node_modules/leaflet/dist/leaflet.js"

const App = () => {


  return (
    <div>
      <MapContainer center={[44.119370, 15.231365]} zoom={12} scrollWheelZoom={true}>
        <Maps />
        <Markers />
        <Button/>
      </MapContainer>

    </div >

  )
}

export default App;
