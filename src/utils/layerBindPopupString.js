export const layerBindPopupString = (feature) =>
  "<pre>" +
  "GDO_GID: " +
  JSON.stringify(feature.properties.GDO_GID) +
  "\n" +
  "VAYLAT: " +
  JSON.stringify(feature.properties.VAYLAT) +
  "\n" +
  "RIV summa: " +
  JSON.stringify(feature.properties.RISK_INDEX_SUM) +
  "\n" +
  "RIV väylä: " +
  JSON.stringify(feature.properties.RIV_1_channel) +
  "\n" +
  "RIV mutka: " +
  JSON.stringify(feature.properties.RIV_2_bend) +
  "\n" +
  "RIV S-mutka: " +
  JSON.stringify(feature.properties.RIV_3_s_bend) +
  "\n" +
  "RIV liikenne: " +
  JSON.stringify(feature.properties.RIV_4_traffic_complexity) +
  "\n" +
  "RIV heikentynyt näkyvyys: " +
  JSON.stringify(feature.properties.RIV_5_reduced_visibility) +
  "\n" +
  "RIV taustavalon voimakkuus: " +
  JSON.stringify(feature.properties.RIV_6_light_pollution) +
  "\n" +
  "väylän vaikuttavuus: " +
  JSON.stringify(feature.properties.PF_1_channel) +
  "\n" +
  "mutkan vaikuttavuus: " +
  JSON.stringify(feature.properties.PF_2_bend) +
  "\n" +
  "S-mutkan vaikuttavuus: " +
  JSON.stringify(feature.properties.PF_3_s_bend) +
  "\n" +
  "liikenteen vaikuttavuus: " +
  JSON.stringify(feature.properties.PF_4_traffic_complexity) +
  "\n" +
  "heikentyneen näkyvyyden vaikuttavuus: " +
  JSON.stringify(feature.properties.PF_5_reduced_visibility) +
  "\n" +
  "taustavalon vaikuttavuus: " +
  JSON.stringify(feature.properties.PF_6_light_pollution_value) +
  "\n" +
  "väylän leveys [m]: " +
  JSON.stringify(feature.properties.W_channel) +
  "\n" +
  "väylän syvyys [m]: " +
  JSON.stringify(feature.properties.channel_depth_value) +
  "\n" +
  "S-mutka [m]: " +
  JSON.stringify(feature.properties.bend_S_length) +
  "\n" +
  "mutkan suuntakulma [°]: " +
  JSON.stringify(feature.properties.bend_angle) +
  "\n" +
  "mutkan säde [m]: " +
  JSON.stringify(feature.properties.bend_radius) +
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
  "ATN painokerroin: " +
  JSON.stringify(feature.properties.W_atn) +
  "\n" +
  "reunan painokerroin: " +
  JSON.stringify(feature.properties.W_bank_clearance) +
  "\n" +
  "pohjan painokerroin: " +
  JSON.stringify(feature.properties.W_bottom_surface) +
  "\n" +
  "syvyyden painokerroin: " +
  JSON.stringify(feature.properties.W_channel_depth) +
  "\n" +
  "poikkivirtauksen painokerroin: " +
  JSON.stringify(feature.properties.W_cross_current) +
  "\n" +
  "pitkittäisvirtauksen painokerroin: " +
  JSON.stringify(feature.properties.W_longitudinal_current) +
  "\n" +
  "ohjailtavuuden painokerroin: " +
  JSON.stringify(feature.properties.W_manoeuvrability) +
  "\n" +
  "nopeuden painokerroin: " +
  JSON.stringify(feature.properties.W_speed) +
  "\n" +
  "aallon painokerroin: " +
  JSON.stringify(feature.properties.W_wave_height) +
  "\n" +
  "tuulen painokerroin: " +
  JSON.stringify(feature.properties.W_wind) +
  "\n" +
  "indeksi: " +
  JSON.stringify(feature.properties.point_index) +
  "\n" +
  "</pre>";
