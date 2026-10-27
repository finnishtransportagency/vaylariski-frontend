import { FilteredColumnData } from '../../../../components/CustomFilteredTable/CustomFilteredTable.tsx';
import { RivResultProperty } from '../../../../types/RivResultProperty.ts';

export const TableColumns: FilteredColumnData<RivResultProperty>[] = [
  // ID:t
  {
    key: RivResultProperty.point_index,
    name: 'Indeksi',
    isDefault: true,
  },
  {
    key: RivResultProperty.GDO_GID,
    name: 'GDO_GID',
    isDefault: false,
  },
  {
    key: RivResultProperty.VAYLAT,
    name: 'VAYLAT',
    isDefault: false,
  },
  // Riskiarvot
  {
    key: RivResultProperty.RISK_INDEX_SUM,
    name: 'RIV summa',
    isDefault: true,
  },
  {
    key: RivResultProperty.RIV_1_channel,
    name: 'RIV väylä',
    isDefault: false,
  },
  {
    key: RivResultProperty.RIV_2_bend,
    name: 'RIV mutka',
    isDefault: false,
  },
  {
    key: RivResultProperty.RIV_3_s_bend,
    name: 'RIV S-mutka',
    isDefault: false,
  },
  {
    key: RivResultProperty.RIV_3_u_bend,
    name: 'RIV U-mutka',
    isDefault: false,
  },
  {
    key: RivResultProperty.RIV_4_traffic_complexity,
    name: 'RIV liikenne',
    isDefault: false,
  },
  {
    key: RivResultProperty.RIV_5_reduced_visibility,
    name: 'RIV heikentynyt näkyvyys',
    isDefault: false,
  },
  {
    key: RivResultProperty.RIV_6_light_pollution,
    name: 'RIV taustavalon voimakkuus',
    isDefault: false,
  },
  // toistuvuus
  {
    key: RivResultProperty.PF_1_channel,
    name: 'Väylän toistuvuus',
    isDefault: false,
  },
  {
    key: RivResultProperty.PF_2_bend,
    name: 'Mutkan toistuvuus',
    isDefault: false,
  },
  {
    key: RivResultProperty.PF_3_s_bend,
    name: 'S-mutkan toistuvuus',
    isDefault: false,
  },
  {
    key: RivResultProperty.PF_3_u_bend,
    name: 'U-mutkan toistuvuus',
    isDefault: false,
  },
  {
    key: RivResultProperty.PF_4_traffic_complexity,
    name: 'Liikenteen toistuvuus',
    isDefault: false,
  },
  {
    key: RivResultProperty.PF_5_reduced_visibility,
    name: 'Heikentyneen näkyvyyden toistuvuus',
    isDefault: false,
  },
  {
    key: RivResultProperty.PF_6_light_pollution_value,
    name: 'Taustavalon toistuvuus',
    isDefault: false,
  },
  // Vaikuttavuus
  {
    key: RivResultProperty.W_wave_height,
    name: 'Aallon korkeuden vaikuttavuus',
    isDefault: false,
  },
  {
    key: RivResultProperty.W_atn,
    name: 'ATN vaikuttavuus',
    isDefault: false,
  },
  {
    key: RivResultProperty.W_speed,
    name: 'Nopeuden vaikuttavuus',
    isDefault: false,
  },
  {
    key: RivResultProperty.W_manoeuvrability,
    name: 'Ohjailtavuuden vaikuttavuus',
    isDefault: false,
  },
  {
    key: RivResultProperty.W_longitudinal_current,
    name: 'Pitkittäisvirtauksen vaikuttavuus',
    isDefault: false,
  },
  {
    key: RivResultProperty.W_bottom_surface,
    name: 'Pohjan vaikuttavuus',
    isDefault: false,
  },
  {
    key: RivResultProperty.W_cross_current,
    name: 'Poikkivirtauksen vaikuttavuus',
    isDefault: false,
  },
  {
    key: RivResultProperty.W_bank_clearance,
    name: 'Reunan vaikuttavuus',
    isDefault: false,
  },
  {
    key: RivResultProperty.W_channel_depth,
    name: 'Syvyyden vaikuttavuus',
    isDefault: false,
  },
  {
    key: RivResultProperty.W_wind,
    name: 'Tuulen vaikuttavuus',
    isDefault: false,
  },
  // Väylän tiedot
  {
    key: RivResultProperty.W_channel,
    name: 'Väylän leveys [m]',
    isDefault: true,
  },
  {
    key: RivResultProperty.channel_depth_value,
    name: 'Väylän syvyys [m]',
    isDefault: true,
  },
  {
    key: RivResultProperty.bend_S_length,
    name: 'S-mutka [m]',
    isDefault: false,
  },
  {
    key: RivResultProperty.bend_U_length,
    name: 'U-mutka [m]',
    isDefault: false,
  },
  {
    key: RivResultProperty.bend_angle,
    name: 'Mutkan suuntakulma [°]',
    isDefault: true,
  },
  {
    key: RivResultProperty.bend_radius,
    name: 'Mutkan säde [m]',
    isDefault: false,
  },
  {
    key: RivResultProperty.PF_bend1,
    name: 'PF_bend1',
    isDefault: false,
  },
  {
    key: RivResultProperty.PF_bend2,
    name: 'PF_bend2',
    isDefault: false,
  },
  {
    key: RivResultProperty.BSI,
    name: 'BSI',
    isDefault: false,
  },
  {
    key: RivResultProperty.MID_POINT,
    name: 'Koordinaatit',
    isDefault: false,
  },
  // Syöteparametrit
  {
    key: RivResultProperty.wave_height_category,
    name: 'Aallon korkeus',
    isDefault: false,
  },
  {
    key: RivResultProperty.aids_to_navigation_category,
    name: 'ATN',
    isDefault: false,
  },
  {
    key: RivResultProperty.vessel_speed_category,
    name: 'Aluksen nopeusluokka',
    isDefault: false,
  },
  {
    key: RivResultProperty.number_of_lanes,
    name: 'Kaistat',
    isDefault: false,
  },
  {
    key: RivResultProperty.PF_traffic_complexity,
    name: 'Liikenteen monimutkaisuus',
    isDefault: false,
  },
  {
    key: RivResultProperty.PF_traffic_value,
    name: 'Liikenteen monimutkaisuuden kerroin',
    isDefault: false,
  },
  {
    key: RivResultProperty.PF_traffic_volume,
    name: 'Liikenteen määrä',
    isDefault: false,
  },
  {
    key: RivResultProperty.visibility,
    name: 'Näkyvyys [m]',
    isDefault: false,
  },

  {
    key: RivResultProperty.longitudinal_current_category,
    name: 'Pitkittäisvirtaus',
    isDefault: false,
  },
  {
    key: RivResultProperty.bottom_surface_category,
    name: 'Pohja',
    isDefault: false,
  },
  {
    key: RivResultProperty.cross_current_category,
    name: 'Poikkivirtaus',
    isDefault: false,
  },
  {
    key: RivResultProperty.channel_edge_type,
    name: 'Reunan tyyppi',
    isDefault: false,
  },
  {
    key: RivResultProperty.PF_6_light_pollution,
    name: 'Taustavalon voimakkuus',
    isDefault: false,
  },
  {
    key: RivResultProperty.wind_speed_category,
    name: 'Tuulen nopeusluokka',
    isDefault: false,
  },
  {
    key: RivResultProperty.channel_type,
    name: 'Väylän tyyppi',
    isDefault: false,
  },
];
