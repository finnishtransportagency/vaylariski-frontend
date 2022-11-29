import { useContext, useEffect, useState } from 'react';
import RIVResultContext from '../contexts/RIVResult';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'


function Mapp(props) {
  const { RIVResults, setRIVResults } = useContext(RIVResultContext);
  const [ lats, setLats ] = useState([60.2]);
  const [ lons, setLons ] = useState([24.9]);
  const [ figState, setFigState ] = useState({
    data: [{
      lat: [60.2],
      lon: [24.9],
      type: 'scattermapbox',
      mode: 'markers',
      marker: {color: 'gray', size:5}
    }],
    layout: {
      width: 1000,
      height: 800,
      title: 'A Fancy Plot',
      margin: {'l': 0, 't': 0, 'b': 0, 'r': 0},
      mapbox: {
        style: "stamen-terrain",
        center: { lat: 60.2, lon: 24.9 },
        zoom: 10 }
    },
    frames: [],
    config: {}
  });


  useEffect(() => {
    let lats = []
    let lons = []

    RIVResults.map(result => {
      lats.push(result.COORD_Y)
      lons.push(result.COORD_X)
    });

    const newData = [{
      lat: lats,
      lon: lons,
      type: 'scattermapbox',
      mode: 'markers',
      marker: {color: 'gray', size:5}
    }];

    setFigState({...figState, data: newData });
  }, [RIVResults]);

  useEffect(() => {
    console.log(figState);
  }, [figState]);

  return (
    <MapContainer
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
      <Marker
        position={[51.505, -0.09]}
        icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
    );
};

export default Mapp;
