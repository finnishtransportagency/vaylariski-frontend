import { useContext, useEffect, useState, useRef } from "react";
import L, { FeatureGroup, latLng } from "leaflet";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";

import RIVResultContext from "../contexts/RIVResult";
import RIVTrafficLightContext from "../contexts/RIVTrafficLightContext";
import RIVTrafficLightsComponent from "../components/RIVTrafficLightsComponent";
import SelectedIndexContext from "contexts/SelectedIndexContext";

import apiClient from "http-common";
import SpinnerVisibilityContext from "contexts/SpinnerVisibilityContext";
import NotificationContext from "contexts/NotificationContext";
import WayareaPolygonContext from "contexts/WayareaPolygonContext";

const geojsonMarkerOptionsGreen = {
  radius: 4,
  fillColor: "#00FF00",
  color: "#00FF00",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};
const geojsonMarkerOptionsYellow = {
  radius: 4,
  fillColor: "#ffff00",
  color: "#ffff00",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};
const geojsonMarkerOptionsRed = {
  radius: 4,
  fillColor: "#ff0000",
  color: "#ff0000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};
const geojsonMarkerOptionsGray = {
  radius: 4,
  fillColor: "#83888a",
  color: "#83888a",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};
function GeoJSONMarkers() {
  const map = useMap();
  const { RIVResults, setRIVResults } = useContext(RIVResultContext);
  const { RIVTrafficLight, setRIVTraffiLight } = useContext(
    RIVTrafficLightContext
  );
  const [geojsonFeatGroup, setGeojsonFeatGroup] = useState(
    new L.FeatureGroup()
  );
  const [geojsonFeatGroupWay, setGeojsonFeatGroupWay] = useState(
    new L.FeatureGroup()
  );
  const { wayareaPolygons, setWayareaPolygons } = useContext(
    WayareaPolygonContext
  );
  const {selectedRowIndex, setSelectedRowIndex} = useContext(
    SelectedIndexContext
  );

  useEffect(() => {
    console.log('Map Clicked:', selectedRowIndex);
  }, [selectedRowIndex])

  function onEachFeature(feature, layer, children) {
    // If feature have have properties parse all of them and bind to layer
    if (feature.properties) {

      layer.on('click', () => {
        setSelectedRowIndex(feature.properties.point_index);
      });

      layer.bindPopup(
        "<pre>" +
        JSON.stringify(feature.properties, null, " ").replace(
          /[\{\}"]/g,
          ""
        ) +
        "</pre>"
      );
    }
  }

  useEffect(() => {
    console.log(wayareaPolygons);
    setGeojsonFeatGroupWay(geojsonFeatGroupWay.clearLayers());
    const w_layers = new L.GeoJSON(wayareaPolygons, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptionsGray);
      },
    });
    setGeojsonFeatGroupWay(w_layers.addTo(geojsonFeatGroupWay));
    geojsonFeatGroupWay.addTo(map);
  }, [wayareaPolygons]);

  useEffect(() => {
    setGeojsonFeatGroup(geojsonFeatGroup.clearLayers());

    const layers = new L.GeoJSON(RIVResults, {
      onEachFeature: onEachFeature,
      pointToLayer: function (feature, latlng) {
        // Initial traffic lights for risk value
        if (feature.properties.W_channel == null || feature.properties.W_channel_depth == null) {
          return L.circleMarker(latlng, geojsonMarkerOptionsGray);
        } else {
          if (feature.properties.RISK_INDEX_SUM < RIVTrafficLight.green) {
            return L.circleMarker(latlng, geojsonMarkerOptionsGreen);
          } else if (
            feature.properties.RISK_INDEX_SUM >= RIVTrafficLight.green &&
            feature.properties.RISK_INDEX_SUM < RIVTrafficLight.yellow
          ) {
            return L.circleMarker(latlng, geojsonMarkerOptionsYellow);
          }
          return L.circleMarker(latlng, geojsonMarkerOptionsRed);
        }

      }
    });
    setGeojsonFeatGroup(layers.addTo(geojsonFeatGroup));

    geojsonFeatGroup.addTo(map);
  }, [RIVResults, RIVTrafficLight]);
  return null;
}

function MapView() {
  const { RIVResults, setRIVResults } = useContext(RIVResultContext);
  const [coords, setCoords] = useState({ lat: 62, lng: 23.5 });
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(coords, 9);
    }
  }, [coords]);

  useEffect(() => {
    if (typeof (RIVResults.features) !== "undefined") {
      setCoords({ lat: RIVResults.features[0].geometry.coordinates[1], lng: RIVResults.features[0].geometry.coordinates[0] });
    }
  }, [RIVResults]);

  return (
    <>
      <RIVTrafficLightsComponent />
      <MapContainer
        // whenReady={ instance => {mapRef.current = instance} }
        ref={mapRef}
        center={coords}
        zoom={9}
        scrollWheelZoom={true}
        style={{
          height: "800px",
          width: "75%",
          backgroundColor: "white",
          marginTop: "80px",
          marginBottom: "5px",
        }}
      >
        <GeoJSONMarkers />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  );
}

export default MapView;
