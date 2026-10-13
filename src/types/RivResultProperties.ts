import { RivResultProperty } from './RivResultProperty.ts';

export type RivResultProperties = {
  // IDs
  readonly [RivResultProperty.point_index]: number;
  readonly [RivResultProperty.GDO_GID]: number;
  readonly [RivResultProperty.VAYLAT]: number;

  // Risk values
  readonly [RivResultProperty.RISK_INDEX_SUM]: number;
  readonly [RivResultProperty.RIV_1_channel]: number;
  readonly [RivResultProperty.RIV_2_bend]: number;
  readonly [RivResultProperty.RIV_3_s_bend]: number;
  readonly [RivResultProperty.RIV_3_u_bend]: number;
  readonly [RivResultProperty.RIV_4_traffic_complexity]: number;
  readonly [RivResultProperty.RIV_5_reduced_visibility]: number;
  readonly [RivResultProperty.RIV_6_light_pollution]: number;

  // Presence factors
  readonly [RivResultProperty.PF_1_channel]: number;
  readonly [RivResultProperty.PF_2_bend]: number;
  readonly [RivResultProperty.PF_3_s_bend]: number;
  readonly [RivResultProperty.PF_3_u_bend]: number;
  readonly [RivResultProperty.PF_4_traffic_complexity]: number;
  readonly [RivResultProperty.PF_5_reduced_visibility]: number;
  readonly [RivResultProperty.PF_6_light_pollution_value]: number;

  // Weights
  readonly [RivResultProperty.W_atn]: number;
  readonly [RivResultProperty.W_bank_clearance]: number;
  readonly [RivResultProperty.W_bottom_surface]: number;
  readonly [RivResultProperty.W_channel_depth]: number;
  readonly [RivResultProperty.W_cross_current]: number;
  readonly [RivResultProperty.W_longitudinal_current]: number;
  readonly [RivResultProperty.W_manoeuvrability]: number;
  readonly [RivResultProperty.W_speed]: number;
  readonly [RivResultProperty.W_wave_height]: number;
  readonly [RivResultProperty.W_wind]: number;

  // Channel information
  readonly [RivResultProperty.bend_angle]: number;
  readonly [RivResultProperty.bend_radius]: number;
  readonly [RivResultProperty.bend_S_length]: number;
  readonly [RivResultProperty.bend_U_length]: number;
  readonly [RivResultProperty.BSI]: number;
  readonly [RivResultProperty.channel_depth_value]: number;
  readonly [RivResultProperty.MID_POINT]: number;
  readonly [RivResultProperty.PF_bend1]: number;
  readonly [RivResultProperty.PF_bend2]: number;
  readonly [RivResultProperty.W_channel]: number;

  // Input parameters
  readonly [RivResultProperty.aids_to_navigation_category]:
    | 'moderate'
    | 'good'
    | 'excellent';
  readonly [RivResultProperty.bottom_surface_category]:
    | 'smooth_and_soft'
    | 'rough_and_hard';
  readonly [RivResultProperty.channel_edge_type]:
    | 'gentle_slope'
    | 'sloping_edges'
    | 'steep_and_hard';
  readonly [RivResultProperty.channel_type]: 'inner' | 'outer';
  readonly [RivResultProperty.cross_current_category]:
    | 'negligible'
    | 'low'
    | 'moderate'
    | 'strong';
  readonly [RivResultProperty.longitudinal_current_category]:
    | 'negligible'
    | 'moderate'
    | 'strong';
  readonly [RivResultProperty.number_of_lanes]: 1 | 2;
  readonly [RivResultProperty.PF_6_light_pollution]:
    | 'negligible'
    | 'low'
    | 'moderate'
    | 'heavy'
    | 'very_heavy';
  readonly [RivResultProperty.PF_traffic_complexity]:
    | 'negligible'
    | 'low'
    | 'moderate'
    | 'high'
    | 'very_high';

  readonly [RivResultProperty.PF_traffic_value]: number;
  readonly [RivResultProperty.PF_traffic_volume]:
    | 'negligible'
    | 'low'
    | 'moderate'
    | 'heavy'
    | 'very_heavy';

  readonly [RivResultProperty.vessel_speed_category]:
    | 'slow'
    | 'moderate'
    | 'fast';
  readonly [RivResultProperty.visibility]: number;
  readonly [RivResultProperty.wave_height_category]:
    | 'low'
    | 'moderate'
    | 'high';
  readonly [RivResultProperty.wind_speed_category]:
    | 'mild'
    | 'moderate'
    | 'strong';

  // Not shown, present in UI logic
  readonly [RivResultProperty.draft_is_greater_than_depth]: boolean;
  readonly [RivResultProperty.ROUTELINE]: string;

  // Not used in UI
  readonly [RivResultProperty.SORTING_INDEX]: number;
};
