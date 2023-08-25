import { useContext, useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import RIVResultContext from "../contexts/RIVResult";
import RIVTrafficLightContext from "../contexts/RIVTrafficLightContext";
import RIVTrafficLightsComponent from "../components/RIVTrafficLightsComponent";
import SelectedIndexContext from "contexts/SelectedIndexContext";

import WayareaPolygonContext from "contexts/WayareaPolygonContext";
import L from "leaflet";
import MapPointClickedContext from "contexts/MapPointClickedContext";
import TableRowClickedContext from "contexts/TableRowClickedContext";
import { layerBindPopupString } from "utils/layerBindPopupString";
import DiagramPointClickedContext from "contexts/DiagramPointClickedContext";
import { Button } from "@mui/material";
import CustomNewWindow from "components/CustomNewWindow";
import "leaflet/dist/leaflet.css";

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
  // console.log(
  //   "!!!!!!!!!!!!!!",
  //   map.getContainer(),
  //   map.getContainer().parentElement,
  //   map.getContainer().parentElement.parentElement,
  //   map.getContainer().parentElement.parentElement.parentElement
  // );

  // map.on("dragstart", (e) => {
  //   console.log("!!!!!!!!!!!!!!!!!!!", e);
  // });

  // map.getContainer().addEventListener("mouseover", () => {
  //   console.log("MOUSEOVER");
  // });
  // map.getContainer().addEventListener("dragstart", () => {
  //   console.log("DRAGSTART");
  //   map.dragging.enable();
  // });
  // map.getContainer().addEventListener("dragend", () => {
  //   console.log("DRAGEND");
  //   map.dragging.disable();
  // });
  // map.getContainer().addEventListener("mousedown", () => {
  //   console.log("MOSUEDOWN");
  //   map.dragging.enable();
  // });
  // map.getContainer().addEventListener("mouseout", () => {
  //   console.log("MOUSEOUT");
  //   // map.dragging.disable();
  // });
  const { RIVResults } = useContext(RIVResultContext);
  const { RIVTrafficLight } = useContext(RIVTrafficLightContext);
  const [geojsonFeatGroup, setGeojsonFeatGroup] = useState(
    new L.FeatureGroup()
  );
  const [geojsonFeatGroupWay, setGeojsonFeatGroupWay] = useState(
    new L.FeatureGroup()
  );
  const { wayareaPolygons } = useContext(WayareaPolygonContext);
  const { selectedRowIndex, setSelectedRowIndex } =
    useContext(SelectedIndexContext);
  const { setMapPointClicked } = useContext(MapPointClickedContext);
  const { tableRowClicked, setTableRowClicked } = useContext(
    TableRowClickedContext
  );
  const { diagramPointClicked, setDiagramPointClicked } = useContext(
    DiagramPointClickedContext
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

function MapView() {
  const { RIVResults } = useContext(RIVResultContext);
  const [coords, setCoords] = useState({ lat: 62, lng: 23.5 });
  const mapRef = useRef(null);
  const [openMap, setOpenMap] = useState(false);

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
      <div className="map-view-container">
        <div className="map-view-content">
          <RIVTrafficLightsComponent />
        </div>
      </div>
      <div className="map-view-container">
        <div className="map-view-content">
          <Button
            onClick={() => setOpenMap((r) => !r)}
            type="submit"
            variant="contained"
            sx={{ marginLeft: "1rem" }}
          >
            {openMap
              ? "Sulje kartta v2 (Custom New Window)"
              : "Näytä kartta v2 (Custom New Window)"}
          </Button>
          {openMap && (
            <CustomNewWindow title="Väyläriski kartta">
              <MapContainer
                whenReady={(e) => {
                  // const map = e.target;
                  // const draggable = new L.Draggable(
                  //   map.getContainer(),
                  //   map.getContainer()
                  // );
                  // console.log(map);
                  // draggable.enable();
                  // TODO: resize main window so that the map renders correctly
                  // document.body.style.height = `${
                  //   document.body.clientHeight + 1
                  // }`;
                  // window.outerWidth = window.outerWidth - 1;
                  // window.outerWidth = window.outerWidth + 1;
                  // console.log(window.innerHeight);
                  // console.log(window.outerHeight);
                  // console.log(window.innerWidth);
                  // console.log(window.outerWidth);
                }}
                center={coords}
                zoom={9}
                scrollWheelZoom={true}
                style={{
                  height: "800px",
                  width: "100%",
                  backgroundColor: "white",
                }}
              >
                <GeoJSONMarkers />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </MapContainer>
            </CustomNewWindow>
          )}
        </div>
      </div>
    </>
  );
}

export default MapView;
