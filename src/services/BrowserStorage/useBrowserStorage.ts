import userInputDefault from '../../constants/UserInputDefault.ts';
import { useUserInput } from '../../contexts/UserInputContext.tsx';
import { useEffect, useState } from 'react';
import { useWayarea } from '../../contexts/NewWayareaContext.tsx';
import { useDefaultShip } from '../../contexts/NewBoatContext.tsx';
import { RiskParameters } from '../../types/RiskParameters.ts';
import {
  BrowserStorageContents,
  isBrowserStorageContents,
} from '../../types/BrowserStorageContents.ts';

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
  parameters?: RiskParameters
): BrowserStorageContents | undefined {
  if (!parameters) return undefined;
  return {
    name: name,
    date: new Date().toISOString(),
    calculation_interval: parameters.calculation_interval,
    use_new_width_calculation:
      parameters.navline.calculation_params.use_new_width_calculation,
    starting_gdo_gid: parameters.navline.starting_gdo_gid,
    navline_angle_params: parameters.navline_angle_params,
    boat_length: parameters.boat.length,
    boat_speed: parameters.boat.speed,
    boat_beam: parameters.boat.beam,
    boat_draft: parameters.boat.draft,
    boat_C_manoeuvrability: parameters.boat.C_manoeuvrability,
    boat_C_turning_radius: parameters.boat.C_turning_radius,
    wind_speed:
      parameters.navline.calculation_params.operating_conditions.wind_speed,
    cross_current_speed:
      parameters.navline.calculation_params.operating_conditions
        .cross_current_speed,
    longitudinal_current_speed:
      parameters.navline.calculation_params.operating_conditions
        .longitudinal_current_speed,
    wave_height:
      parameters.navline.calculation_params.operating_conditions.wave_height,
    traffic_volume: parameters.navline.calculation_params.other.traffic_volume,
    traffic_complexity:
      parameters.navline.calculation_params.other.traffic_complexity,
    visibility: parameters.navline.calculation_params.other.visibility,
    light_pollution:
      parameters.navline.calculation_params.other.light_pollution,
    aids_to_navigation:
      parameters.navline.calculation_params.aids_to_navigation,
    channel_type: parameters.navline.calculation_params.type,
    number_of_lanes: parameters.navline.calculation_params.number_of_lanes,
    bottom_surface: parameters.navline.calculation_params.bottom_surface,
    channel_edge: parameters.navline.calculation_params.channel_edge,
    bend_radius: parameters.navline.calculation_params.bend_radius,
    bend_angle: parameters.navline.calculation_params.bend_angle,
    distance_between_bends:
      parameters.navline.calculation_params.distance_between_bends,

    WF_channel: parameters.weightfactors.WF_channel,
    WF_bend: parameters.weightfactors.WF_bend,
    WF_s_bend: parameters.weightfactors.WF_s_bend,
    WF_u_bend: parameters.weightfactors.WF_u_bend,
    WF_traffic_complexity: parameters.weightfactors.WF_traffic_complexity,
    WF_reduced_visibility: parameters.weightfactors.WF_reduced_visibility,
    WF_light_pollution: parameters.weightfactors.WF_light_pollution,

    WF_bank_edge_category_gentle_fast:
      parameters.bank_clearance_wf.edge_category_gentle_fast,
    WF_bank_edge_category_gentle_moderate:
      parameters.bank_clearance_wf.edge_category_gentle_moderate,
    WF_bank_edge_category_gentle_slow:
      parameters.bank_clearance_wf.edge_category_gentle_slow,
    WF_bank_edge_category_sloping_fast:
      parameters.bank_clearance_wf.edge_category_sloping_fast,
    WF_bank_edge_category_sloping_moderate:
      parameters.bank_clearance_wf.edge_category_sloping_moderate,
    WF_bank_edge_category_sloping_slow:
      parameters.bank_clearance_wf.edge_category_sloping_slow,
    WF_bank_edge_category_steep_fast:
      parameters.bank_clearance_wf.edge_category_steep_fast,
    WF_bank_edge_category_steep_moderate:
      parameters.bank_clearance_wf.edge_category_steep_moderate,
    WF_bank_edge_category_steep_slow:
      parameters.bank_clearance_wf.edge_category_steep_slow,

    WF_deep_inner_channel: parameters.channel_depth_wf.deep_inner_channel,
    WF_medium_deep_inner_channel:
      parameters.channel_depth_wf.medium_deep_inner_channel,
    WF_shallow_inner_channel: parameters.channel_depth_wf.shallow_inner_channel,
    WF_deep_outer_channel: parameters.channel_depth_wf.deep_outer_channel,
    WF_medium_deep_outer_channel:
      parameters.channel_depth_wf.medium_deep_outer_channel,
    WF_shallow_outer_channel: parameters.channel_depth_wf.shallow_outer_channel,

    WF_mild_wind_fast_vessel: parameters.wind_wf.mild_wind_fast_vessel,
    WF_mild_wind_moderate_vessel: parameters.wind_wf.mild_wind_moderate_vessel,
    WF_mild_wind_slow_vessel: parameters.wind_wf.mild_wind_slow_vessel,
    WF_moderate_wind_fast_vessel: parameters.wind_wf.moderate_wind_fast_vessel,
    WF_moderate_wind_moderate_vessel:
      parameters.wind_wf.moderate_wind_moderate_vessel,
    WF_moderate_wind_slow_vessel: parameters.wind_wf.moderate_wind_slow_vessel,
    WF_strong_wind_fast_vessel: parameters.wind_wf.strong_wind_fast_vessel,
    WF_strong_wind_moderate_vessel:
      parameters.wind_wf.strong_wind_moderate_vessel,
    WF_strong_wind_slow_vessel: parameters.wind_wf.strong_wind_slow_vessel,

    PF_bend_ratio_lim_1: parameters.PF_bend_parameters.bend_ratio_lim_1,
    PF_bend_ratio_lim_2: parameters.PF_bend_parameters.bend_ratio_lim_2,
    PF_bend_ratio_lim_3: parameters.PF_bend_parameters.bend_ratio_lim_3,
    PF_bend_ratio_lim_4: parameters.PF_bend_parameters.bend_ratio_lim_4,

    PF_bend_radius_1: parameters.PF_bend_parameters.PF_bend_radius_1,
    PF_bend_radius_2: parameters.PF_bend_parameters.PF_bend_radius_2,
    PF_bend_radius_3: parameters.PF_bend_parameters.PF_bend_radius_3,
    PF_bend_radius_4: parameters.PF_bend_parameters.PF_bend_radius_4,
    PF_bend_radius_5: parameters.PF_bend_parameters.PF_bend_radius_5,

    PF_bend_angle_lim_1: parameters.PF_bend_parameters.bend_angle_lim_1,
    PF_bend_angle_lim_2: parameters.PF_bend_parameters.bend_angle_lim_2,
    PF_bend_angle_lim_3: parameters.PF_bend_parameters.bend_angle_lim_3,
    PF_bend_angle_lim_4: parameters.PF_bend_parameters.bend_angle_lim_4,

    PF_bend_angle_1: parameters.PF_bend_parameters.PF_bend_angle_1,
    PF_bend_angle_2: parameters.PF_bend_parameters.PF_bend_angle_2,
    PF_bend_angle_3: parameters.PF_bend_parameters.PF_bend_angle_3,
    PF_bend_angle_4: parameters.PF_bend_parameters.PF_bend_angle_4,
    PF_bend_angle_5: parameters.PF_bend_parameters.PF_bend_angle_5,

    S_bend_multiplier_1: parameters.S_bend_multipliers.S_bend_multiplier_1,
    S_bend_multiplier_2: parameters.S_bend_multipliers.S_bend_multiplier_2,
    S_bend_multiplier_3: parameters.S_bend_multipliers.S_bend_multiplier_3,
    S_bend_multiplier_4: parameters.S_bend_multipliers.S_bend_multiplier_4,
    S_bend_multiplier_5: parameters.S_bend_multipliers.S_bend_multiplier_5,

    U_bend_multiplier_1: parameters.U_bend_multipliers.U_bend_multiplier_1,
    U_bend_multiplier_2: parameters.U_bend_multipliers.U_bend_multiplier_2,
    U_bend_multiplier_3: parameters.U_bend_multipliers.U_bend_multiplier_3,
    U_bend_multiplier_4: parameters.U_bend_multipliers.U_bend_multiplier_4,
    U_bend_multiplier_5: parameters.U_bend_multipliers.U_bend_multiplier_5,
  };
}

function toRiskParameters(
  contents?: BrowserStorageContents
): RiskParameters | undefined {
  if (!contents) return undefined;
  return {
    calculation_interval: contents.calculation_interval,
    navline_angle_params: contents.navline_angle_params,
    navline: {
      calculation_params: {
        use_new_width_calculation: contents.use_new_width_calculation,
        operating_conditions: {
          wind_speed: contents.wind_speed,
          cross_current_speed: contents.cross_current_speed,
          longitudinal_current_speed: contents.longitudinal_current_speed,
          wave_height: contents.wave_height,
        },
        other: {
          traffic_volume: contents.traffic_volume,
          traffic_complexity: contents.traffic_complexity,
          visibility: contents.visibility,
          light_pollution: contents.light_pollution,
        },
        aids_to_navigation: contents.aids_to_navigation,
        type: contents.channel_type,
        number_of_lanes: contents.number_of_lanes,
        bottom_surface: contents.bottom_surface,
        channel_edge: contents.channel_edge,
        bend_radius: contents.bend_radius,
        bend_angle: contents.bend_angle,
        distance_between_bends: contents.distance_between_bends,
      },
      starting_gdo_gid: contents.starting_gdo_gid,
    },
    boat: {
      length: contents.boat_length,
      speed: contents.boat_speed,
      beam: contents.boat_beam,
      draft: contents.boat_draft,
      C_manoeuvrability: contents.boat_C_manoeuvrability,
      C_turning_radius: contents.boat_C_turning_radius,
    },
    weightfactors: {
      WF_channel: contents.WF_channel,
      WF_bend: contents.WF_bend,
      WF_s_bend: contents.WF_s_bend,
      WF_u_bend: contents.WF_u_bend,
      WF_traffic_complexity: contents.WF_traffic_complexity,
      WF_reduced_visibility: contents.WF_reduced_visibility,
      WF_light_pollution: contents.WF_light_pollution,
    },
    bank_clearance_wf: {
      edge_category_gentle_fast: contents.WF_bank_edge_category_gentle_fast,
      edge_category_gentle_moderate:
        contents.WF_bank_edge_category_gentle_moderate,
      edge_category_gentle_slow: contents.WF_bank_edge_category_gentle_slow,
      edge_category_sloping_fast: contents.WF_bank_edge_category_sloping_fast,
      edge_category_sloping_moderate:
        contents.WF_bank_edge_category_sloping_moderate,
      edge_category_sloping_slow: contents.WF_bank_edge_category_sloping_slow,
      edge_category_steep_fast: contents.WF_bank_edge_category_steep_fast,
      edge_category_steep_moderate:
        contents.WF_bank_edge_category_steep_moderate,
      edge_category_steep_slow: contents.WF_bank_edge_category_steep_slow,
    },
    channel_depth_wf: {
      deep_inner_channel: contents.WF_deep_inner_channel,
      medium_deep_inner_channel: contents.WF_medium_deep_inner_channel,
      shallow_inner_channel: contents.WF_shallow_inner_channel,
      deep_outer_channel: contents.WF_deep_outer_channel,
      medium_deep_outer_channel: contents.WF_medium_deep_outer_channel,
      shallow_outer_channel: contents.WF_shallow_outer_channel,
    },
    wind_wf: {
      mild_wind_fast_vessel: contents.WF_mild_wind_fast_vessel,
      mild_wind_moderate_vessel: contents.WF_mild_wind_moderate_vessel,
      mild_wind_slow_vessel: contents.WF_mild_wind_slow_vessel,
      moderate_wind_fast_vessel: contents.WF_moderate_wind_fast_vessel,
      moderate_wind_moderate_vessel: contents.WF_moderate_wind_moderate_vessel,
      moderate_wind_slow_vessel: contents.WF_moderate_wind_slow_vessel,
      strong_wind_fast_vessel: contents.WF_strong_wind_fast_vessel,
      strong_wind_moderate_vessel: contents.WF_strong_wind_moderate_vessel,
      strong_wind_slow_vessel: contents.WF_strong_wind_slow_vessel,
    },
    PF_bend_parameters: {
      bend_ratio_lim_1: contents.PF_bend_ratio_lim_1,
      bend_ratio_lim_2: contents.PF_bend_ratio_lim_2,
      bend_ratio_lim_3: contents.PF_bend_ratio_lim_3,
      bend_ratio_lim_4: contents.PF_bend_ratio_lim_4,

      PF_bend_radius_1: contents.PF_bend_radius_1,
      PF_bend_radius_2: contents.PF_bend_radius_2,
      PF_bend_radius_3: contents.PF_bend_radius_3,
      PF_bend_radius_4: contents.PF_bend_radius_4,
      PF_bend_radius_5: contents.PF_bend_radius_5,

      bend_angle_lim_1: contents.PF_bend_angle_lim_1,
      bend_angle_lim_2: contents.PF_bend_angle_lim_2,
      bend_angle_lim_3: contents.PF_bend_angle_lim_3,
      bend_angle_lim_4: contents.PF_bend_angle_lim_4,

      PF_bend_angle_1: contents.PF_bend_angle_1,
      PF_bend_angle_2: contents.PF_bend_angle_2,
      PF_bend_angle_3: contents.PF_bend_angle_3,
      PF_bend_angle_4: contents.PF_bend_angle_4,
      PF_bend_angle_5: contents.PF_bend_angle_5,
    },
    S_bend_multipliers: {
      S_bend_multiplier_1: contents.S_bend_multiplier_1,
      S_bend_multiplier_2: contents.S_bend_multiplier_2,
      S_bend_multiplier_3: contents.S_bend_multiplier_3,
      S_bend_multiplier_4: contents.S_bend_multiplier_4,
      S_bend_multiplier_5: contents.S_bend_multiplier_5,
    },
    U_bend_multipliers: {
      U_bend_multiplier_1: contents.U_bend_multiplier_1,
      U_bend_multiplier_2: contents.U_bend_multiplier_2,
      U_bend_multiplier_3: contents.U_bend_multiplier_3,
      U_bend_multiplier_4: contents.U_bend_multiplier_4,
      U_bend_multiplier_5: contents.U_bend_multiplier_5,
    },
  };
}

function getParametersFromBrowserCache(
  templateName?: string
): BrowserStorageContents | undefined {
  if (!templateName) return undefined;
  const contentsAsString = window.localStorage.getItem(templateName);
  if (!contentsAsString) return undefined;
  const contents = JSON.parse(contentsAsString);
  if (isBrowserStorageContents(contents)) return undefined;
  return contents;
}

function saveParametersToBrowserCache(
  templateName: string,
  parameters: RiskParameters
): boolean {
  const contents = toBrowserStorageContents(templateName, parameters);
  if (!contents) return false;
  window.localStorage.setItem(templateName, JSON.stringify(contents));
  return true;
}

function getTemplateNamesFromBrowserCache(): LoadableName[] {
  const found: LoadableName[] = [];
  for (const key in Object.keys(window.localStorage)) {
    // Skip the reserved name, the rest should be valid templates
    if (key === 'lastUsedParameters') continue;
    const contents = getParametersFromBrowserCache(key);
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
  const { userInput, setUserInput } = useUserInput();
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
      toBrowserStorageContents('current', userInput);
    const template: { [key: string]: any } | undefined =
      getParametersFromBrowserCache(loadName);
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
    const loadedParameters = toRiskParameters(
      getParametersFromBrowserCache(loadName)
    );
    if (!loadedParameters) return;
    saveLatestTemplateName(loadName);
    setUserInput(loadedParameters);
    setWayareaLoaded(1);
    setBoatLoaded(true);
    setLoadName(undefined);
  }

  function handleSave() {
    if (!saveName || !userInput) {
      return;
    }
    if (!saveParametersToBrowserCache(saveName, userInput)) {
      return;
    }
    setLoadableNames(getTemplateNamesFromBrowserCache());
    setSaveName(undefined);
  }

  function askIfParametersAreRestored() {
    const latestParameters = toRiskParameters(
      getParametersFromBrowserCache(getLatestTemplateName())
    );
    if (!latestParameters) return;

    if (isConfirmed('Ladataanko viimeiseksi käytetyt parametrit?')) {
      setUserInput(latestParameters);
      setWayareaLoaded(1);
      setBoatLoaded(true);
    } else {
      saveLatestTemplateName(undefined);
      setUserInput(userInputDefault);
    }
  }

  useEffect(() => {
    // Make sure defaults are in cache
    saveParametersToBrowserCache('Oletusparametrit', userInputDefault);
    askIfParametersAreRestored();
  }, []);

  useEffect(() => {
    updateChanges();
  }, [userInput, loadName]);

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
