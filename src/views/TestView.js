import {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import L from "leaflet";
import NewWindow from "react-new-window";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { createPortal } from "react-dom";

function createMapWidget(containerDomNode) {
  const map = L.map(containerDomNode);
  map.setView([0, 0], 0);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);
  return map;
}

function addPopupToMapWidget(map) {
  const popupDiv = document.createElement("div");
  L.popup().setLatLng([0, 0]).setContent(popupDiv).openOn(map);
  return popupDiv;
}

//

function TestView() {
  const center = { lat: 62, lng: 23.5 };
  const zoom = 13;

  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const [popupContainer, setPopupContainer] = useState(null);

  useEffect(() => {
    if (mapRef.current === null) {
      const map = createMapWidget(containerRef.current);
      mapRef.current = map;
      const popupDiv = addPopupToMapWidget(map);
      setPopupContainer(popupDiv);
    }
  }, []);

  return (
    <div style={{ width: 250, height: 250 }} ref={containerRef}>
      {popupContainer !== null &&
        createPortal(<p>Hello from React!</p>, popupContainer)}
    </div>
  );
}

export default TestView;
