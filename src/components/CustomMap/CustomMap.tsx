import { MapContainer, TileLayer } from 'react-leaflet';

import useCustomMap from './useCustomMap.ts';
import styles from './CustomMap.module.css';

export default function CustomMap() {
  const { center } = useCustomMap();

  return (
    <div className={styles.mapViewContainer}>
      <MapContainer center={center} zoom={9} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}
