export type RiskParameters = {
  readonly boat: {
    readonly length: number;
    readonly speed: 'slow' | 'moderate' | 'fast';
    readonly beam: number;
    readonly draft: number;
    readonly C_manoeuvrability: number;
    readonly C_turning_radius: number;
  };
  readonly navline: {
    readonly starting_gdo_gid?: string;
    readonly calculation_params: {
      readonly operating_conditions: {
        readonly wind_speed: 'mild' | 'moderate' | 'strong';
        readonly cross_current_speed:
          | 'negligible'
          | 'low'
          | 'moderate'
          | 'strong';
        readonly longitudinal_current_speed:
          | 'negligible'
          | 'moderate'
          | 'strong';
        readonly wave_height: 'low' | 'moderate' | 'high';
      };
      readonly other: {
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
      };
      readonly type: 'inner' | 'outer';
      readonly number_of_lanes: 1 | 2;
      readonly bottom_surface: 'smooth_and_soft' | 'rough_and_hard';
      readonly channel_edge:
        | 'gentle_slope'
        | 'sloping_edges'
        | 'steep_and_hard';
      readonly aids_to_navigation: 'moderate' | 'good' | 'excellent';
      readonly bend_radius?: string;
      readonly bend_angle: number;
      readonly distance_between_bends?: string;
      readonly use_new_width_calculation: boolean;
    };
  };
  readonly weightfactors: {
    readonly WF_channel: number;
    readonly WF_bend: number;
    readonly WF_s_bend: number;
    readonly WF_u_bend: number;
    readonly WF_traffic_complexity: number;
    readonly WF_reduced_visibility: number;
    readonly WF_light_pollution: number;
  };
  readonly bank_clearance_wf: {
    readonly edge_category_gentle_fast: number;
    readonly edge_category_gentle_moderate: number;
    readonly edge_category_gentle_slow: number;
    readonly edge_category_sloping_fast: number;
    readonly edge_category_sloping_moderate: number;
    readonly edge_category_sloping_slow: number;
    readonly edge_category_steep_fast: number;
    readonly edge_category_steep_moderate: number;
    readonly edge_category_steep_slow: number;
  };
  readonly channel_depth_wf: {
    readonly deep_inner_channel: number;
    readonly medium_deep_inner_channel: number;
    readonly shallow_inner_channel: number;
    readonly deep_outer_channel: number;
    readonly medium_deep_outer_channel: number;
    readonly shallow_outer_channel: number;
  };
  readonly wind_wf: {
    readonly mild_wind_fast_vessel: number;
    readonly mild_wind_moderate_vessel: number;
    readonly mild_wind_slow_vessel: number;
    readonly moderate_wind_fast_vessel: number;
    readonly moderate_wind_moderate_vessel: number;
    readonly moderate_wind_slow_vessel: number;
    readonly strong_wind_fast_vessel: number;
    readonly strong_wind_moderate_vessel: number;
    readonly strong_wind_slow_vessel: number;
  };
  readonly navline_angle_params: {
    readonly GDO_GID: number;
    readonly SADE: string;
    readonly BEND_ANGLE: string;
    readonly S_BEND: string;
  }[];

  readonly PF_bend_parameters: {
    readonly bend_ratio_lim_1: number;
    readonly bend_ratio_lim_2: number;
    readonly bend_ratio_lim_3: number;
    readonly bend_ratio_lim_4: number;

    readonly PF_bend_radius_1: number;
    readonly PF_bend_radius_2: number;
    readonly PF_bend_radius_3: number;
    readonly PF_bend_radius_4: number;
    readonly PF_bend_radius_5: number;

    readonly bend_angle_lim_1: number;
    readonly bend_angle_lim_2: number;
    readonly bend_angle_lim_3: number;
    readonly bend_angle_lim_4: number;

    readonly PF_bend_angle_1: number;
    readonly PF_bend_angle_2: number;
    readonly PF_bend_angle_3: number;
    readonly PF_bend_angle_4: number;
    readonly PF_bend_angle_5: number;
  };
  readonly calculation_interval: number;
  readonly S_bend_multipliers: {
    readonly S_bend_multiplier_1: number;
    readonly S_bend_multiplier_2: number;
    readonly S_bend_multiplier_3: number;
    readonly S_bend_multiplier_4: number;
    readonly S_bend_multiplier_5: number;
  };
  readonly U_bend_multipliers: {
    readonly U_bend_multiplier_1: number;
    readonly U_bend_multiplier_2: number;
    readonly U_bend_multiplier_3: number;
    readonly U_bend_multiplier_4: number;
    readonly U_bend_multiplier_5: number;
  };
};

export function isRiskParameters(value?: unknown): value is RiskParameters {
  if (typeof value === 'undefined') return false;
  const contents = value as RiskParameters;
  // TODO: Make sure all fields are valid
  return true;
}
