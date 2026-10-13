import { AllotmentHandle } from 'allotment';
import { useRef } from 'react';

export default function useCustomAllotment() {
  const mapRef = useRef<AllotmentHandle | undefined>(undefined);

  function invalidateMapSize(sizes: number[]) {
    if (mapRef.current) {
      mapRef.current.reset();
    }
  }

  function resize(sizes: number[]) {
    if (mapRef.current) {
      mapRef.current.resize(sizes);
    }
  }

  function getMap(): any {
    return mapRef.current;
  }

  return { resize, invalidateMapSize, getMap };
}
