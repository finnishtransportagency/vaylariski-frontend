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

function GeoJSONMarkers() {
  const map = useMap();
  const { RIVResults, setRIVResults } = useContext(RIVResultContext);
  let geoJSONLayers = new L.LayerGroup();

  console.log('lapsi', map);
  useEffect(() => {
    map.removeLayer(geoJSONLayers);
    geoJSONLayers.clearLayers();
    console.log(geoJSONLayers);

    function onEachFeature(feature, layer) {
      // does this feature have a property named popupContent?
      if (feature.properties) {
        // layer.bindPopup(`<p>${feature.properties.GDO_GID}</p>`)
        layer.bindPopup('<pre>'+JSON.stringify(feature.properties,null,' ').replace(/[\{\}"]/g,'')+'</pre>');
      }
    };

    const layers = new L.GeoJSON(RIVResults, {
      onEachFeature: onEachFeature,
      pointToLayer: function (feature, latlng) {
        // Initial traffic lights for risk value
        if (feature.properties.RISK_INDEX_SUM > 20 ) {
          return L.circleMarker(latlng, geojsonMarkerOptionsRed);
        }
        return L.circleMarker(latlng, geojsonMarkerOptions);
      }
    });
    layers.addTo(geoJSONLayers);

    console.log('geoJSONLayers', geoJSONLayers);
    geoJSONLayers.addTo(map);


  }, [RIVResults]);
  return null;
}

function Mapp() {
  // Map ref
  const mapRef = useRef(null);
  // Map state
  const [mapInstance, setMapInstance] = useState(null);

  const { RIVResults, setRIVResults } = useContext(RIVResultContext);
  let markersLayerGroup = new L.LayerGroup();
  // const [geoJSONLayers, setGeoJSONLayes]  = useState();

  // useEffect(() => {
  //   // let map = mapRef.current;
  //   // if (!mapRef.current) return;
  //   // Set map instance to state:
  //   console.log('[]',mapRef.current);
  //   setMapInstance(mapRef.current);
  // }, []);

  // useEffect(() => {

  //   console.log('mapinstance', mapInstance);
  // }, [mapInstance]);

  // // useEffect(() => {
  // //   // Check for the map instance before adding something (ie: another event listener).
  // //   // If no map, return:
  // //   if (!mapInstance) return;

  // // }, [mapInstance]);

  // function onEachFeature(feature, layer) {
  //   // does this feature have a property named popupContent?
  //   if (feature.properties) {
  //     // layer.bindPopup(`<p>${feature.properties.GDO_GID}</p>`)
  //     layer.bindPopup('<pre>'+JSON.stringify(feature.properties,null,' ').replace(/[\{\}"]/g,'')+'</pre>');
  //   }
  // };

  // useEffect(() => {
  //   // geoJSONLayers.clearLayers();
  //   // console.log('markersLayerGroup layer len',geoJSONLayers);

  //   // const { current = {} } = mapRef;
  //   // if (!current) return;

  //   // const map = mapRef.current;
  //   // if ( !map ) return;
  //   // geoJSONLayers.removeFrom(map);

  //   const geoJSONLayers = new L.GeoJSON(RIVResults, {
  //     onEachFeature: onEachFeature,
  //     pointToLayer: function (feature, latlng) {
  //       // Initial traffic lights for risk value
  //       if (feature.properties.RISK_INDEX_SUM > 20 ) {
  //         return L.circleMarker(latlng, geojsonMarkerOptionsRed);
  //       }
  //       return L.circleMarker(latlng, geojsonMarkerOptions);
  //     }
  //   });//.addTo(markersLayerGroup);
  //   console.log('geoJSONLayers', geoJSONLayers);
  //   // lolgeo.addTo(markersLayerGroup);

  //   console.log('markersLayerGroup after',markersLayerGroup.getLayers().length);
  //   if (mapRef.current) {
  //     console.log('should add to mapinstance');
  //     geoJSONLayers.addTo(mapRef.current);
  //   }

  // }, [RIVResults]);


  return (
    <MapContainer
      // whenReady={ instance => {mapRef.current = instance} }
      // ref={mapRef}
      center={[62, 23.5]}
      zoom={5}
      scrollWheelZoom={false}
      style={{ height:"800px",backgroundColor:"white",marginTop:"80px", marginBottom:'90px'
        }}
    >
      <GeoJSONMarkers />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
    );
};

export default Mapp;
