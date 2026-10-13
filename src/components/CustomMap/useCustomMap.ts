import { useState, useRef, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import {
  FeatureGroup,
  Layer,
  circleMarker,
  GeoJSON,
  LatLngExpression,
  LatLng,
} from 'leaflet';
import { CSSColorCode } from '../../types/CSSColorCode.ts';
import { useChannel } from '../../contexts/NewChannelContext.tsx';
import { layerBindPopupString } from './layerBindPopupString.ts';
import { RivResultProperties } from '../../types/RivResultProperties.ts';
import { useRisk } from '../../contexts/NewRiskContext.tsx';
import { useUserSelection } from '../../contexts/NewUserSelectionContext.tsx';
import { RivFeature } from '../../types/RivResult.ts';
import { WayareaResultProperties } from '../../types/WayareaResultProperties.ts';

const geojsonMarkerOptionsGreen = {
  radius: 4,
  fillColor: CSSColorCode.GREEN_100,
  color: CSSColorCode.GREEN_100,
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const geojsonMarkerOptionsYellow = {
  radius: 4,
  fillColor: CSSColorCode.YELLOW_100,
  color: CSSColorCode.YELLOW_100,
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const geojsonMarkerOptionsRed = {
  radius: 4,
  fillColor: CSSColorCode.RED_100,
  color: CSSColorCode.RED_100,
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const geojsonMarkerOptionsGray = {
  radius: 4,
  fillColor: '#83888a',
  color: '#83888a',
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const highlighMapPoint = {
  radius: 8,
  color: 'black',
  weight: 1,
  opacity: 1,
  fillOpacity: 0,
};

export default function useMapView() {
  const { RIVResult, RIVTrafficLight, previousRIVResult } = useRisk();
  const {
    diagramPointClicked,
    setDiagramPointClicked,
    tableRowClicked,
    setTableRowClicked,
    setMapPointClicked,
    selectedRowId: selectedRowIndex,
    setSelectedRowId,
  } = useUserSelection();
  const { channelArea: wayareaPolygons } = useChannel();

  const map = useMap();
  const [coords, setCoords] = useState<LatLngExpression>({
    lat: 62,
    lng: 23.5,
  });
  const [geojsonFeatGroup, setGeojsonFeatGroup] = useState<
    FeatureGroup<RivResultProperties>
  >(new FeatureGroup());
  const [geojsonFeatGroupWay, setGeojsonFeatGroupWay] = useState<
    FeatureGroup<WayareaResultProperties>
  >(new FeatureGroup());
  const [highlightFeatureGroup] = useState<FeatureGroup>(new FeatureGroup());

  function onEachFeature(feature: RivFeature, layer: Layer) {
    // If feature has properties, parse them and bind them to the layer
    if (feature.properties) {
      layer.on('click', () => {
        setMapPointClicked(true);
        setSelectedRowId(`${feature.properties.point_index}`);

        // Clear the existing highlight feature group
        highlightFeatureGroup.clearLayers();

        // Add a new circle marker to the highlight feature group
        // @ts-ignore
        const highlight = circleMarker(layer.getLatLng(), highlighMapPoint);
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

  function pointToLayer(feature: RivFeature, latlng: LatLng) {
    // Initial traffic lights for risk value
    if (
      feature.properties.W_channel == null ||
      feature.properties.W_channel_depth == null
    ) {
      return circleMarker(latlng, geojsonMarkerOptionsGray);
    }
    if (feature.properties.RISK_INDEX_SUM < RIVTrafficLight.green) {
      return circleMarker(latlng, geojsonMarkerOptionsGreen);
    }
    if (
      feature.properties.RISK_INDEX_SUM >= RIVTrafficLight.green &&
      feature.properties.RISK_INDEX_SUM < RIVTrafficLight.yellow
    ) {
      return circleMarker(latlng, geojsonMarkerOptionsYellow);
    }
    return circleMarker(latlng, geojsonMarkerOptionsRed);
  }

  // Helper function to render a tooltip to the map for the selectedRowIndex, as well as adding a highlight to the point
  function pointSelectedFromTableOrDiagram() {
    let chosenLayer;
    // TODO: Optimise this, and check how this can be implemented
    // without having to use ts-ignore
    geojsonFeatGroup.eachLayer((layer: Layer) => {
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

      // Remove the highlight circle marker from the map, and add it to the newly selected layer
      highlightFeatureGroup.clearLayers();

      // @ts-ignore
      const highlight = circleMarker(chosenLayer.getLatLng(), highlighMapPoint);

      highlightFeatureGroup.addLayer(highlight);

      // Add the highlight feature group to the map
      highlightFeatureGroup.addTo(map);

      // Original cirle markers to front so the bind popup works in re-clicking
      if (map.hasLayer(geojsonFeatGroup)) {
        geojsonFeatGroup.bringToFront();
      }
    }
  }

  useEffect(() => {
    setGeojsonFeatGroupWay(geojsonFeatGroupWay.clearLayers());
    setGeojsonFeatGroupWay(highlightFeatureGroup.clearLayers());
    const w_layers = new GeoJSON<WayareaResultProperties>(wayareaPolygons, {
      pointToLayer: (_, latlng: LatLng) =>
        circleMarker(latlng, geojsonMarkerOptionsGray),
    });
    setGeojsonFeatGroupWay(w_layers.addTo(geojsonFeatGroupWay));
    geojsonFeatGroupWay.addTo(map);
  }, [wayareaPolygons]);

  useEffect(() => {
    setGeojsonFeatGroup(geojsonFeatGroup.clearLayers());
    const layers = new GeoJSON<RivResultProperties>(RIVResult, {
      onEachFeature,
      pointToLayer,
    });
    setGeojsonFeatGroup(layers.addTo(geojsonFeatGroup));

    geojsonFeatGroup.addTo(map);
  }, [RIVResult, RIVTrafficLight]);

  // Runs when a row in the RIV table or a point in the RIV diagram has been clicked,
  // renders the correct tooltip on the map
  useEffect(() => {
    if (tableRowClicked) {
      setTableRowClicked(false);
      pointSelectedFromTableOrDiagram();
    } else if (diagramPointClicked) {
      setDiagramPointClicked(false);
      pointSelectedFromTableOrDiagram();
    }
  }, [selectedRowIndex]);

  useEffect(() => {
    map?.setView(coords, 9);
  }, [coords]);

  useEffect(() => {
    // This is true when the user changed the VAYLAT or ROUTELINE to a different value
    // before clicking the submit-button, or clicked it for the first time
    // Checks if the user selected a new navigationline when the comparison type is "Navigationline"
    if (
      typeof RIVResult?.features !== 'undefined' &&
      previousRIVResult?.features?.[0].properties.VAYLAT !=
        RIVResult.features[0].properties.VAYLAT
    ) {
      setCoords({
        lat: RIVResult.features[0].geometry.coordinates[1],
        lng: RIVResult.features[0].geometry.coordinates[0],
      });
    }
  }, [RIVResult]);

  return { center: coords };
}
