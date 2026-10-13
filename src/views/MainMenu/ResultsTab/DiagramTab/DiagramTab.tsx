import { useEffect } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
} from 'recharts';

import TooltipRender from './TooltipRender.tsx';
import useDiagramTab from './useDiagramTab.ts';

export default function DiagramTab() {
  const {
    RIVTrafficLight,
    RIVResults,
    selectedRowIndex,
    maxDataValue,
    displayRowResults,
    diagramRef,
    handleOnClick,
    updateRIVResults,
    updatePointClicked,
  } = useDiagramTab();

  useEffect(() => {
    updateRIVResults();
  }, [RIVResults]);

  // Runs when a point in the map has been clicked, renders the corresponding
  // tooltip in the diagram
  useEffect(() => {
    updatePointClicked();
  }, [selectedRowIndex]);

  return (
    <div className="riv-tab-container">
      <div className="riv-tab-content">
        <div
          role="TabPanelComponent"
          id={`simple-tabpanel-1`}
          aria-labelledby={`simple-tab-1`}
          className="riv-diagram-tab-component"
        >
          <ResponsiveContainer width="100%" height="95%">
            <LineChart
              data={displayRowResults}
              height={400}
              margin={{
                bottom: 40,
              }}
              onClick={handleOnClick}
              ref={diagramRef}
            >
              <Line type="monotone" dataKey="RISK_INDEX_SUM" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
              <XAxis dataKey="GDO_GID" angle={-45} textAnchor={'end'} />
              <YAxis domain={[0, maxDataValue]} />
              <Tooltip
                trigger="click"
                content={<TooltipRender active={false} payload={[]} />}
              />
              <ReferenceArea
                y1={0}
                y2={Math.min(maxDataValue, RIVTrafficLight.green)}
                stroke="Green"
                fill="green"
                fillOpacity={0.1}
              />
              <ReferenceArea
                y1={RIVTrafficLight.green}
                y2={Math.min(maxDataValue, RIVTrafficLight.yellow)}
                stroke="yellow"
                fill="yellow"
                fillOpacity={0.1}
              />
              <ReferenceArea
                y1={RIVTrafficLight.yellow}
                y2={RIVTrafficLight.red}
                stroke="red"
                fill="red"
                fillOpacity={0.1}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
