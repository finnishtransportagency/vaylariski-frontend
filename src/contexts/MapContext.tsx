import { ReactNode } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import styles from './MapContext.module.css';

type Props = {
  readonly children: ReactNode;
};

function Map() {
  return (
    <div className={styles.mapViewContainer}>
      <MapProvider>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapProvider>
    </div>
  );
}

function MapProvider({ children }: Props) {
  return (
    <MapContainer
      center={{
        lat: 62,
        lng: 23.5,
      }}
      zoom={9}
      scrollWheelZoom={true}
    >
      {children}
    </MapContainer>
  );
}

export { MapProvider, Map };
