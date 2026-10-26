import { LatLngLiteral } from 'leaflet';
import { RivFeature } from '../../../types/RivResult.ts';
import { RivResultProperties } from '../../../types/RivResultProperties.ts';
import RiskPopup from '../RiskPopup.tsx';
import { RIVTrafficLight } from '../../../types/RIVTrafficLight.ts';
import { CSSColorCode } from '../../../types/CSSColorCode.ts';
import { CircleMarker } from 'react-leaflet';
import { CircleMarker as LCircleMarker } from 'leaflet';
import { useEffect, useRef, useState } from 'react';

type Props = {
  readonly riskFeature: RivFeature;
  readonly trafficLights: RIVTrafficLight;
  readonly selectedPointIndex?: number;
  readonly selectPointIndex: (pointIndex: number) => void;
};

export default function RiskMarker({
  riskFeature,
  trafficLights,
  selectedPointIndex,
  selectPointIndex,
}: Props) {
  const location: LatLngLiteral = {
    lat: riskFeature.geometry.coordinates[1],
    lng: riskFeature.geometry.coordinates[0],
  };
  const risk: RivResultProperties = riskFeature.properties;

  const [style, setStyle] = useState<'danger' | 'safe' | 'risky' | 'unknown'>(
    'unknown'
  );

  const [selected, setSelected] = useState<boolean>(false);

  useEffect(() => {
    if (!risk || risk.W_channel_depth == null) {
      setStyle('unknown');
    } else if (risk.RISK_INDEX_SUM >= trafficLights.yellow) {
      setStyle('danger');
    } else if (risk.RISK_INDEX_SUM >= trafficLights.green) {
      setStyle('risky');
    } else {
      setStyle('safe');
    }
    setSelected(selectedPointIndex === risk.point_index);
  }, [risk, trafficLights, selectedPointIndex]);

  const markerRef = useRef<LCircleMarker>(null);

  // Reset style if style or selection changes
  useEffect(() => {
    if (!markerRef.current) return;
    let radius: number;
    const weight: number = 1;
    let color: string;
    const opacity: number = 1;
    let fillColor: string;
    let fillOpacity: number;
    switch (style) {
      case 'danger':
        radius = 4;
        color = CSSColorCode.RED_100;
        fillColor = CSSColorCode.RED_100;
        fillOpacity = 0.8;
        break;
      case 'safe':
        radius = 4;
        color = CSSColorCode.GREEN_100;
        fillColor = CSSColorCode.GREEN_100;
        fillOpacity = 0.8;
        break;
      case 'risky':
        radius = 4;
        color = CSSColorCode.YELLOW_100;
        fillColor = CSSColorCode.YELLOW_100;
        fillOpacity = 0.8;
        break;
      default:
      case 'unknown':
        radius = 4;
        color = '#83888a';
        fillColor = '#83888a';
        fillOpacity = 0.8;
        break;
    }

    if (selected) {
      radius = 5;
      color = 'black';
      markerRef.current.openPopup();
    } else {
      markerRef.current.closePopup();
    }

    markerRef.current.addEventListener('click', () => {
      selectPointIndex(risk.point_index);
    });
    markerRef.current.setStyle({
      radius: radius,
      weight: weight,
      color: color,
      opacity: opacity,
      fillColor: fillColor,
      fillOpacity: fillOpacity,
    });
    markerRef.current.redraw();
  }, [style, selected]);

  return (
    <CircleMarker ref={markerRef} center={location}>
      <RiskPopup result={risk} />
    </CircleMarker>
  );
}
