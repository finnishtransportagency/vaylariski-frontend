import RIVResultContext from "contexts/RIVResult";
import RIVTrafficLightContext from "contexts/RIVTrafficLightContext";
import { useContext, useState, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";
import SelectedIndexContext from "contexts/SelectedIndexContext";
import DiagramPointClickedContext from "contexts/DiagramPointClickedContext";
import MapPointClickedContext from "contexts/MapPointClickedContext";

const CustomTooltipRender = (props) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    // This is built to match how the structure and styling works for a
    // recharts default tooltip
    return (
      <div className="recharts-default-tooltip recharts-default-tooltip-style">
        <p className="recharts-tooltip-label recharts-tooltip-label-style">
          RISK_INDEX_SUM: {payload[0].value}
        </p>
        <ul className="recharts-tooltip-item-list recharts-tooltip-item-list-style">
          <li className="recharts-tooltip-item recharts-tooltip-item-style">
            <span className="recharts-tooltip-item-name">GDO_GID</span>
            <span className="recharts-tooltip-item-separator">: </span>
            <span className="recharts-tooltip-item-value">
              {payload[0].payload.GDO_GID}
            </span>
            <span className="recharts-tooltip-item-unit" />
          </li>
          <li className="recharts-tooltip-item recharts-tooltip-item-style">
            <span className="recharts-tooltip-item-name">Point_index</span>
            <span className="recharts-tooltip-item-separator">: </span>
            <span className="recharts-tooltip-item-value">
              {payload[0].payload.point_index}
            </span>
            <span className="recharts-tooltip-item-unit" />
          </li>
        </ul>
      </div>
    );
  }

  return null;
};

export default function DisplayRIVResultsDiagramView(props) {
  const { tabValue, tabIndex, ...other } = props;

  const { RIVResults } = useContext(RIVResultContext);
  const [displayRowResults, setDisplayRowResults] = useState([]);
  const { RIVTrafficLight } = useContext(RIVTrafficLightContext);
  const { selectedRowIndex, setSelectedRowIndex } =
    useContext(SelectedIndexContext);
  const { mapPointClicked, setMapPointClicked } = useContext(
    MapPointClickedContext
  );
  const { setDiagramPointClicked } = useContext(DiagramPointClickedContext);
  const diagramRef = useRef(null);

  useEffect(() => {
    // If a point on the map was clicked, and the diagram is rendered
    if (mapPointClicked && diagramRef.current) {
      setMapPointClicked(false);

      // Get the data point corresponding to the point clicked on the map
      const activeItem =
        diagramRef.current.state.formattedGraphicalItems?.[0].props.points[
          selectedRowIndex
        ];

      if (!activeItem) {
        console.error(
          "Error when clicking map and trying to toggle tooltip in the RIV Diagram, check the chart state!",
          diagramRef.current.state
        );
        return;
      }

      // Set the corresponding point to the diagrams state to get the correct tooltip displayed
      diagramRef.current.setState(
        {
          isTooltipActive: true,
          activeTooltipIndex: selectedRowIndex,
        },
        () => {
          diagramRef.current.handleItemMouseEnter({
            tooltipPayload: [activeItem],
            tooltipPosition: {
              x: activeItem.x,
              y: activeItem.y,
            },
          });
        }
      );
    }
  }, [selectedRowIndex]);

  useEffect(() => {
    setDisplayRowResults([]);
    if (RIVResults.length === 0) return;

    let rowResults = [];
    RIVResults.features.map((el) => {
      rowResults.push(el.properties);
    });
    setDisplayRowResults(rowResults);
  }, [RIVResults]);

  const handleOnClick = (data) => {
    setDiagramPointClicked(true); // This triggers a useEffect in MapView to render the correct tooltip on the map
    setSelectedRowIndex(data.activePayload[0].payload.point_index);
  };

  return (
    <div
      role="TabPanelComponent"
      hidden={tabValue !== tabIndex}
      id={`simple-tabpanel-${tabIndex}`}
      aria-labelledby={`simple-tab-${tabIndex}`}
      {...other}
    >
      {tabValue === tabIndex && (
        <ResponsiveContainer width="75%" height={500}>
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
            <XAxis dataKey="GDO_GID" angle={-45} textAnchor={"end"} />
            <YAxis />
            <Tooltip trigger="click" content={<CustomTooltipRender />} />
            <ReferenceArea
              y1={0}
              y2={RIVTrafficLight.green}
              label="Green"
              stroke="Green"
              fill="green"
              fillOpacity={0.1}
            />
            <ReferenceArea
              y1={RIVTrafficLight.green}
              y2={RIVTrafficLight.yellow}
              label="Yellow"
              stroke="yellow"
              fill="yellow"
              fillOpacity={0.1}
            />
            <ReferenceArea
              y1={RIVTrafficLight.yellow}
              y2={RIVTrafficLight.red}
              label="Red"
              stroke="red"
              fill="red"
              fillOpacity={0.1}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
