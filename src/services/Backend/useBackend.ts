import { RivResult as RiskResult, RivFeature } from '../../types/RivResult.ts';
import { WayareaPolygon } from '../../types/WayareaPolygon.ts';
import { RiskParameters } from '../../types/RiskParameters.ts';
import { useSpinner } from '../../contexts/SpinnerContext.tsx';
import { TestResult } from '../../types/TestResult.ts';
import { DefaultShip } from '../../types/DefaultShip.ts';
import { WayareaPolygonRoute } from '../../types/WayareaPolygonRoute.ts';
import useHttp from './http-common.ts';
import { WayareaName, wayareaNameToString } from '../../types/WayareaName.ts';
import { useRiskSettings } from '../../contexts/RiskSettingsContext.tsx';
import { useDefaultShip } from '../../contexts/NewBoatContext.tsx';
import { useWayarea } from '../../contexts/NewWayareaContext.tsx';
import { RiskSettings } from '../../types/RiskSettings.ts';
import { useRisk } from '../../contexts/NewRiskContext.tsx';
import { useChannel } from '../../contexts/NewChannelContext.tsx';
import { BoatSpeed } from '../../types/BoatSettings.ts';
import { ChannelEdge, ChannelType } from '../../types/ChannelSettings.ts';
import { WindSpeed } from '../../types/EnvironmentSettings.ts';
import { useNotification } from '../../contexts/NotificationContext.tsx';

/**
 * Convert UI internal variables to the format required by back end
 *
 * This is done to separate the UI domain logic from backend API specification.
 * @param settings Risk settings converted to backend parameters
 * @returns Backend risk parameters
 */
function toRiskParameters(settings: RiskSettings): RiskParameters {
  return {
    calculation_interval: settings.calculationInterval,
    boat: {
      length: settings.boat.length,
      speed: settings.boat.speed,
      beam: settings.boat.beam,
      draft: settings.boat.draft,
      C_manoeuvrability: settings.boat.maneuverability_coefficient,
      C_turning_radius: settings.boat.turning_radius_coefficient,
    },
    navline: {
      starting_gdo_gid: '',
      calculation_params: {
        operating_conditions: {
          wind_speed: settings.environment.wind_speed,
          cross_current_speed: settings.environment.cross_current,
          longitudinal_current_speed: settings.environment.longitudinal_current,
          wave_height: settings.environment.wave_height,
        },
        other: {
          traffic_volume: settings.channel.traffic_volume,
          traffic_complexity: settings.channel.traffic_complexity,
          visibility: settings.channel.visibility,
          light_pollution: settings.channel.light_pollution,
        },
        type: settings.channel.type,
        number_of_lanes: settings.channel.number_of_lanes,
        bottom_surface: settings.channel.bottom_surface,
        channel_edge: settings.channel.channel_edge,
        aids_to_navigation: settings.channel.aids_to_navigation,
        bend_radius: 'inf',
        bend_angle: 0,
        distance_between_bends: 'inf',
        use_new_width_calculation: settings.useChannelMinimumWidth,
      },
    },
    weightfactors: {
      WF_channel: settings.multipliers.weight_factors.channel,
      WF_bend: settings.multipliers.weight_factors.channel,
      WF_s_bend: settings.multipliers.weight_factors.s_bend,
      WF_u_bend: settings.multipliers.weight_factors.u_bend,
      WF_traffic_complexity:
        settings.multipliers.weight_factors.traffic_complexity,
      WF_reduced_visibility:
        settings.multipliers.weight_factors.reduced_visibility,
      WF_light_pollution: settings.multipliers.weight_factors.light_pollution,
    },
    bank_clearance_wf: {
      edge_category_gentle_fast:
        settings.multipliers.channel_edge[BoatSpeed.FAST][ChannelEdge.GENTLE],
      edge_category_gentle_moderate:
        settings.multipliers.channel_edge[BoatSpeed.MODERATE][
          ChannelEdge.GENTLE
        ],
      edge_category_gentle_slow:
        settings.multipliers.channel_edge[BoatSpeed.SLOW][ChannelEdge.GENTLE],
      edge_category_sloping_fast:
        settings.multipliers.channel_edge[BoatSpeed.FAST][ChannelEdge.SLOPING],
      edge_category_sloping_moderate:
        settings.multipliers.channel_edge[BoatSpeed.MODERATE][
          ChannelEdge.SLOPING
        ],
      edge_category_sloping_slow:
        settings.multipliers.channel_edge[BoatSpeed.SLOW][ChannelEdge.SLOPING],
      edge_category_steep_fast:
        settings.multipliers.channel_edge[BoatSpeed.FAST][ChannelEdge.STEEP],
      edge_category_steep_moderate:
        settings.multipliers.channel_edge[BoatSpeed.MODERATE][
          ChannelEdge.STEEP
        ],
      edge_category_steep_slow:
        settings.multipliers.channel_edge[BoatSpeed.SLOW][ChannelEdge.STEEP],
    },
    channel_depth_wf: {
      deep_inner_channel:
        settings.multipliers.channel_depth[ChannelType.INNER].deep,
      medium_deep_inner_channel:
        settings.multipliers.channel_depth[ChannelType.INNER].medium,
      shallow_inner_channel:
        settings.multipliers.channel_depth[ChannelType.INNER].shallow,
      deep_outer_channel:
        settings.multipliers.channel_depth[ChannelType.OUTER].deep,
      medium_deep_outer_channel:
        settings.multipliers.channel_depth[ChannelType.OUTER].medium,
      shallow_outer_channel:
        settings.multipliers.channel_depth[ChannelType.OUTER].shallow,
    },
    wind_wf: {
      mild_wind_fast_vessel:
        settings.multipliers.wind_speed[BoatSpeed.FAST][WindSpeed.MILD],
      mild_wind_moderate_vessel:
        settings.multipliers.wind_speed[BoatSpeed.MODERATE][WindSpeed.MILD],
      mild_wind_slow_vessel:
        settings.multipliers.wind_speed[BoatSpeed.SLOW][WindSpeed.MILD],
      moderate_wind_fast_vessel:
        settings.multipliers.wind_speed[BoatSpeed.FAST][WindSpeed.MODERATE],
      moderate_wind_moderate_vessel:
        settings.multipliers.wind_speed[BoatSpeed.MODERATE][WindSpeed.MODERATE],
      moderate_wind_slow_vessel:
        settings.multipliers.wind_speed[BoatSpeed.SLOW][WindSpeed.MODERATE],
      strong_wind_fast_vessel:
        settings.multipliers.wind_speed[BoatSpeed.FAST][WindSpeed.STRONG],
      strong_wind_moderate_vessel:
        settings.multipliers.wind_speed[BoatSpeed.MODERATE][WindSpeed.STRONG],
      strong_wind_slow_vessel:
        settings.multipliers.wind_speed[BoatSpeed.SLOW][WindSpeed.STRONG],
    },
    navline_angle_params: [],
    PF_bend_parameters: {
      bend_ratio_lim_1: settings.bend.bend_radius_limits[1],
      bend_ratio_lim_2: settings.bend.bend_radius_limits[2],
      bend_ratio_lim_3: settings.bend.bend_radius_limits[3],
      bend_ratio_lim_4: settings.bend.bend_radius_limits[4],

      PF_bend_radius_1: settings.bend.bend_radius[1],
      PF_bend_radius_2: settings.bend.bend_radius[2],
      PF_bend_radius_3: settings.bend.bend_radius[3],
      PF_bend_radius_4: settings.bend.bend_radius[4],
      PF_bend_radius_5: settings.bend.bend_radius[5],

      bend_angle_lim_1: settings.bend.bend_angle_limits[1],
      bend_angle_lim_2: settings.bend.bend_angle_limits[2],
      bend_angle_lim_3: settings.bend.bend_angle_limits[3],
      bend_angle_lim_4: settings.bend.bend_angle_limits[4],

      PF_bend_angle_1: settings.bend.bend_angle[1],
      PF_bend_angle_2: settings.bend.bend_angle[2],
      PF_bend_angle_3: settings.bend.bend_angle[3],
      PF_bend_angle_4: settings.bend.bend_angle[4],
      PF_bend_angle_5: settings.bend.bend_angle[5],
    },
    S_bend_multipliers: {
      S_bend_multiplier_1: settings.bend.S_bend[1],
      S_bend_multiplier_2: settings.bend.S_bend[2],
      S_bend_multiplier_3: settings.bend.S_bend[3],
      S_bend_multiplier_4: settings.bend.S_bend[4],
      S_bend_multiplier_5: settings.bend.S_bend[5],
    },
    U_bend_multipliers: {
      U_bend_multiplier_1: settings.bend.U_bend[1],
      U_bend_multiplier_2: settings.bend.U_bend[2],
      U_bend_multiplier_3: settings.bend.U_bend[3],
      U_bend_multiplier_4: settings.bend.U_bend[4],
      U_bend_multiplier_5: settings.bend.U_bend[5],
    },
  } as RiskParameters;
}

export default function useBackend() {
  const { setSpinnerVisibility } = useSpinner();
  const { get, post } = useHttp();
  const { updateDefaultShips } = useDefaultShip();
  const { updateWayareaNames } = useWayarea();
  const { riskSettings } = useRiskSettings();
  const { setChannelArea } = useChannel();
  const { setRIVResult } = useRisk();
  const { setNotificationStatus } = useNotification();

  async function fetchAllDefaultShips(): Promise<DefaultShip[]> {
    const boats: DefaultShip[] =
      (await get<DefaultShip[], undefined>('get_all_default_ships')) ?? [];

    boats.sort((a, b) => {
      const boatNameA = a.VAY_NIMISU.toLowerCase();
      const boatNameB = b.VAY_NIMISU.toLowerCase();
      if (boatNameA > boatNameB) {
        return 1;
      }
      if (boatNameB > boatNameA) {
        return -1;
      }
      return 0;
    });

    return boats;
  }

  async function fetchWayareaNames(): Promise<WayareaName[]> {
    const wayareas =
      (await get<WayareaName[], undefined>('wayarea_names')) ?? [];

    wayareas.sort((a: WayareaName, b: WayareaName) => {
      const wayareaNameA = a.NIMIFI.toLowerCase();
      const wayareaNameB = b.NIMIFI.toLowerCase();
      if (wayareaNameA > wayareaNameB) {
        return 1;
      }
      if (wayareaNameB > wayareaNameA) {
        return -1;
      }
      return 0;
    });

    return wayareas;
  }

  async function fetchNavigationlineRisk(
    vaylat: number,
    parameters: RiskParameters
  ): Promise<RiskResult | undefined> {
    setSpinnerVisibility(true);

    const risks =
      (await post<RiskResult, RiskParameters>(
        `fairway/calculate_risk?vaylat=${encodeURIComponent(vaylat)}`,
        parameters
      )) ?? undefined;

    // Arranges points in order, which adds curves to the top of the map
    risks?.features.sort((a: RivFeature, b: RivFeature) => {
      if (a.properties.bend_radius && !b.properties.bend_radius) {
        return 1;
      } else if (!a.properties.bend_radius && b.properties.bend_radius) {
        return -1;
      } else {
        return 0;
      }
    });

    setSpinnerVisibility(false);
    return risks;
  }

  async function fetchNavigationlineChannel(
    vaylat: number
  ): Promise<WayareaPolygon | undefined> {
    setSpinnerVisibility(true);
    const channel_area = await get<WayareaPolygon, undefined>(
      `wayarea?vaylat=${encodeURIComponent(vaylat)}`
    );
    setSpinnerVisibility(false);
    return channel_area;
  }

  async function fetchTest(): Promise<TestResult | undefined> {
    return await get<TestResult, undefined>('app');
  }

  async function fetchGdoGidsForVaylat(VAYLAT: number): Promise<number[]> {
    const response = await get<
      { readonly GDO_GID: number[] },
      { readonly VAYLAT: number }
    >('gdo_gids_for_vaylat', { VAYLAT });

    return response?.GDO_GID ?? [];
  }

  async function fetchRoutelineNames(): Promise<string[]> {
    const routelines =
      (await get<string[], undefined>('routeline/routeline_names')) ?? [];

    routelines.sort((a, b) => {
      const routelineA = a.toLowerCase();
      const routelineB = b.toLowerCase();
      if (routelineA > routelineB) {
        return 1;
      }
      if (routelineB > routelineA) {
        return -1;
      }
      return 0;
    });

    return routelines;
  }

  async function fetchRoutelineRisk(
    routename: string,
    parameters: RiskParameters
  ): Promise<RiskResult | undefined> {
    const risks =
      (await post<RiskResult, RiskParameters>(
        `routeline/calculate_risk?routename=${encodeURIComponent(routename)}`,
        parameters
      )) ?? undefined;

    // Arranges points in order, which adds curves to the top of the map
    risks?.features.sort((a, b) => {
      if (a.properties.bend_radius && !b.properties.bend_radius) {
        return 1;
      } else if (!a.properties.bend_radius && b.properties.bend_radius) {
        return -1;
      } else {
        return 0;
      }
    });

    // TODO: Return let the place that uses this
    //  store them into context and display them
    return risks;
  }

  async function fetchRoutelineChannel(
    routename: string,
    boatDraft: number
  ): Promise<WayareaPolygonRoute | undefined> {
    const channel = get<WayareaPolygonRoute, undefined>(
      `routeline/wayarea_polygons?routename=${encodeURIComponent(
        routename
      )}&draft=${encodeURIComponent(boatDraft)}`
    );

    // TODO: Return and let the place that uses this
    //  store them into context and display them
    return channel;
  }

  async function refreshMainPage() {
    setSpinnerVisibility(true);
    updateDefaultShips(await fetchAllDefaultShips());
    updateWayareaNames(await fetchWayareaNames());
    setSpinnerVisibility(false);
  }

  async function calculateRisks() {
    const selected = riskSettings.channel.selected_channel;
    if (!selected) return false;
    const parameters = toRiskParameters(riskSettings);
    setSpinnerVisibility(true);
    const channel = await fetchNavigationlineChannel(selected.VAYLAT);
    const risk = await fetchNavigationlineRisk(selected.VAYLAT, parameters);
    setSpinnerVisibility(false);
    if (!!channel && !!risk) {
      setNotificationStatus({
        severity: 'success',
        message: `Väylän ${wayareaNameToString(selected)} riski on laskettu`,
        visible: true,
      });
      setChannelArea(channel);
      setRIVResult(risk);
    } else {
      // Error message(s) should've already been shown
      setChannelArea(undefined);
      setRIVResult(undefined);
    }
  }

  return {
    refreshMainPage,
    calculateRisks,
  };
}
