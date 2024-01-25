export const generateOwnHr = (title) =>
  "<div style='display: flex; align-items: center; justify-content: center;'>" +
  "<hr style='flex-grow: 1; margin: 0.5 0.5px;'>" +
  "<span style='padding: 1px;'>" +
  title +
  "</span>" +
  "<hr style='flex-grow: 1; margin: 0.5 0.5px;'>" +
  "</div>";
export const layerBindPopupString = (feature) =>
  "<pre>" +
  // ID:t
  "Indeksi: " +
  JSON.stringify(feature.properties.point_index) +
  "\n" +
  "GDO_GID: " +
  JSON.stringify(feature.properties.GDO_GID) +
  "\n" +
  "VAYLAT: " +
  JSON.stringify(feature.properties.VAYLAT) +
  // Riskiarvot
  generateOwnHr("Riskiarvot".bold()) +
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
  // Toistuvuus
  generateOwnHr("Toistuvuustekijät (PF)").bold() +
  "Väylän toistuvuus: " +
  JSON.stringify(feature.properties.PF_1_channel) +
  "\n" +
  "Mutkan toistuvuus: " +
  JSON.stringify(feature.properties.PF_2_bend) +
  "\n" +
  "S-mutkan toistuvuus: " +
  JSON.stringify(feature.properties.PF_3_s_bend) +
  "\n" +
  "Liikenteen toistuvuus: " +
  JSON.stringify(feature.properties.PF_4_traffic_complexity) +
  "\n" +
  "Heikentyneen näkyvyyden toistuvuus: " +
  JSON.stringify(feature.properties.PF_5_reduced_visibility) +
  "\n" +
  "Taustavalon toistuvuus: " +
  JSON.stringify(feature.properties.PF_6_light_pollution_value) +
  // Vaikuttavuus
  generateOwnHr("Vaikuttavuustekijät (W)").bold() +
  "Aallon korkeuden vaikuttavuus: " +
  JSON.stringify(feature.properties.W_wave_height) +
  "\n" +
  "ATN vaikuttavuus: " +
  JSON.stringify(feature.properties.W_atn) +
  "\n" +
  "Nopeuden vaikuttavuus: " +
  JSON.stringify(feature.properties.W_speed) +
  "\n" +
  "Ohjailtavuuden vaikuttavuus: " +
  JSON.stringify(feature.properties.W_manoeuvrability) +
  "\n" +
  "Pitkittäisvirtauksen vaikuttavuus: " +
  JSON.stringify(feature.properties.W_longitudinal_current) +
  "\n" +
  "Pohjan vaikuttavuus: " +
  JSON.stringify(feature.properties.W_bottom_surface) +
  "\n" +
  "Poikkivirtauksen vaikuttavuus: " +
  JSON.stringify(feature.properties.W_cross_current) +
  "\n" +
  "Reunan vaikuttavuus: " +
  JSON.stringify(feature.properties.W_bank_clearance) +
  "\n" +
  "Syvyyden vaikuttavuus: " +
  JSON.stringify(feature.properties.W_channel_depth) +
  "\n" +
  "Tuulen vaikuttavuus: " +
  JSON.stringify(feature.properties.W_wind) +
  "\n" +
  // Väylän tiedot
  generateOwnHr("Väylän ominaisuudet").bold() +
  "Väylän leveys [m]: " +
  JSON.stringify(feature.properties.W_channel) +
  "\n" +
  "Väylän syvyys [m]: " +
  JSON.stringify(feature.properties.channel_depth_value) +
  "\n" +
  "S-mutka [m]: " +
  JSON.stringify(feature.properties.bend_S_length) +
  "\n" +
  "Mutkan suuntakulma [°]: " +
  JSON.stringify(feature.properties.bend_angle) +
  "\n" +
  "Mutkan säde [m]: " +
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
  "</pre>";
