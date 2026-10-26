import { FeatureGroup } from 'react-leaflet';
import RiskMarker from './Markers/RiskMarker.tsx';
import { RivResult } from '../../types/RivResult.ts';
import { RIVTrafficLight } from '../../types/RIVTrafficLight.ts';

type Props = {
  readonly risks?: RivResult;
  readonly trafficLights: RIVTrafficLight;
  readonly selectedPointIndex?: number;
  readonly selectPointIndex: (pointIndex: number) => void;
};

export default function RiskLayer({
  risks,
  trafficLights,
  selectedPointIndex,
  selectPointIndex,
}: Props) {
  if (!risks) {
    return <></>;
  }
  return (
    <FeatureGroup>
      {risks.features.map((feature) => (
        <RiskMarker
          riskFeature={feature}
          trafficLights={trafficLights}
          selectedPointIndex={selectedPointIndex}
          selectPointIndex={selectPointIndex}
        />
      ))}
    </FeatureGroup>
  );
}
