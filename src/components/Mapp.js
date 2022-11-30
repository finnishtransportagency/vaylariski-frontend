import { useContext, useEffect, useState, useRef } from 'react';
import RIVResultContext from '../contexts/RIVResult';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import L from 'leaflet'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'


function Mapp() {
  const mapRef = useRef();
  // console.log(mapRef);
  const { RIVResults, setRIVResults } = useContext(RIVResultContext);

  useEffect(() => {
    const map = mapRef.current;
    console.log(map);
  }, []);

  useEffect(() => {
    const { current = {} } = mapRef;
    if (!current) return;

    // console.log('currr', current)
    // const { leafletElement: map } = current;
    const map = mapRef.current;

    console.log('map', map)
    if ( !map ) return;
    const parksGeoJson = new L.GeoJSON(RIVResults, {
      onEachFeature: (feature = {}, layer) => {
        const { properties = {} } = feature;
        const { Name } = properties;

        if ( !Name ) return;

        layer.bindPopup(`<p>${Name}</p>`);
      }
    });
    parksGeoJson.addTo(map);
  }, [RIVResults]);

  return (
    <MapContainer
      ref={mapRef}
      center={[51.505, -0.09]}
      zoom={4}
      scrollWheelZoom={false}
      style={{ height:"400px",backgroundColor:"red",marginTop:"80px", marginBottom:'90px'
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
