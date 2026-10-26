import { GeoJSON } from 'react-leaflet';
import { WayareaPolygon } from '../../types/WayareaPolygon.ts';
import { useEffect, useRef } from 'react';
import { GeoJSON as LGeoJson } from 'leaflet';
import { channelMarker } from './Markers/ChannelMarker.tsx';

type Props = {
  readonly channelArea?: WayareaPolygon;
};

export default function ChannelLayer({ channelArea }: Props) {
  const channelRef = useRef<LGeoJson>(null);

  // Resets channel data whenever it changes
  useEffect(() => {
    if (!channelRef.current) return;
    channelRef.current.clearLayers();
    if (!channelArea) return;
    channelRef.current.addData(channelArea);
    channelRef.current.bringToBack();
  }, [channelArea]);

  if (!channelArea) {
    return <></>;
  }

  return (
    <GeoJSON
      ref={channelRef}
      data={channelArea}
      pointToLayer={(_, latlng) => channelMarker(latlng)}
    />
  );
}
