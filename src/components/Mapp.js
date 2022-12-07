import { useContext, useEffect, useState } from 'react';
import RIVResultContext from '../contexts/RIVResult';
import L, { FeatureGroup } from 'leaflet'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'

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
  const [geojsonFeatGroup, setGeojsonFeatGroup ] = useState(new L.FeatureGroup());

  function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties) {
      // layer.bindPopup(`<p>${feature.properties.GDO_GID}</p>`)
      layer.bindPopup('<pre>'+JSON.stringify(feature.properties,null,' ').replace(/[\{\}"]/g,'')+'</pre>');
    }
  };

  console.log('lapsi', map);
  useEffect(() => {
    setGeojsonFeatGroup(geojsonFeatGroup.clearLayers());

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
    setGeojsonFeatGroup(layers.addTo(geojsonFeatGroup));

    geojsonFeatGroup.addTo(map);
  }, [RIVResults]);
  return null;
}

function Mapp() {
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
      <GeoJSONMarkers
      />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
    );
};

export default Mapp;
