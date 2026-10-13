export type BrowserStorageContents = {
  readonly name: string;
  readonly date: string;

  readonly calculation_interval: number;
  readonly use_new_width_calculation: boolean;
  readonly starting_gdo_gid?: string;

  readonly navline_angle_params: {
    readonly GDO_GID: number;
    readonly SADE: string;
    readonly BEND_ANGLE: string;
    readonly S_BEND: string;
  }[];

  // Boat
  readonly boat_length: number;
  readonly boat_speed: 'slow' | 'moderate' | 'fast';
  readonly boat_beam: number;
  readonly boat_draft: number;
  readonly boat_C_manoeuvrability: number;
  readonly boat_C_turning_radius: number;

  // Environment
  readonly wind_speed: 'mild' | 'moderate' | 'strong';
  readonly cross_current_speed: 'negligible' | 'low' | 'moderate' | 'strong';
  readonly longitudinal_current_speed: 'negligible' | 'moderate' | 'strong';
  readonly wave_height: 'low' | 'moderate' | 'high';
  readonly traffic_volume:
    | 'negligible'
    | 'low'
    | 'moderate'
    | 'heavy'
    | 'very_heavy';
  readonly traffic_complexity:
    | 'negligible'
    | 'low'
    | 'moderate'
    | 'high'
    | 'very_high';
  readonly visibility: number;
  readonly light_pollution:
    | 'negligible'
    | 'low'
    | 'moderate'
    | 'heavy'
    | 'very_heavy';
  readonly aids_to_navigation: 'moderate' | 'good' | 'excellent';

  // Channel
  readonly channel_type: 'inner' | 'outer';
  readonly number_of_lanes: 1 | 2;
  readonly bottom_surface: 'smooth_and_soft' | 'rough_and_hard';
  readonly channel_edge: 'gentle_slope' | 'sloping_edges' | 'steep_and_hard';
  readonly bend_radius?: string;
  readonly bend_angle: number;
  readonly distance_between_bends?: string;

  // Weight factors

  readonly WF_channel: number;
  readonly WF_bend: number;
  readonly WF_s_bend: number;
  readonly WF_u_bend: number;
  readonly WF_traffic_complexity: number;
  readonly WF_reduced_visibility: number;
  readonly WF_light_pollution: number;

  readonly WF_bank_edge_category_gentle_fast: number;
  readonly WF_bank_edge_category_gentle_moderate: number;
  readonly WF_bank_edge_category_gentle_slow: number;
  readonly WF_bank_edge_category_sloping_fast: number;
  readonly WF_bank_edge_category_sloping_moderate: number;
  readonly WF_bank_edge_category_sloping_slow: number;
  readonly WF_bank_edge_category_steep_fast: number;
  readonly WF_bank_edge_category_steep_moderate: number;
  readonly WF_bank_edge_category_steep_slow: number;

  readonly WF_deep_inner_channel: number;
  readonly WF_medium_deep_inner_channel: number;
  readonly WF_shallow_inner_channel: number;
  readonly WF_deep_outer_channel: number;
  readonly WF_medium_deep_outer_channel: number;
  readonly WF_shallow_outer_channel: number;

  readonly WF_mild_wind_fast_vessel: number;
  readonly WF_mild_wind_moderate_vessel: number;
  readonly WF_mild_wind_slow_vessel: number;
  readonly WF_moderate_wind_fast_vessel: number;
  readonly WF_moderate_wind_moderate_vessel: number;
  readonly WF_moderate_wind_slow_vessel: number;
  readonly WF_strong_wind_fast_vessel: number;
  readonly WF_strong_wind_moderate_vessel: number;
  readonly WF_strong_wind_slow_vessel: number;

  // Probability factor variables

  readonly PF_bend_ratio_lim_1: number;
  readonly PF_bend_ratio_lim_2: number;
  readonly PF_bend_ratio_lim_3: number;
  readonly PF_bend_ratio_lim_4: number;

  readonly PF_bend_radius_1: number;
  readonly PF_bend_radius_2: number;
  readonly PF_bend_radius_3: number;
  readonly PF_bend_radius_4: number;
  readonly PF_bend_radius_5: number;

  readonly PF_bend_angle_lim_1: number;
  readonly PF_bend_angle_lim_2: number;
  readonly PF_bend_angle_lim_3: number;
  readonly PF_bend_angle_lim_4: number;

  readonly PF_bend_angle_1: number;
  readonly PF_bend_angle_2: number;
  readonly PF_bend_angle_3: number;
  readonly PF_bend_angle_4: number;
  readonly PF_bend_angle_5: number;

  // Multipliers

  readonly S_bend_multiplier_1: number;
  readonly S_bend_multiplier_2: number;
  readonly S_bend_multiplier_3: number;
  readonly S_bend_multiplier_4: number;
  readonly S_bend_multiplier_5: number;

  readonly U_bend_multiplier_1: number;
  readonly U_bend_multiplier_2: number;
  readonly U_bend_multiplier_3: number;
  readonly U_bend_multiplier_4: number;
  readonly U_bend_multiplier_5: number;
};

export function isBrowserStorageContents(
  value?: unknown
): value is BrowserStorageContents {
  if (typeof value === 'undefined') return false;
  const contents = value as BrowserStorageContents;
  if (typeof contents.name !== 'string') return false;
  if (typeof contents.date !== 'string') return false;
  return true;
}
