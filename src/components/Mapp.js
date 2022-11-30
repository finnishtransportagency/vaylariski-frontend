import { useContext, useEffect, useState, useRef } from 'react';
import RIVResultContext from '../contexts/RIVResult';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import L from 'leaflet'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

const geojsonMarkerOptions = {
  radius: 8,
  fillColor: "#ff7800",
  color: "#ff7800",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};
const geojsonMarkerOptionsRed = {
  radius: 8,
  fillColor: "#ff0000",
  color: "#ff0000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};

function Mapp() {
  const mapRef = useRef();
  // console.log(mapRef);
  const { RIVResults, setRIVResults } = useContext(RIVResultContext);

  function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties) {
      // layer.bindPopup(`<p>${feature.properties.GDO_GID}</p>`)
      layer.bindPopup('<pre>'+JSON.stringify(feature.properties,null,' ').replace(/[\{\}"]/g,'')+'</pre>');
    }
  };

  useEffect(() => {
    const { current = {} } = mapRef;
    if (!current) return;

    const map = mapRef.current;
    if ( !map ) return;

    L.geoJSON(RIVResults, {
      onEachFeature: onEachFeature,
      pointToLayer: function (feature, latlng) {
        if (feature.properties.RISK_INDEX_SUM > 20 ) {
          return L.circleMarker(latlng, geojsonMarkerOptionsRed);
        }
          return L.circleMarker(latlng, geojsonMarkerOptions);
        }
   }).addTo(map);

  }, [RIVResults]);

  return (
    <MapContainer
      ref={mapRef}
      center={[62, 23.5]}
      zoom={5}
      scrollWheelZoom={false}
      style={{ height:"800px",backgroundColor:"red",marginTop:"80px", marginBottom:'90px'
        }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
    );
};

export default Mapp;
