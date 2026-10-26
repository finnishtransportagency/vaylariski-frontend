import { useRef, useEffect } from 'react';
import { useRisk } from '../../../../contexts/NewRiskContext.tsx';
import { useUserSelection } from '../../../../contexts/NewUserSelectionContext.tsx';

export default function useDiagramTab() {
  const { results, RIVTrafficLight } = useRisk();
  const { selectedRiskPointIndex, selectRiskPointIndex } = useUserSelection();

  const diagramRef = useRef<SVGSVGElement>(null);

  // Runs when a point in the map has been clicked, renders the corresponding
  // tooltip in the diagram
  useEffect(() => {
    // if (diagramRef.current) {
    //   // Get the data point corresponding to the point clicked on the map
    //   const activeItem =
    //     diagramRef.current.state.formattedGraphicalItems?.[0].props.points.find(
    //       (row) => row.payload.point_index === selectedRiskPointIndex
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
    //       activeTooltipIndex: selectedRiskPointIndex,
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
  }, [selectedRiskPointIndex]);

  const maxDataValue = Math.ceil(
    Math.max(...results.map((entry) => entry.RISK_INDEX_SUM)) + 2
  );

  function handleOnClick(data: any) {
    selectRiskPointIndex(data.activePayload[0].payload.point_index);
  }

  return {
    diagramRef,
    results,
    maxDataValue,
    RIVTrafficLight,
    handleOnClick,
  };
}
