import RIVResultContext from "contexts/RIVResult";
import { useContext, useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

export default function DisplayRIVResultsDiagramView(params) {
  const { RIVResults, setRIVResults } = useContext(RIVResultContext);
  const [displayRowResults, setDisplayRowResults] = useState([]);

  useEffect(() => {
    setDisplayRowResults([]);
    if (RIVResults.length === 0) return;

    let rowResults = [];
    RIVResults.features.map((el) => {
      rowResults.push(el.properties);
    });
    setDisplayRowResults(rowResults);
  }, [RIVResults]);

  useEffect(() => {
    console.log(displayRowResults);
  }, [displayRowResults]);

  // GDO_GID: 72990,
  // PF_1_channel: null,
  // PF_2_bend: 4,
  // PF_3_s_bend: 0
  // PF_4_traffic_complexity: 1.2
  // PF_5_reduced_visibility: 2
  // PF_6_light_pollution: "negligible"
  // PF_6_light_pollution_value: 0
  // PF_traffic_complexity: "low"
  // PF_traffic_value: 1
  // PF_traffic_volume: "low"
  // RISK_INDEX_SUM: 26.8
  // RIV_1_channel: null
  // RIV_2_bend: 16
  // RIV_3_s_bend: 0
  // RIV_4_traffic_complexity: 4.8
  // RIV_5_reduced_visibility: 6
  // RIV_6_light_pollution: 0
  // VAYLAT: 100
  // W_atn: 0
  // W_bank_clearance: 3
  // W_bottom_surface: 3
  // W_channel: null
  // W_channel_depth: 6
  // W_cross_current: 0
  // W_longitudinal_current: 0
  // W_manoeuvrability: 45
  // W_speed: 0
  // W_wave_height: 0
  // W_wind: 12
  // aids_to_navigation_category: "excellent"
  // bend_S_length: "inf"
  // bend_angle: 57.6176763300896
  // bend_radius: 900
  // bottom_surface_category: "smooth_and_soft"
  // channel_depth_value: 12
  // channel_edge_type: "gentle_slope"
  // channel_type: "outer"
  // cross_current_category: "negligible"
  // longitudinal_current_category: "negligible"
  // number_of_lanes: 2
  // point_index: 0
  // vessel_speed_category: "moderate"
  // visibility: 1852
  // wave_height_category: "low"
  // wind_speed_category: "moderate"

  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 500, pv: 2400, amt: 2400 },
    { name: "Page C", uv: 50, pv: 2400, amt: 2400 },
    { name: "Page D", uv: 67, pv: 2400, amt: 2400 },
    { name: "Page A", uv: 900, pv: 2400, amt: 2400 },
    { name: "Page A", uv: 48, pv: 2400, amt: 2400 },
  ];
  return (
    <>
      <LineChart width={800} height={400} data={displayRowResults}>
        <Line type="monotone" dataKey="RISK_INDEX_SUM" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </>
  );
}
