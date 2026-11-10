import { BoatSpeed } from '../../types/BoatSettings.ts';
import {
  BrowserStorageContents,
  isBrowserStorageContents,
} from '../../types/BrowserStorageContents.ts';
import { ChannelEdge, ChannelType } from '../../types/ChannelSettings.ts';
import { WindSpeed } from '../../types/EnvironmentSettings.ts';
import { RiskSettings } from '../../types/RiskSettings.ts';
import { RISK_SETTING_DEFAULTS } from '../../constants/defaults.ts';
import { useRiskSettings } from '../../contexts/RiskSettingsContext.tsx';
import { useBrowserSettings } from '../../contexts/BrowserSettingsContext.tsx';
import { BrowserSettingsContextData } from '../../types/BrowserSettingsContextData.ts';

export const DEFAULT_BROWSER_SETTINGS: BrowserSettingsContextData = {
  name: 'Oletusparametrit',
  date: undefined,
  inUse: true,
  settings: RISK_SETTING_DEFAULTS,
};

function toBrowserStorageContents(
  name: string,
  inUse: boolean,
  date: Date,
  settings?: RiskSettings
): BrowserStorageContents | undefined {
  if (!settings) return undefined;
  return {
    name: name,
    date: date.toISOString(),
    inUse: inUse,

    calculation_interval: settings.calculationInterval,
    use_new_width_calculation: settings.useChannelMinimumWidth,
    boat_length: settings.boat.length,
    boat_speed: settings.boat.speed,
    boat_beam: settings.boat.beam,
    boat_draft: settings.boat.draft,
    boat_C_manoeuvrability: settings.boat.maneuverability_coefficient,
    boat_C_turning_radius: settings.boat.turning_radius_coefficient,
    wind_speed: settings.environment.wind_speed,
    cross_current_speed: settings.environment.cross_current,
    longitudinal_current_speed: settings.environment.longitudinal_current,
    wave_height: settings.environment.wave_height,
    traffic_volume: settings.channel.traffic_volume,
    traffic_complexity: settings.channel.traffic_complexity,
    visibility: settings.channel.visibility,
    light_pollution: settings.channel.light_pollution,
    aids_to_navigation: settings.channel.aids_to_navigation,
    channel_type: settings.channel.type,
    number_of_lanes: settings.channel.number_of_lanes,
    bottom_surface: settings.channel.bottom_surface,
    channel_edge: settings.channel.channel_edge,

    WF_channel: settings.multipliers.weight_factors.channel,
    WF_bend: settings.multipliers.weight_factors.bend,
    WF_s_bend: settings.multipliers.weight_factors.s_bend,
    WF_u_bend: settings.multipliers.weight_factors.u_bend,
    WF_traffic_complexity:
      settings.multipliers.weight_factors.traffic_complexity,
    WF_reduced_visibility:
      settings.multipliers.weight_factors.reduced_visibility,
    WF_light_pollution: settings.multipliers.weight_factors.light_pollution,

    WF_bank_edge_category_gentle_slow:
      settings.multipliers.channel_edge[BoatSpeed.SLOW][ChannelEdge.GENTLE],
    WF_bank_edge_category_sloping_slow:
      settings.multipliers.channel_edge[BoatSpeed.SLOW][ChannelEdge.SLOPING],
    WF_bank_edge_category_steep_slow:
      settings.multipliers.channel_edge[BoatSpeed.SLOW][ChannelEdge.STEEP],

    WF_bank_edge_category_gentle_moderate:
      settings.multipliers.channel_edge[BoatSpeed.MODERATE][ChannelEdge.GENTLE],
    WF_bank_edge_category_sloping_moderate:
      settings.multipliers.channel_edge[BoatSpeed.MODERATE][
        ChannelEdge.SLOPING
      ],
    WF_bank_edge_category_steep_moderate:
      settings.multipliers.channel_edge[BoatSpeed.MODERATE][ChannelEdge.STEEP],

    WF_bank_edge_category_gentle_fast:
      settings.multipliers.channel_edge[BoatSpeed.FAST][ChannelEdge.GENTLE],
    WF_bank_edge_category_sloping_fast:
      settings.multipliers.channel_edge[BoatSpeed.FAST][ChannelEdge.SLOPING],
    WF_bank_edge_category_steep_fast:
      settings.multipliers.channel_edge[BoatSpeed.FAST][ChannelEdge.STEEP],

    WF_deep_inner_channel:
      settings.multipliers.channel_depth[ChannelType.INNER].deep,
    WF_medium_deep_inner_channel:
      settings.multipliers.channel_depth[ChannelType.INNER].medium,
    WF_shallow_inner_channel:
      settings.multipliers.channel_depth[ChannelType.INNER].shallow,
    WF_deep_outer_channel:
      settings.multipliers.channel_depth[ChannelType.OUTER].deep,
    WF_medium_deep_outer_channel:
      settings.multipliers.channel_depth[ChannelType.OUTER].medium,
    WF_shallow_outer_channel:
      settings.multipliers.channel_depth[ChannelType.OUTER].shallow,

    WF_mild_wind_fast_vessel:
      settings.multipliers.wind_speed[BoatSpeed.FAST][WindSpeed.MILD],
    WF_mild_wind_moderate_vessel:
      settings.multipliers.wind_speed[BoatSpeed.MODERATE][WindSpeed.MILD],
    WF_mild_wind_slow_vessel:
      settings.multipliers.wind_speed[BoatSpeed.SLOW][WindSpeed.MILD],
    WF_moderate_wind_fast_vessel:
      settings.multipliers.wind_speed[BoatSpeed.FAST][WindSpeed.MODERATE],
    WF_moderate_wind_moderate_vessel:
      settings.multipliers.wind_speed[BoatSpeed.MODERATE][WindSpeed.MODERATE],
    WF_moderate_wind_slow_vessel:
      settings.multipliers.wind_speed[BoatSpeed.SLOW][WindSpeed.MODERATE],
    WF_strong_wind_fast_vessel:
      settings.multipliers.wind_speed[BoatSpeed.FAST][WindSpeed.STRONG],
    WF_strong_wind_moderate_vessel:
      settings.multipliers.wind_speed[BoatSpeed.MODERATE][WindSpeed.STRONG],
    WF_strong_wind_slow_vessel:
      settings.multipliers.wind_speed[BoatSpeed.SLOW][WindSpeed.STRONG],

    PF_bend_ratio_lim_1: settings.bend.bend_radius_limits[1],
    PF_bend_ratio_lim_2: settings.bend.bend_radius_limits[2],
    PF_bend_ratio_lim_3: settings.bend.bend_radius_limits[3],
    PF_bend_ratio_lim_4: settings.bend.bend_radius_limits[4],

    PF_bend_radius_1: settings.bend.bend_radius[1],
    PF_bend_radius_2: settings.bend.bend_radius[2],
    PF_bend_radius_3: settings.bend.bend_radius[3],
    PF_bend_radius_4: settings.bend.bend_radius[4],
    PF_bend_radius_5: settings.bend.bend_radius[5],

    PF_bend_angle_lim_1: settings.bend.bend_angle_limits[1],
    PF_bend_angle_lim_2: settings.bend.bend_angle_limits[2],
    PF_bend_angle_lim_3: settings.bend.bend_angle_limits[3],
    PF_bend_angle_lim_4: settings.bend.bend_angle_limits[4],

    PF_bend_angle_1: settings.bend.bend_angle[1],
    PF_bend_angle_2: settings.bend.bend_angle[2],
    PF_bend_angle_3: settings.bend.bend_angle[3],
    PF_bend_angle_4: settings.bend.bend_angle[4],
    PF_bend_angle_5: settings.bend.bend_angle[5],

    S_bend_multiplier_1: settings.bend.S_bend[1],
    S_bend_multiplier_2: settings.bend.S_bend[2],
    S_bend_multiplier_3: settings.bend.S_bend[3],
    S_bend_multiplier_4: settings.bend.S_bend[4],
    S_bend_multiplier_5: settings.bend.S_bend[5],

    U_bend_multiplier_1: settings.bend.U_bend[1],
    U_bend_multiplier_2: settings.bend.U_bend[2],
    U_bend_multiplier_3: settings.bend.U_bend[3],
    U_bend_multiplier_4: settings.bend.U_bend[4],
    U_bend_multiplier_5: settings.bend.U_bend[5],
  };
}

function toRiskSettings(
  contents?: BrowserStorageContents
): RiskSettings | undefined {
  if (!contents) return undefined;
  return {
    calculationInterval: contents.calculation_interval,
    useChannelMinimumWidth: contents.use_new_width_calculation,
    environment: {
      wind_speed: contents.wind_speed,
      cross_current: contents.cross_current_speed,
      longitudinal_current: contents.longitudinal_current_speed,
      wave_height: contents.wave_height,
    },
    channel: {
      // Currently we don't remember the selected channel, maybe we could?
      selected_channel: undefined,
      number_of_lanes: contents.number_of_lanes,
      type: contents.channel_type,
      bottom_surface: contents.bottom_surface,
      channel_edge: contents.channel_edge,
      aids_to_navigation: contents.aids_to_navigation,
      visibility: contents.visibility,
      light_pollution: contents.light_pollution,
      traffic_volume: contents.traffic_volume,
      traffic_complexity: contents.traffic_complexity,
    },
    boat: {
      length: contents.boat_length,
      beam: contents.boat_beam,
      draft: contents.boat_draft,
      speed: contents.boat_speed,
      maneuverability_coefficient: contents.boat_C_manoeuvrability,
      turning_radius_coefficient: contents.boat_C_turning_radius,
    },
    multipliers: {
      weight_factors: {
        channel: contents.WF_channel,
        bend: contents.WF_bend,
        s_bend: contents.WF_s_bend,
        u_bend: contents.WF_u_bend,
        traffic_complexity: contents.WF_traffic_complexity,
        reduced_visibility: contents.WF_reduced_visibility,
        light_pollution: contents.WF_light_pollution,
      },
      channel_edge: {
        [BoatSpeed.FAST]: {
          [ChannelEdge.GENTLE]: contents.WF_bank_edge_category_gentle_fast,
          [ChannelEdge.SLOPING]: contents.WF_bank_edge_category_sloping_fast,
          [ChannelEdge.STEEP]: contents.WF_bank_edge_category_steep_fast,
        },
        [BoatSpeed.MODERATE]: {
          [ChannelEdge.GENTLE]: contents.WF_bank_edge_category_gentle_moderate,
          [ChannelEdge.SLOPING]:
            contents.WF_bank_edge_category_sloping_moderate,
          [ChannelEdge.STEEP]: contents.WF_bank_edge_category_steep_moderate,
        },
        [BoatSpeed.SLOW]: {
          [ChannelEdge.GENTLE]: contents.WF_bank_edge_category_gentle_slow,
          [ChannelEdge.SLOPING]: contents.WF_bank_edge_category_sloping_slow,
          [ChannelEdge.STEEP]: contents.WF_bank_edge_category_steep_slow,
        },
      },
      channel_depth: {
        [ChannelType.INNER]: {
          deep: contents.WF_deep_inner_channel,
          medium: contents.WF_medium_deep_inner_channel,
          shallow: contents.WF_shallow_inner_channel,
        },
        [ChannelType.OUTER]: {
          deep: contents.WF_deep_outer_channel,
          medium: contents.WF_medium_deep_outer_channel,
          shallow: contents.WF_shallow_outer_channel,
        },
      },
      wind_speed: {
        [BoatSpeed.FAST]: {
          [WindSpeed.MILD]: contents.WF_mild_wind_fast_vessel,
          [WindSpeed.MODERATE]: contents.WF_moderate_wind_fast_vessel,
          [WindSpeed.STRONG]: contents.WF_strong_wind_fast_vessel,
        },
        [BoatSpeed.MODERATE]: {
          [WindSpeed.MILD]: contents.WF_mild_wind_moderate_vessel,
          [WindSpeed.MODERATE]: contents.WF_moderate_wind_moderate_vessel,
          [WindSpeed.STRONG]: contents.WF_strong_wind_moderate_vessel,
        },
        [BoatSpeed.SLOW]: {
          [WindSpeed.MILD]: contents.WF_mild_wind_slow_vessel,
          [WindSpeed.MODERATE]: contents.WF_moderate_wind_slow_vessel,
          [WindSpeed.STRONG]: contents.WF_strong_wind_slow_vessel,
        },
      },
    },
    bend: {
      bend_radius_limits: {
        1: contents.PF_bend_ratio_lim_1,
        2: contents.PF_bend_ratio_lim_2,
        3: contents.PF_bend_ratio_lim_3,
        4: contents.PF_bend_ratio_lim_4,
      },
      bend_radius: {
        1: contents.PF_bend_radius_1,
        2: contents.PF_bend_radius_2,
        3: contents.PF_bend_radius_3,
        4: contents.PF_bend_radius_4,
        5: contents.PF_bend_radius_5,
      },
      bend_angle_limits: {
        1: contents.PF_bend_angle_lim_1,
        2: contents.PF_bend_angle_lim_2,
        3: contents.PF_bend_angle_lim_3,
        4: contents.PF_bend_angle_lim_4,
      },
      bend_angle: {
        1: contents.PF_bend_angle_1,
        2: contents.PF_bend_angle_2,
        3: contents.PF_bend_angle_3,
        4: contents.PF_bend_angle_4,
        5: contents.PF_bend_angle_5,
      },
      S_bend: {
        1: contents.S_bend_multiplier_1,
        2: contents.S_bend_multiplier_2,
        3: contents.S_bend_multiplier_3,
        4: contents.S_bend_multiplier_4,
        5: contents.S_bend_multiplier_5,
      },
      U_bend: {
        1: contents.U_bend_multiplier_1,
        2: contents.U_bend_multiplier_2,
        3: contents.U_bend_multiplier_3,
        4: contents.U_bend_multiplier_4,
        5: contents.U_bend_multiplier_5,
      },
    },
  } as RiskSettings;
}

function keys(): string[] {
  let keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const found: string | null = localStorage.key(i);
    if (!found) continue;
    keys.push(found);
  }
  return keys;
}

function loadFromBrowserStorage(
  name?: string
): BrowserSettingsContextData | undefined {
  if (!name) return undefined;
  const contentsAsString = window.localStorage.getItem(name);
  if (!contentsAsString) return undefined;
  const contents = JSON.parse(contentsAsString);
  if (!isBrowserStorageContents(contents)) {
    return undefined;
  }
  const settings = toRiskSettings(contents);
  if (!settings) {
    return undefined;
  }

  return {
    name: contents.name,
    inUse: contents.inUse,
    date: new Date(contents.date),
    settings: settings,
  };
}

function loadAllFromBrowserStorage(): BrowserSettingsContextData[] {
  return keys()
    .map(loadFromBrowserStorage)
    .filter((content) => !!content);
}

function saveAllToBrowserStorage(contents: BrowserSettingsContextData[]) {
  // Clear old state to make sure we don't keep outdated content
  window.localStorage.clear();
  contents.forEach((content) => {
    const stored = toBrowserStorageContents(
      content.name,
      content.inUse,
      content.date ?? new Date(),
      content.settings
    );
    window.localStorage.setItem(content.name, JSON.stringify(stored));
  });
}

export default function useBrowserStorage() {
  const { riskSettings, setRiskSettings } = useRiskSettings();
  // Don't store default parameters for no reason as the implementation knows them
  const { contents, setContents } = useBrowserSettings();

  function restoreSettings(name: string): boolean {
    if (name === DEFAULT_BROWSER_SETTINGS.name) {
      setRiskSettings(RISK_SETTING_DEFAULTS);
      setContents(contents.map((content) => ({ ...content, inUse: false })));
      return true;
    }
    const found = contents.find((content) => content.name === name);
    if (!found) return false;
    setRiskSettings(found.settings);
    setContents(
      contents.map((content) =>
        content.name === found.name
          ? { ...content, inUse: true }
          : { ...content, inUse: false }
      )
    );
    return true;
  }

  function saveCurrentSettings(name: string): boolean {
    if (name === DEFAULT_BROWSER_SETTINGS.name) return false;

    // Remove duplicate setting and make sure no other setting is in use
    //  because the saved settings are the ones currently in use
    const newContents = contents
      .filter((content) => content.name !== name)
      .map((content) => ({ ...content, inUse: false }));
    newContents.push({
      name: name,
      inUse: true,
      date: new Date(),
      settings: riskSettings,
    });
    setContents(newContents);
    return true;
  }

  function resetSettings() {
    setContents([]);
  }

  const current =
    contents.find((content) => content.inUse) ?? DEFAULT_BROWSER_SETTINGS;

  const options = [DEFAULT_BROWSER_SETTINGS].concat(contents).sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    if (a.date.getTime() === b.date.getTime()) return 0;
    return a.date.getTime() < b.date.getTime() ? 1 : -1;
  });
  return {
    current: current,
    options: options,
    saveAllToBrowserStorage,
    loadAllFromBrowserStorage,
    restoreSettings,
    saveCurrentSettings,
    resetSettings,
  };
}
