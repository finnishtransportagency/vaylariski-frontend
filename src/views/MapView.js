import { useContext, useEffect, useState } from "react";
import L, { FeatureGroup } from "leaflet";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import RIVResultContext from "../contexts/RIVResult";
import RIVTrafficLightContext from "../contexts/RIVTrafficLightContext";
import RIVTrafficLightsComponent from "../components/RIVTrafficLightsComponent";
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

  function onEachFeature(feature, layer) {
    // If feature have have properties parse all of them and bind to layer
    if (feature.properties) {
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
        if(feature.properties.W_channel == null || feature.properties.W_channel_depth == null) {
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
  return (
    <>
      <RIVTrafficLightsComponent />
      <MapContainer
        // whenReady={ instance => {mapRef.current = instance} }
        // ref={mapRef}
        center={[62, 23.5]}
        zoom={7}
        scrollWheelZoom={true}
        style={{
          height: "800px",
          width:"75%",
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
