import './App.css';
import { MapContainer } from 'react-leaflet'
import Maps from './components/Maps';
import Markers from './components/Markers';

const App = () => {
  return (
    <div>
      <MapContainer center={[44.119370, 15.231365]} zoom={13} scrollWheelZoom={true}>
        <Maps />
        <Markers />
      </MapContainer>
    </div>

  )
}

export default App;
