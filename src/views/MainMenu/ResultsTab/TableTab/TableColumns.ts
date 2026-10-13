import { ColumnType } from '../../../../components/CustomSelectionBox/CustomSelectionBox.tsx';
import { ResultRow } from '../../../../types/ResultRow.ts';

export const TableColumns: ColumnType[] = [
  // ID:t
  {
    key: ResultRow.POINT_INDEX,
    name: 'Indeksi',
    isDefault: true,
  },
  {
    key: ResultRow.GDO_GID,
    name: 'GDO_GID',
    isDefault: true,
  },
  {
    key: ResultRow.VAYLAT,
    name: 'VAYLAT',
    isDefault: true,
  },
  // Riskiarvot
  {
    key: ResultRow.RISK_INDEX_SUM,
    name: 'RIV summa',
    isDefault: true,
  },
  {
    key: ResultRow.RIV_1_CHANNEL,
    name: 'RIV väylä',
    isDefault: false,
  },
  {
    key: ResultRow.RIV_2_BEND,
    name: 'RIV mutka',
    isDefault: false,
  },
  {
    key: ResultRow.RIV_3_S_BEND,
    name: 'RIV S-mutka',
    isDefault: false,
  },
  {
    key: ResultRow.RIV_3_U_BEND,
    name: 'RIV U-mutka',
    isDefault: false,
  },
  {
    key: ResultRow.RIV_4_TRAFFIC_COMPLEXITY,
    name: 'RIV liikenne',
    isDefault: false,
  },
  {
    key: ResultRow.RIV_5_REDUCED_VISIBILITY,
    name: 'RIV heikentynyt näkyvyys',
    isDefault: false,
  },
  {
    key: ResultRow.RIV_6_LIGHT_POLLUTION,
    name: 'RIV taustavalon voimakkuus',
    isDefault: false,
  },
  // Toistuvuus
  {
    key: ResultRow.PF_1_CHANNEL,
    name: 'Väylän toistuvuus',
    isDefault: false,
  },
  {
    key: ResultRow.PF_2_BEND,
    name: 'Mutkan toistuvuus',
    isDefault: false,
  },
  {
    key: ResultRow.PF_3_S_BEND,
    name: 'S-mutkan toistuvuus',
    isDefault: false,
  },
  {
    key: ResultRow.PF_3_U_BEND,
    name: 'U-mutkan toistuvuus',
    isDefault: false,
  },
  {
    key: ResultRow.PF_4_TRAFFIC_COMPLEXITY,
    name: 'Liikenteen toistuvuus',
    isDefault: false,
  },
  {
    key: ResultRow.PF_5_REDUCED_VISIBILITY,
    name: 'Heikentyneen näkyvyyden toistuvuus',
    isDefault: false,
  },
  {
    key: ResultRow.PF_6_LIGHT_POLLUTION_VALUE,
    name: 'Taustavalon toistuvuus',
    isDefault: false,
  },
  // Vaikuttavuus
  {
    key: ResultRow.W_WAVE_HEIGHT,
    name: 'Aallon korkeuden vaikuttavuus',
    isDefault: false,
  },
  {
    key: ResultRow.W_ATN,
    name: 'ATN vaikuttavuus',
    isDefault: false,
  },
  {
    key: ResultRow.W_SPEED,
    name: 'Nopeuden vaikuttavuus',
    isDefault: false,
  },
  {
    key: ResultRow.W_MANOEUVRABILITY,
    name: 'Ohjailtavuuden vaikuttavuus',
    isDefault: false,
  },
  {
    key: ResultRow.W_LONGITUDINAL_CURRENT,
    name: 'Pitkittäisvirtauksen vaikuttavuus',
    isDefault: false,
  },
  {
    key: ResultRow.W_BOTTOM_SURFACE,
    name: 'Pohjan vaikuttavuus',
    isDefault: false,
  },
  {
    key: ResultRow.W_CROSS_CURRENT,
    name: 'Poikkivirtauksen vaikuttavuus',
    isDefault: false,
  },
  {
    key: ResultRow.W_BANK_CLEARANCE,
    name: 'Reunan vaikuttavuus',
    isDefault: false,
  },
  {
    key: ResultRow.W_CHANNEL_DEPTH,
    name: 'Syvyyden vaikuttavuus',
    isDefault: false,
  },
  {
    key: ResultRow.W_WIND,
    name: 'Tuulen vaikuttavuus',
    isDefault: false,
  },
  // Väylän tiedot
  {
    key: ResultRow.W_CHANNEL,
    name: 'Väylän leveys [m]',
    isDefault: false,
  },
  {
    key: ResultRow.CHANNEL_DEPTH_VALUE,
    name: 'Väylän syvyys [m]',
    isDefault: false,
  },
  {
    key: ResultRow.BEND_S_LENGTH,
    name: 'S-mutka [m]',
    isDefault: false,
  },
  {
    key: ResultRow.BEND_U_LENGTH,
    name: 'U-mutka [m]',
    isDefault: false,
  },
  {
    key: ResultRow.BEND_ANGLE,
    name: 'Mutkan suuntakulma [°]',
    isDefault: false,
  },
  {
    key: ResultRow.BEND_RADIUS,
    name: 'Mutkan säde [m]',
    isDefault: false,
  },
  {
    key: ResultRow.PF_BEND_1,
    name: 'PF_bend1',
    isDefault: false,
  },
  {
    key: ResultRow.PF_BEND_2,
    name: 'PF_bend2',
    isDefault: false,
  },
  {
    key: ResultRow.BSI,
    name: 'BSI',
    isDefault: false,
  },
  {
    key: ResultRow.MID_POINT,
    name: 'Koordinaatit',
    isDefault: false,
  },
  // Syöteparametrit
  {
    key: ResultRow.WAVE_HEIGHT_CATEGORY,
    name: 'Aallon korkeus',
    isDefault: false,
  },
  {
    key: ResultRow.AIDS_TO_NAVIGATION_CATEGORY,
    name: 'ATN',
    isDefault: false,
  },
  {
    key: ResultRow.VESSEL_SPEED_CATEGORY,
    name: 'Aluksen nopeusluokka',
    isDefault: false,
  },
  {
    key: ResultRow.NUMBER_OF_LANES,
    name: 'Kaistat',
    isDefault: false,
  },
  {
    key: ResultRow.PF_TRAFFIC_COMPLEXITY,
    name: 'Liikenteen monimutkaisuus',
    isDefault: false,
  },
  {
    key: ResultRow.PF_TRAFFIC_VALUE,
    name: 'Liikenteen monimutkaisuuden kerroin',
    isDefault: false,
  },
  {
    key: ResultRow.PF_TRAFFIC_VOLUME,
    name: 'Liikenteen määrä',
    isDefault: false,
  },
  {
    key: ResultRow.VISIBILITY,
    name: 'Näkyvyys [m]',
    isDefault: false,
  },

  {
    key: ResultRow.LONGITUDINAL_CURRENT_CATEGORY,
    name: 'Pitkittäisvirtaus',
    isDefault: false,
  },
  {
    key: ResultRow.BOTTOM_SURFACE_CATEGORY,
    name: 'Pohja',
    isDefault: false,
  },
  {
    key: ResultRow.CROSS_CURRENT_CATEGORY,
    name: 'Poikkivirtaus',
    isDefault: false,
  },
  {
    key: ResultRow.CHANNEL_EDGE_TYPE,
    name: 'Reunan tyyppi',
    isDefault: false,
  },
  {
    key: ResultRow.PF_6_LIGHT_POLLUTION,
    name: 'Taustavalon voimakkuus',
    isDefault: false,
  },
  {
    key: ResultRow.WIND_SPEED_CATEGORY,
    name: 'Tuulen nopeusluokka',
    isDefault: false,
  },
  {
    key: ResultRow.CHANNEL_TYPE,
    name: 'Väylän tyyppi',
    isDefault: false,
  },
];
