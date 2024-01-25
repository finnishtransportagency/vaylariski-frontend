import { resultRowsEnums } from "./enums";

export const TableViewColumns = [
  // ID:t
  {
    key: resultRowsEnums.POINT_INDEX,
    name: "Indeksi",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.GDO_GID,
    name: "GDO_GID",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.VAYLAT,
    name: "VAYLAT",
    resizable: true,
    sortable: true,
  },
  // Riskiarvot
  {
    key: resultRowsEnums.RISK_INDEX_SUM,
    name: "RIV summa",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.RIV_1_CHANNEL,
    name: "RIV väylä",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.RIV_2_BEND,
    name: "RIV mutka",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.RIV_3_S_BEND,
    name: "RIV S-mutka",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.RIV_4_TRAFFIC_COMPLEXITY,
    name: "RIV liikenne",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.RIV_5_REDUCED_VISIBILITY,
    name: "RIV heikentynyt näkyvyys",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.RIV_6_LIGHT_POLLUTION,
    name: "RIV taustavalon voimakkuus",
    resizable: true,
    sortable: true,
  },
  // Toistuvuus
  {
    key: resultRowsEnums.PF_1_CHANNEL,
    name: "Väylän toistuvuus",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.PF_2_BEND,
    name: "Mutkan toistuvuus",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.PF_3_S_BEND,
    name: "S-mutkan toistuvuus",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.PF_4_TRAFFIC_COMPLEXITY,
    name: "Liikenteen toistuvuus",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.PF_5_REDUCED_VISIBILITY,
    name: "Heikentyneen näkyvyyden toistuvuus",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.PF_6_LIGHT_POLLUTION_VALUE,
    name: "Taustavalon toistuvuus",
    resizable: true,
    sortable: true,
  },
  // Vaikuttavuus
  {
    key: resultRowsEnums.W_WAVE_HEIGHT,
    name: "Aallon korkeuden vaikuttavuus",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.W_ATN,
    name: "ATN vaikuttavuus",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.W_SPEED,
    name: "Nopeuden vaikuttavuus",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.W_MANOEUVRABILITY,
    name: "Ohjailtavuuden vaikuttavuus",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.W_LONGITUDINAL_CURRENT,
    name: "Pitkittäisvirtauksen vaikuttavuus",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.W_BOTTOM_SURFACE,
    name: "Pohjan vaikuttavuus",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.W_CROSS_CURRENT,
    name: "Poikkivirtauksen vaikuttavuus",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.W_BANK_CLEARANCE,
    name: "Reunan vaikuttavuus",
    resizable: true,
    sortable: true,
  },

  {
    key: resultRowsEnums.W_CHANNEL_DEPTH,
    name: "Syvyyden vaikuttavuus",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.W_WIND,
    name: "Tuulen vaikuttavuus",
    resizable: true,
    sortable: true,
  },
  // Väylän tiedot
  {
    key: resultRowsEnums.W_CHANNEL,
    name: "Väylän leveys [m]",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.CHANNEL_DEPTH_VALUE,
    name: "Väylän syvyys [m]",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.BEND_S_LENGTH,
    name: "S-mutka [m]",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.BEND_ANGLE,
    name: "Mutkan suuntakulma [°]",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.BEND_RADIUS,
    name: "Mutkan säde [m]",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.PF_BEND_1,
    name: "PF_bend1",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.PF_BEND_2,
    name: "PF_bend2",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.BSI,
    name: "BSI",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.MID_POINT,
    name: "Koordinaatit",
    resizable: true,
    sortable: true,
  },
  // Syöteparametrit
  {
    key: resultRowsEnums.WAVE_HEIGHT_CATEGORY,
    name: "Aallon korkeus",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.AIDS_TO_NAVIGATION_CATEGORY,
    name: "ATN",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.VESSEL_SPEED_CATEGORY,
    name: "Aluksen nopeusluokka",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.NUMBER_OF_LANES,
    name: "Kaistat",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.PF_TRAFFIC_COMPLEXITY,
    name: "Liikenteen monimutkaisuus",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.PF_TRAFFIC_VALUE,
    name: "Liikenteen monimutkaisuuden kerroin",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.PF_TRAFFIC_VOLUME,
    name: "Liikenteen määrä",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.VISIBILITY,
    name: "Näkyvyys [m]",
    resizable: true,
    sortable: true,
  },

  {
    key: resultRowsEnums.LONGITUDINAL_CURRENT_CATEGORY,
    name: "Pitkittäisvirtaus",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.BOTTOM_SURFACE_CATEGORY,
    name: "Pohja",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.CROSS_CURRENT_CATEGORY,
    name: "Poikkivirtaus",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.CHANNEL_EDGE_TYPE,
    name: "Reunan tyyppi",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.PF_6_LIGHT_POLLUTION,
    name: "Taustavalon voimakkuus",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.WIND_SPEED_CATEGORY,
    name: "Tuulen nopeusluokka",
    resizable: true,
    sortable: true,
  },
  {
    key: resultRowsEnums.CHANNEL_TYPE,
    name: "Väylän tyyppi",
    resizable: true,
    sortable: true,
  },
];

export const defaultTableViewColumns = [
  resultRowsEnums.POINT_INDEX,
  resultRowsEnums.GDO_GID,
  resultRowsEnums.VAYLAT,
  resultRowsEnums.RISK_INDEX_SUM,
];
