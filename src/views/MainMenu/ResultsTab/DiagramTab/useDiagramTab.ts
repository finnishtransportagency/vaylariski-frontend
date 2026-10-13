import { useState, useRef } from 'react';
import { useRisk } from '../../../../contexts/NewRiskContext.tsx';
import { useUserSelection } from '../../../../contexts/NewUserSelectionContext.tsx';
import { RivResultProperties } from '../../../../types/RivResultProperties.ts';

export default function useDiagramTab() {
  const { RIVResult, RIVTrafficLight } = useRisk();
  const {
    selectedRowId: selectedRowIndex,
    setSelectedRowId: setSelectedRowIndex,
    mapPointClicked,
    setMapPointClicked,
    setDiagramPointClicked,
  } = useUserSelection();

  const [displayRowResults, setDisplayRowResults] = useState<
    RivResultProperties[]
  >([]);
  const diagramRef = useRef(null);

  function updateRIVResults() {
    setDisplayRowResults([]);
    if (RIVResult?.features.length === 0) return;

    let rowResults: RivResultProperties[] = [];
    RIVResult?.features.map((el) => {
      rowResults.push(el.properties);
    });
    setDisplayRowResults(rowResults);
  }

  // Runs when a point in the map has been clicked, renders the corresponding
  // tooltip in the diagram
  function updatePointClicked() {
    // if (mapPointClicked && diagramRef.current) {
    //   setMapPointClicked(false);
    //   // Get the data point corresponding to the point clicked on the map
    //   const activeItem =
    //     diagramRef.current.state.formattedGraphicalItems?.[0].props.points.find(
    //       (row) => row.payload.point_index === selectedRowIndex
    //     );
    //   if (!activeItem) {
    //     console.error(
    //       'Error when clicking map and trying to toggle tooltip in the RIV Diagram, check the chart state!',
    //       diagramRef.current.state
    //     );
    //     return;
    //   }
    //   // Set the corresponding point to the diagrams state to get the correct tooltip displayed
    //   diagramRef.current.setState(
    //     {
    //       isTooltipActive: true,
    //       activeTooltipIndex: selectedRowIndex,
    //     },
    //     () => {
    //       diagramRef.current.handleItemMouseEnter({
    //         tooltipPayload: [activeItem],
    //         tooltipPosition: {
    //           x: activeItem.x,
    //           y: activeItem.y,
    //         },
    //       });
    //     }
    //   );
    // }
  }

  function handleOnClick(data: any) {
    setDiagramPointClicked(true); // This triggers a useEffect in MapView to render the correct tooltip on the map
    setSelectedRowIndex(data.activePayload[0].payload.point_index);
  }

  const maxDataValue = Math.ceil(
    Math.max(...displayRowResults.map((entry) => entry.RISK_INDEX_SUM)) + 2
  );

  return {
    RIVTrafficLight,
    RIVResults: RIVResult,
    selectedRowIndex,
    maxDataValue,
    displayRowResults,
    diagramRef,
    handleOnClick,
    updateRIVResults,
    updatePointClicked,
  };
}
