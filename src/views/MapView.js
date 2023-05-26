import { useContext, useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import RIVResultContext from "../contexts/RIVResult";
import RIVTrafficLightContext from "../contexts/RIVTrafficLightContext";
import RIVTrafficLightsComponent from "../components/RIVTrafficLightsComponent";
import WayareaPolygonContext from "contexts/WayareaPolygonContext";
import L from "leaflet";

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
  const { RIVResults } = useContext(RIVResultContext);
  const { RIVTrafficLight } = useContext(RIVTrafficLightContext);
  const [geojsonFeatGroup, setGeojsonFeatGroup] = useState(
    new L.FeatureGroup()
  );
  const [geojsonFeatGroupWay, setGeojsonFeatGroupWay] = useState(
    new L.FeatureGroup()
  );
  const { wayareaPolygons } = useContext(WayareaPolygonContext);

  function onEachFeature(feature, layer) {
    // If feature have have properties parse all of them and bind to layer
    if (feature.properties) {
      layer.bindPopup(
        "<pre>" +
          "GDO_GID: " +
          JSON.stringify(feature.properties.GDO_GID) +
          "\n" +
          "VAYLAT: " +
          JSON.stringify(feature.properties.VAYLAT) +
          "\n" +
          "RIV_SUM: " +
          JSON.stringify(feature.properties.RISK_INDEX_SUM) +
          "\n" +
          "RIV_1_channel: " +
          JSON.stringify(feature.properties.RIV_1_channel) +
          "\n" +
          "RIV_2_bend: " +
          JSON.stringify(feature.properties.RIV_2_bend) +
          "\n" +
          "RIV_3_s_bend: " +
          JSON.stringify(feature.properties.RIV_3_s_bend) +
          "\n" +
          "RIV_4_traffic_complexity: " +
          JSON.stringify(feature.properties.RIV_4_traffic_complexity) +
          "\n" +
          "RIV_5_reduced_visibility: " +
          JSON.stringify(feature.properties.RIV_5_reduced_visibility) +
          "\n" +
          "RIV_6_light_pollution: " +
          JSON.stringify(feature.properties.RIV_6_light_pollution) +
          "\n" +
          "PF_1_channel: " +
          JSON.stringify(feature.properties.PF_1_channel) +
          "\n" +
          "PF_2_bend: " +
          JSON.stringify(feature.properties.PF_2_bend) +
          "\n" +
          "PF_bend1: " +
          JSON.stringify(feature.properties.PF_bend1) +
          "\n" +
          "PF_bend2: " +
          JSON.stringify(feature.properties.PF_bend2) +
          "\n" +
          "BSI: " +
          JSON.stringify(feature.properties.BSI) +
          "\n" +
          "PF_3_s_bend: " +
          JSON.stringify(feature.properties.PF_3_s_bend) +
          "\n" +
          "PF_4_traffic_complexity: " +
          JSON.stringify(feature.properties.PF_4_traffic_complexity) +
          "\n" +
          "PF_5_reduced_visibility: " +
          JSON.stringify(feature.properties.PF_5_reduced_visibility) +
          "\n" +
          "PF_6_light_pollution: " +
          JSON.stringify(feature.properties.PF_6_light_pollution) +
          "\n" +
          // 'PF_6_light_pollution_value: ' + JSON.stringify(feature.properties.PF_6_light_pollution_value) + '\n' +
          // 'PF_traffic_complexity: ' + JSON.stringify(feature.properties.PF_traffic_complexity) + '\n' +
          // 'PF_traffic_value: ' + JSON.stringify(feature.properties.PF_traffic_value) + '\n' +
          // 'PF_traffic_volume: ' + JSON.stringify(feature.properties.PF_traffic_volume) + '\n' +
          "W_atn: " +
          JSON.stringify(feature.properties.W_atn) +
          "\n" +
          "W_bank_clearance: " +
          JSON.stringify(feature.properties.W_bank_clearance) +
          "\n" +
          "W_bottom_surface: " +
          JSON.stringify(feature.properties.W_bottom_surface) +
          "\n" +
          "W_channel_width: " +
          JSON.stringify(feature.properties.W_channel) +
          "\n" +
          "W_channel_depth: " +
          JSON.stringify(feature.properties.W_channel_depth) +
          "\n" +
          "W_cross_current: " +
          JSON.stringify(feature.properties.W_cross_current) +
          "\n" +
          "W_longitudinal_current: " +
          JSON.stringify(feature.properties.W_longitudinal_current) +
          "\n" +
          "W_maneuvrability: " +
          JSON.stringify(feature.properties.W_manoeuvrability) +
          "\n" +
          "W_speed: " +
          JSON.stringify(feature.properties.W_speed) +
          "\n" +
          "W_wave_height: " +
          JSON.stringify(feature.properties.W_wave_height) +
          "\n" +
          "W_wind: " +
          JSON.stringify(feature.properties.W_wind) +
          "\n" +
          "S_bend_length: " +
          JSON.stringify(feature.properties.bend_S_length) +
          "\n" +
          "bend_angle: " +
          JSON.stringify(feature.properties.bend_angle) +
          "\n" +
          "bend_radius: " +
          JSON.stringify(feature.properties.bend_radius) +
          "\n" +
          "channel_depth: " +
          JSON.stringify(feature.properties.channel_depth_value) +
          "\n" +
          "index: " +
          JSON.stringify(feature.properties.point_index) +
          "\n" +
          "</pre>"
      );
    }
  }

  useEffect(() => {
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
        if (
          feature.properties.W_channel == null ||
          feature.properties.W_channel_depth == null
        ) {
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
      },
    });
    setGeojsonFeatGroup(layers.addTo(geojsonFeatGroup));

    geojsonFeatGroup.addTo(map);
  }, [RIVResults, RIVTrafficLight]);
  return null;
}

function MapView() {
  const { RIVResults } = useContext(RIVResultContext);
  const [coords, setCoords] = useState({ lat: 62, lng: 23.5 });
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(coords, 9);
    }
  }, [coords]);

  useEffect(() => {
    if (typeof RIVResults.features !== "undefined") {
      setCoords({
        lat: RIVResults.features[0].geometry.coordinates[1],
        lng: RIVResults.features[0].geometry.coordinates[0],
      });
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
