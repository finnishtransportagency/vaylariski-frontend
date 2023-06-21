import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import RIVTrafficLightsComponent from "../components/RIVTrafficLightsComponent";
import L from "leaflet";
import { layerBindPopupString } from "utils/layerBindPopupString";

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
function GeoJSONMarkers(props) {
  const map = useMap();
  const {
    RIVResults,
    RIVTrafficLight,
    wayareaPolygons,
    selectedRowIndex,
    setSelectedRowIndex,
    setMapPointClicked,
    tableRowClicked,
    setTableRowClicked,
    diagramPointClicked,
    setDiagramPointClicked,
  } = props;
  const [geojsonFeatGroup, setGeojsonFeatGroup] = useState(
    new L.FeatureGroup()
  );
  const [geojsonFeatGroupWay, setGeojsonFeatGroupWay] = useState(
    new L.FeatureGroup()
  );

  function onEachFeature(feature, layer) {
    // If feature have properties parse all of them and bind to layer
    if (feature.properties) {
      layer.on("click", () => {
        setMapPointClicked(true);
        setSelectedRowIndex(feature.properties.point_index);
      });

      layer.bindPopup(layerBindPopupString(feature));
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

  // Helper function to render a tooltip to the map for the selectedRowIndex
  const toggleMapTooltipAndPanToPoint = () => {
    let chosenLayer;
    // TODO: Optimise this, and check how this can be implemented
    // without having to use ts-ignore
    geojsonFeatGroup.eachLayer((layer) => {
      // @ts-ignore
      // The above ts-ignore is needed as otherwise the intellisense will say that
      // layer.feature doesn't exist, even though it does :D
      if (layer.feature) {
        if (
          // @ts-ignore
          layer.feature.properties.point_index === selectedRowIndex
        ) {
          chosenLayer = layer;
        }
      }
    });
    // @ts-ignore
    // Same reasoning here as above
    if (chosenLayer) {
      // @ts-ignore
      chosenLayer.openPopup();
      // @ts-ignore
      map.panTo(chosenLayer._latlng);
    }
  };

  // Runs when a row in the RIV table or a point in the RIV diagram has been clicked,
  // renders the correct tooltip on the map
  useEffect(() => {
    if (tableRowClicked) {
      setTableRowClicked(false);
      toggleMapTooltipAndPanToPoint();
    } else if (diagramPointClicked) {
      setDiagramPointClicked(false);
      toggleMapTooltipAndPanToPoint();
    }
  }, [selectedRowIndex]);

  return null;
}

const MapView2 = (props) => {
  const {
    RIVResults,
    RIVTrafficLight,
    wayareaPolygons,
    selectedRowIndex,
    setSelectedRowIndex,
    setMapPointClicked,
    tableRowClicked,
    setTableRowClicked,
    diagramPointClicked,
    setDiagramPointClicked,
  } = props;

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
        center={coords}
        zoom={8}
        scrollWheelZoom={true}
        style={{
          height: "550px",
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <GeoJSONMarkers
          RIVResults={RIVResults}
          RIVTrafficLight={RIVTrafficLight}
          wayareaPolygons={wayareaPolygons}
          selectedRowIndex={selectedRowIndex}
          setSelectedRowIndex={setSelectedRowIndex}
          setMapPointClicked={setMapPointClicked}
          tableRowClicked={tableRowClicked}
          setTableRowClicked={setTableRowClicked}
          diagramPointClicked={diagramPointClicked}
          setDiagramPointClicked={setDiagramPointClicked}
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  );
};

export default MapView2;
