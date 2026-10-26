import { LatLngLiteral } from 'leaflet';
import { RivResult } from '../../types/RivResult.ts';
import { useEffect, useState } from 'react';
import { useRisk } from '../../contexts/NewRiskContext.tsx';

export default function useCustomMap() {
  const { RIVResult } = useRisk();

  const AUREJARVI: LatLngLiteral = {
    lat: 62,
    lng: 23.5,
  };

  const DEFAULT_ZOOM: number = 9;

  const [center, setCenter] = useState<LatLngLiteral>(AUREJARVI);

  function findRiskLocation(
    risks?: RivResult,
    pointIndex?: number
  ): LatLngLiteral | undefined {
    if (!risks?.features || !pointIndex) return undefined;
    const foundFeature = risks.features.find(
      (feature) => feature.properties.point_index === pointIndex
    );
    if (!foundFeature) return undefined;
    const location = foundFeature.geometry.coordinates;
    return {
      lat: location[1],
      lng: location[0],
    };
  }

  useEffect(() => {
    // Changes center to new first location if possible
    if (!RIVResult || RIVResult.features.length < 1) {
      setCenter(AUREJARVI);
      return;
    }

    const firstBoatLocation = RIVResult.features[0].geometry.coordinates;
    const newCenter: LatLngLiteral = {
      lat: firstBoatLocation[1],
      lng: firstBoatLocation[0],
    };
    if (center.lat === newCenter.lat && center.lng === newCenter.lng) {
      return;
    }
    setCenter(newCenter);
  }, [RIVResult]);

  return {
    center,
    DEFAULT_ZOOM,
    findRiskLocation,
  };
}
