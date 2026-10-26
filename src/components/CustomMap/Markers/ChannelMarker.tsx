import {
  CircleMarker as LCircleMarker,
  circleMarker,
  LatLngLiteral,
} from 'leaflet';
import { ReactNode } from 'react';
import { CircleMarker } from 'react-leaflet';

export type Props = {
  readonly location: LatLngLiteral;
  readonly children?: ReactNode;
};

export function channelMarker(location: LatLngLiteral): LCircleMarker {
  return circleMarker(location, {
    radius: 4,
    fillColor: '#83888a',
    color: '#83888a',
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
  });
}

export default function ChannelMarker({ location, children }: Props) {
  return (
    <CircleMarker
      radius={4}
      color="#83888a"
      fillColor="#83888a"
      weight={1}
      opacity={1}
      fillOpacity={0.8}
      center={location}
    >
      {children}
    </CircleMarker>
  );
}
