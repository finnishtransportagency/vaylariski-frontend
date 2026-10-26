import styles from './CustomMap.module.css';
import { useEffect, useRef } from 'react';
import { useChannel } from '../../contexts/NewChannelContext.tsx';
import { useUserSelection } from '../../contexts/NewUserSelectionContext.tsx';
import { useRisk } from '../../contexts/NewRiskContext.tsx';
import RiskLayer from './RiskLayer.tsx';
import ChannelLayer from './ChannelLayer.tsx';
import { Map } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import useCustomMap from './useCustomMap.ts';

export default function CustomMap() {
  const { RIVResult, RIVTrafficLight } = useRisk();
  const { selectedRiskPointIndex, selectRiskPointIndex } = useUserSelection();
  const { channelArea } = useChannel();

  const { center, DEFAULT_ZOOM, findRiskLocation } = useCustomMap();

  const mapRef = useRef<Map>(null);

  // Centers map
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setView(center);
    mapRef.current.setZoom(DEFAULT_ZOOM);
  }, [center]);

  // Moves the map according to user selection
  useEffect(() => {
    if (!mapRef.current) return;
    const location = findRiskLocation(RIVResult, selectedRiskPointIndex);
    if (!location) return;

    mapRef.current.panTo(location);
  }, [selectedRiskPointIndex]);

  return (
    <MapContainer
      ref={mapRef}
      scrollWheelZoom={true}
      className={styles.mapViewContainer}
      center={center}
      zoom={DEFAULT_ZOOM}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ChannelLayer channelArea={channelArea} />
      <RiskLayer
        risks={RIVResult}
        trafficLights={RIVTrafficLight}
        selectedPointIndex={selectedRiskPointIndex}
        selectPointIndex={selectRiskPointIndex}
      />
    </MapContainer>
  );
}
