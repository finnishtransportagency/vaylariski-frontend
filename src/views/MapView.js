import {
  useContext,
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
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
import { calculationTypeEnums, cssColorCodes } from "constants/enums";
import PreviousRIVResultsContext from "contexts/PreviousRIVResultsContext";
import SelectedCalculationTypeContext from "contexts/SelectedCalculationTypeContext";

import ReactDOMServer from "react-dom/server";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";

const geojsonMarkerOptionsGreen = {
  radius: 4,
  fillColor: cssColorCodes.GREEN_100,
  color: cssColorCodes.GREEN_100,
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const geojsonMarkerOptionsYellow = {
  radius: 4,
  fillColor: cssColorCodes.YELLOW_100,
  color: cssColorCodes.YELLOW_100,
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const geojsonMarkerOptionsRed = {
  radius: 4,
  fillColor: cssColorCodes.RED_100,
  color: cssColorCodes.RED_100,
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

const highlighMapPoint = {
  radius: 8,
  // fillColor: "#83888a",
  color: "black",
  weight: 1,
  opacity: 1,
  fillOpacity: 0,
};

// When comparing routeline and navigationline the cross sign is used instead of circle
const crossIconRed = L.divIcon({
  className: "material-icon",
  html: ReactDOMServer.renderToString(
    <div>
      <CloseSharpIcon
        style={{ color: cssColorCodes.RED_100, fontSize: "0.75rem" }}
      />
    </div>
  ),
  iconAnchor: [6.5, 9], // This is the spot where the circle markers are anchored by default (approx)
});

const crossIconYellow = L.divIcon({
  className: "material-icon",
  html: ReactDOMServer.renderToString(
    <div>
      <CloseSharpIcon
        style={{ color: cssColorCodes.YELLOW_100, fontSize: "0.75rem" }}
      />
    </div>
  ),
  iconAnchor: [6.5, 9], // This is the spot where the circle markers are anchored by default
});

const crossIconGreen = L.divIcon({
  className: "material-icon",
  html: ReactDOMServer.renderToString(
    <div>
      <CloseSharpIcon
        style={{ color: cssColorCodes.GREEN_100, fontSize: "0.75rem" }}
      />
    </div>
  ),
  iconAnchor: [6.5, 9], // This is the spot where the circle markers are anchored by default
});

const crossIconGray = L.divIcon({
  className: "material-icon",
  html: ReactDOMServer.renderToString(
    <div>
      <CloseSharpIcon style={{ color: "#83888a", fontSize: "0.75rem" }} />
    </div>
  ),
  iconAnchor: [6.5, 9], // This is the spot where the circle markers are anchored by default
});

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
  const [highlightFeatureGroup] = useState(new L.FeatureGroup());
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
  const { selectedCalculationType } = useContext(
    SelectedCalculationTypeContext
  );

  function onEachFeature(feature, layer) {
    // If feature has properties, parse them and bind them to the layer
    if (feature.properties) {
      layer.on("click", () => {
        setMapPointClicked(true);
        setSelectedRowIndex(feature.properties.point_index);

        // Clear the existing highlight feature group
        highlightFeatureGroup.clearLayers();

        // Add a new circle marker to the highlight feature group
        const highlight = L.circleMarker(layer.getLatLng(), highlighMapPoint);
        highlightFeatureGroup.addLayer(highlight);

        // Add the highlight feature group to the map
        highlightFeatureGroup.addTo(map);

        // Original cirle markers to front so the bind popup works in re-clicking
        if (map.hasLayer(geojsonFeatGroup)) {
          geojsonFeatGroup.bringToFront();
        }
      });

      layer.bindPopup(layerBindPopupString(feature));
    }
  }

  useEffect(() => {
    setGeojsonFeatGroupWay(geojsonFeatGroupWay.clearLayers());
    setGeojsonFeatGroupWay(highlightFeatureGroup.clearLayers());
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
          selectedCalculationType == calculationTypeEnums.COMPARE &&
          feature.properties.VAYLAT == null // If calculation type is compare and VAYLAT is null crosses are used. VAYLAT null refers that point is routeline while only navigationlines have VAYLAT
        ) {
          if (
            feature.properties.W_channel == null ||
            feature.properties.W_channel_depth == null
          ) {
            return L.marker(latlng, { icon: crossIconGray });
          }
          if (feature.properties.RISK_INDEX_SUM < RIVTrafficLight.green) {
            return L.marker(latlng, { icon: crossIconGreen });
          }
          if (
            feature.properties.RISK_INDEX_SUM >= RIVTrafficLight.green &&
            feature.properties.RISK_INDEX_SUM < RIVTrafficLight.yellow
          ) {
            return L.marker(latlng, { icon: crossIconYellow });
          }
          return L.marker(latlng, { icon: crossIconRed });
        } else {
          if (
            feature.properties.W_channel == null ||
            feature.properties.W_channel_depth == null
          ) {
            return L.circleMarker(latlng, geojsonMarkerOptionsGray);
          }
          if (feature.properties.RISK_INDEX_SUM < RIVTrafficLight.green) {
            return L.circleMarker(latlng, geojsonMarkerOptionsGreen);
          }
          if (
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
// eslint-disable-next-line react/display-name
const MapView = forwardRef((props, refs) => {
  const { RIVResults } = useContext(RIVResultContext);
  const { previousRIVResults } = useContext(PreviousRIVResultsContext);
  const { selectedCalculationType } = useContext(
    SelectedCalculationTypeContext
  );
  const [coords, setCoords] = useState({ lat: 62, lng: 23.5 });
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(coords, 9);
    }
  }, [coords]);

  const invalidateMapSize = () => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  };

  useImperativeHandle(refs, () => {
    return { invalidateMapSize };
  });

  // Checks if the user selected a new routeline when the comparison type is "Routeline"
  const isNewRouteline = () =>
    typeof RIVResults.features !== "undefined" &&
    selectedCalculationType == calculationTypeEnums.ROUTELINE &&
    previousRIVResults?.features?.[0].properties.ROUTELINE !=
      RIVResults.features[0].properties.ROUTELINE;

  // Checks if the user selected a new navigationline when the comparison type is "Navigationline"
  const isNewNavigationline = () =>
    typeof RIVResults.features !== "undefined" &&
    selectedCalculationType == calculationTypeEnums.NAVIGATIONLINE &&
    previousRIVResults?.features?.[0].properties.VAYLAT !=
      RIVResults.features[0].properties.VAYLAT;

  // Checks if the user selected a new navigationline when the comparison type is "Comparison"
  const isNewCompare = () =>
    typeof RIVResults.features !== "undefined" &&
    selectedCalculationType == calculationTypeEnums.COMPARE &&
    previousRIVResults?.features?.[0].properties.VAYLAT !=
      RIVResults.features[0].properties.VAYLAT;

  useEffect(() => {
    // This is true when the user changed the VAYLAT or ROUTELINE to a different value
    // before clicking the submit-button, or clicked it for the first time
    if (isNewRouteline() || isNewNavigationline() || isNewCompare()) {
      setCoords({
        lat: RIVResults.features[0].geometry.coordinates[1],
        lng: RIVResults.features[0].geometry.coordinates[0],
      });
    }
  }, [RIVResults]);

  return (
    <>
      <div className="map-wrapper-empty-space" />
      <div className="map-view-container">
        <div className="map-view-content">
          <MapContainer
            // whenReady={ instance => {mapRef.current = instance} }
            ref={mapRef}
            center={coords}
            zoom={9}
            scrollWheelZoom={true}
          >
            <GeoJSONMarkers />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </div>
      </div>
      <div className="traffic-light-container">
        <div className="traffic-light-content">
          <RIVTrafficLightsComponent />
        </div>
      </div>
    </>
  );
});

export default MapView;
