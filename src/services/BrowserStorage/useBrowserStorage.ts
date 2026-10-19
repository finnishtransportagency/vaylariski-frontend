import { useRiskSettings } from '../../contexts/RiskSettingsContext.tsx';
import { useEffect, useState } from 'react';
import { useWayarea } from '../../contexts/NewWayareaContext.tsx';
import { useDefaultShip } from '../../contexts/NewBoatContext.tsx';
import {
  BrowserStorageContents,
  isBrowserStorageContents,
} from '../../types/BrowserStorageContents.ts';
import { RiskSettings } from '../../types/RiskSettings.ts';
import { ChannelEdge, ChannelType } from '../../types/ChannelSettings.ts';
import { BoatSpeed } from '../../types/BoatSettings.ts';
import { WindSpeed } from '../../types/EnvironmentSettings.ts';
import { RISK_SETTING_DEFAULTS } from '../../constants/defaults.ts';

export type Change = {
  readonly property: string;
  readonly oldValue: string;
  readonly newValue: string;
};

export type LoadableName = {
  readonly name: string;
  readonly date: string;
};

function toBrowserStorageContents(
  name: string,
  settings?: RiskSettings
): BrowserStorageContents | undefined {
  if (!settings) return undefined;
  return {
    name: name,
    date: new Date().toISOString(),
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

function getSettingsFromBrowserCache(
  templateName?: string
): BrowserStorageContents | undefined {
  if (!templateName) return undefined;
  const contentsAsString = window.localStorage.getItem(templateName);
  if (!contentsAsString) return undefined;
  const contents = JSON.parse(contentsAsString);
  if (isBrowserStorageContents(contents)) return undefined;
  return contents;
}

function saveSettingsToBrowserCache(
  templateName: string,
  riskSettings: RiskSettings
): boolean {
  const contents = toBrowserStorageContents(templateName, riskSettings);
  if (!contents) return false;
  window.localStorage.setItem(templateName, JSON.stringify(contents));
  return true;
}

function getTemplateNamesFromBrowserCache(): LoadableName[] {
  const found: LoadableName[] = [];
  for (const key in Object.keys(window.localStorage)) {
    // Skip the reserved name, the rest should be valid templates
    if (key === 'lastUsedParameters') continue;
    const contents = getSettingsFromBrowserCache(key);
    if (!contents) continue;
    found.push({ name: contents.name, date: contents.date });
  }
  return found;
}

function saveLatestTemplateName(templateName?: string) {
  // it's theoretically possible to name your template as this reserved name
  // if it happens, for now user should just clear their cache
  window.localStorage.setItem('lastUsedParameters', templateName ?? '');
}

function getLatestTemplateName(): string | undefined {
  return window.localStorage.getItem('lastUsedParameters') ?? undefined;
}

function isConfirmed(question: string): boolean {
  return window.confirm(question);
}

export function useBrowserStorage() {
  const { riskSettings, setRiskSettings } = useRiskSettings();
  const { setLoaded: setWayareaLoaded } = useWayarea();
  const { setLoaded: setBoatLoaded } = useDefaultShip();

  const [loadableNames, setLoadableNames] = useState<LoadableName[]>(
    getTemplateNamesFromBrowserCache()
  );
  const [changes, setChanges] = useState<Change[]>([]);
  const [saveName, setSaveName] = useState<string>();
  const [loadName, setLoadName] = useState<string>();

  function updateChanges() {
    const current: { [key: string]: any } | undefined =
      toBrowserStorageContents('current', riskSettings);
    const template: { [key: string]: any } | undefined =
      getSettingsFromBrowserCache(loadName);
    if (!current || !template) {
      setChanges([]);
      return;
    }

    const changes: Change[] = [];
    for (const property in current) {
      if (!Object.hasOwn(template, property)) continue;
      const oldValue = current[property] ? `${current[property]}` : '';
      const newValue =
        Object.hasOwn(template, property) && template[property]
          ? `${template[property]}`
          : '';
      if (oldValue === newValue) continue;
      changes.push({ property, oldValue, newValue });
    }
    setChanges(changes);
  }

  function handleLoad() {
    const loadedParameters = toRiskSettings(
      getSettingsFromBrowserCache(loadName)
    );
    if (!loadedParameters) return;
    saveLatestTemplateName(loadName);
    setRiskSettings(loadedParameters);
    setWayareaLoaded(1);
    setBoatLoaded(true);
    setLoadName(undefined);
  }

  function handleSave() {
    if (!saveName || !riskSettings) {
      return;
    }
    if (!saveSettingsToBrowserCache(saveName, riskSettings)) {
      return;
    }
    setLoadableNames(getTemplateNamesFromBrowserCache());
    setSaveName(undefined);
  }

  function askIfParametersAreRestored() {
    const latestParameters = toRiskSettings(
      getSettingsFromBrowserCache(getLatestTemplateName())
    );
    if (!latestParameters) return;

    if (isConfirmed('Ladataanko viimeiseksi käytetyt parametrit?')) {
      setRiskSettings(latestParameters);
      setWayareaLoaded(1);
      setBoatLoaded(true);
    } else {
      saveLatestTemplateName(undefined);
      setRiskSettings(RISK_SETTING_DEFAULTS);
    }
  }

  useEffect(() => {
    // Make sure defaults are in cache
    saveSettingsToBrowserCache('Oletusparametrit', RISK_SETTING_DEFAULTS);
    askIfParametersAreRestored();
  }, []);

  useEffect(() => {
    updateChanges();
  }, [riskSettings, loadName]);

  return {
    loadableNames,
    saveName,
    loadName,
    changes,
    handleLoad,
    handleSave,
    setSaveName,
    setLoadName,
  };
}
