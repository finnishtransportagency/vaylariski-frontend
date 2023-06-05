export const layerBindPopupString = (feature) =>
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
  "</pre>";
