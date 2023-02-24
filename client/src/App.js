import './App.css';
import { MapContainer, LayerGroup, Circle } from 'react-leaflet'
import Maps from './components/Maps';
import Markers from './components/Markers';
import Button from './components/Button';

const App = () => {


  return (
    <div>
      <MapContainer center={[44.119370, 15.231365]} zoom={12} scrollWheelZoom={true}>
        <Maps />
        <Markers />
        <Button />
      </MapContainer>

    </div >

  )
}

export default App;
