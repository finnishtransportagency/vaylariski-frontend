import { object as yupObject, number as yupNumber, ref as yupRef, array as yupArray, string as yupString } from "yup";

const parametersValidationSchema = yupObject().shape({
  navline: yupObject().shape({
    calculation_params: yupObject().shape({
      other: yupObject().shape({
        visibility: yupNumber()
          .min(0, "Visibility ei voi olla negatiivinen")
          .required("Visibility vaaditaan"),
      }),
    }),
  }),

  navline_angle_params: yupArray()
    .optional()
    .of(
      yupObject().shape({
        GDO_GID: yupNumber().required("GDO GID vaaditaan"),
        SADE: yupString(),
        BEND_ANGLE: yupString(),
        S_BEND: yupString(),
      })
    ),
  boat: yupObject().shape({
    length: yupNumber()
      .moreThan(0, "Pituus ei voi olla negatiivinen")
      .required("Pituus vaaditaan"),
    beam: yupNumber()
      .moreThan(0, "Leveys ei voi olla negatiivinen")
      .required("Leveys vaaditaan"),
    draft: yupNumber()
      .moreThan(0, "Syväys ei voi olla negatiivinen")
      .required("Syväys vaaditaan"),
  }),

  PF_bend_parameters: yupObject().shape({
    bend_ratio_lim_1: yupNumber()
      .min(0, "bend_ration_lim_1 ei voi olla negatiivinen")
      .max(
        yupRef("bend_ratio_lim_2"),
        "bend_ration_lim_1 ei voi olla isompi kun bend_ration_lim_2"
      )
      .required("bend_ration_lim_1 vaaditaan"),
    bend_ratio_lim_2: yupNumber()
      .min(
        yupRef("bend_ratio_lim_1"),
        "bend_ration_lim_2 ei voi olla pienempi kun bend_ration_lim_1"
      )
      .max(
        yupRef("bend_ratio_lim_3"),
        "bend_ration_lim_2 ei voi olla isompi kun bend_ration_lim_3"
      )
      .required("bend_ration_lim_2 vaaditaan"),
    bend_ratio_lim_3: yupNumber()
      .min(
        yupRef("bend_ratio_lim_2"),
        "bend_ration_lim_3 ei voi olla pienempi kun bend_ration_lim_2"
      )
      .max(
        yupRef("bend_ratio_lim_4"),
        "bend_ration_lim_3 ei voi olla isompi kun bend_ration_lim_4"
      )
      .required("bend_ration_lim_3 vaaditaan"),
    bend_ratio_lim_4: yupNumber()
      .min(
        yupRef("bend_ratio_lim_3"),
        "bend_ration_lim_4 ei voi olla pienempi kun bend_ration_lim_3"
      )
      .required("bend_ration_lim_4 vaaditaan"),
    PF_bend_radius_1: yupNumber()
      .min(0, "PF_bend_radius_1 ei voi olla negatiivinen")
      .required("PF_bend_radius_1 vaaditaan"),
    PF_bend_radius_2: yupNumber()
      .min(0, "PF_bend_radius_2 ei voi olla negatiivinen")
      .required("PF_bend_radius_2 vaaditaan"),
    PF_bend_radius_3: yupNumber()
      .min(0, "PF_bend_radius_3 ei voi olla negatiivinen")
      .required("PF_bend_radius_3 vaaditaan"),
    PF_bend_radius_4: yupNumber()
      .min(0, "PF_bend_radius_4ei voi olla negatiivinen")
      .required("PF_bend_radius_4 vaaditaan"),
    PF_bend_radius_5: yupNumber()
      .min(0, "PF_bend_radius_5ei voi olla negatiivinen")
      .required("PF_bend_radius_5 vaaditaan"),
    bend_angle_lim_1: yupNumber()
      .min(0, "bend_angle_lim_1 ei voi negatiivinen")
      .max(
        yupRef("bend_angle_lim_2"),
        "bend_angle_lim_1 ei voi olla isompi kun bend_angle_lim_2"
      )
      .required("bend_angle_lim_1 vaaditaan"),
    bend_angle_lim_2: yupNumber()
      .min(
        yupRef("bend_angle_lim_1"),
        "bend_angle_lim_2 ei voi olla pienempi kun bend_angle_lim_1"
      )
      .max(
        yupRef("bend_angle_lim_3"),
        "bend_angle_lim_2 ei voi olla isompi kun bend_angle_lim_3"
      )
      .required("bend_angle_lim_2 vaaditaan"),
    bend_angle_lim_3: yupNumber()
      .min(
        yupRef("bend_angle_lim_2"),
        "bend_angle_lim_3 ei voi olla pienempi kun bend_angle_lim_2"
      )
      .max(
        yupRef("bend_angle_lim_4"),
        "bend_angle_lim_3 ei voi olla isompi kun bend_angle_lim_4"
      )
      .required("bend_angle_lim_3 vaaditaan"),
    bend_angle_lim_4: yupNumber()
      .min(
        yupRef("bend_angle_lim_3"),
        "bend_angle_lim_4 ei voi olla pienempi kun bend_angle_lim_3"
      )
      .lessThan(360, "pitää olla pienempi kun 360")
      .required("bend_angle_lim_4 vaaditaan"),
    PF_bend_angle_1: yupNumber()
      .min(0, "PF_bend_angle_1 ei voi olla negatiivinen")
      .required("PF_bend_angle_1 vaaditaan"),
    PF_bend_angle_2: yupNumber()
      .min(0, "PF_bend_angle_2 ei voi olla negatiivinen")
      .required("PF_bend_angle_2 vaaditaan"),
    PF_bend_angle_3: yupNumber()
      .min(0, "PF_bend_angle_3 ei voi olla negatiivinen")
      .required("PF_bend_angle_3 vaaditaan"),
    PF_bend_angle_4: yupNumber()
      .min(0, "PF_bend_angle_4 ei voi olla negatiivinen")
      .required("PF_bend_angle_4 vaaditaan"),
    PF_bend_angle_5: yupNumber()
      .min(0, "PF_bend_angle_5 ei voi olla negatiivinen")
      .required("PF_bend_angle_5 vaaditaan"),
  }),
  weightfactors: yupObject().shape({
    WF_bend: yupNumber()
      .min(0, "Mutka (WF bend) ei voi olla negatiivinen")
      .required("Mutka (WF bend) vaaditaan"),
    WF_channel: yupNumber()
      .min(0, "Väylä (WF channel) ei voi olla negatiivinen")
      .required("Väylä (WF channel) vaaditaan"),
    WF_light_pollution: yupNumber()
      .min(
        0,
        "Taustavalon voimakkuus (WF light pollution) ei voi olla negatiivinen"
      )
      .required("Taustavalon voimakkuus (WF light pollution) vaaditaan"),
    WF_reduced_visibility: yupNumber()
      .min(
        0,
        "Heikentynyt näkyvyys (WF reduced visibility) ei voi olla negatiivinen"
      )
      .required("Heikentynyt näkyvyys (WF reduced visibility) vaaditaan"),
    WF_s_bend: yupNumber()
      .min(0, "S-mutka (WF S-bend) ei voi olla negatiivinen")
      .required("S-mutka (WF S-bend) vaaditaan"),
    WF_u_bend: yupNumber()
      .min(0, "U-mutka (WF U-bend) ei voi olla negatiivinen")
      .required("U-mutka (WF U-bend) vaaditaan"),
    WF_traffic_complexity: yupNumber()
      .min(
        0,
        "Liikenteen monimutkaisuus (WF traffic complexity) ei voi olla negatiivinen"
      )
      .required("Liikenteen monimutkaisuus (WF traffic complexity) vaaditaan"),
  }),
  channel_depth_wf: yupObject().shape({
    deep_inner_channel: yupNumber()
      .min(0, "deep_inner_channel ei voi olla negatiivinen")
      .required("deep_inner_channel vaaditaan"),
    deep_outer_channel: yupNumber()
      .min(0, "deep_outer_channel ei voi olla negatiivinen")
      .required("deep_outer_channel vaaditaan"),
    medium_deep_inner_channel: yupNumber()
      .min(0, "medium_deep_inner_channel ei voi olla negatiivinen")
      .required("medium_deep_inner_channel vaaditaan"),
    medium_deep_outer_channel: yupNumber()
      .min(0, "medium_deep_outer_channel ei voi olla negatiivinen")
      .required("medium_deep_outer_channel vaaditaan"),
    shallow_inner_channel: yupNumber()
      .min(0, "shallow_inner_channel ei voi olla negatiivinen")
      .required("shallow_inner_channel vaaditaan"),
    shallow_outer_channel: yupNumber()
      .min(0, "shallow_outer_channel ei voi olla negatiivinen")
      .required("shallow_outer_channel vaaditaan"),
  }),
  bank_clearance_wf: yupObject().shape({
    edge_category_gentle_fast: yupNumber()
      .min(0, "edge_category_gentle_fast ei voi olla negatiivinen")
      .required("edge_category_gentle_fast vaaditaan"),
    edge_category_gentle_moderate: yupNumber()
      .min(0, "edge_category_gentle_moderate ei voi olla negatiivinen")
      .required("edge_category_gentle_moderate vaaditaan"),
    edge_category_gentle_slow: yupNumber()
      .min(0, "edge_category_gentle_slow ei voi olla negatiivinen")
      .required("edge_category_gentle_slow vaaditaan"),
    edge_category_sloping_fast: yupNumber()
      .min(0, "edge_category_sloping_fast ei voi olla negatiivinen")
      .required("edge_category_sloping_fast vaaditaan"),
    edge_category_sloping_moderate: yupNumber()
      .min(0, "edge_category_sloping_moderate ei voi olla negatiivinen")
      .required("edge_category_sloping_moderate vaaditaan"),
    edge_category_sloping_slow: yupNumber()
      .min(0, "edge_category_sloping_slow ei voi olla negatiivinen")
      .required("edge_category_sloping_slow vaaditaan"),
    edge_category_steep_fast: yupNumber()
      .min(0, "edge_category_steep_fast ei voi olla negatiivinen")
      .required("edge_category_steep_fast vaaditaan"),
    edge_category_steep_moderate: yupNumber()
      .min(0, "edge_category_steep_moderate ei voi olla negatiivinen")
      .required("edge_category_steep_moderate vaaditaan"),
    edge_category_steep_slow: yupNumber()
      .min(0, "edge_category_steep_slow ei voi olla negatiivinen")
      .required("edge_category_steep_slow vaaditaan"),
  }),
  wind_wf: yupObject({
    mild_wind_fast_vessel: yupNumber()
      .min(0, "mild_wind_fast_vessel ei voi olla negatiivinen")
      .required("mild_wind_fast_vessel vaaditaan"),
    mild_wind_moderate_vessel: yupNumber()
      .min(0, "mild_wind_moderate_vessel ei voi olla negatiivinen")
      .required("mild_wind_moderate_vessel vaaditaan"),
    mild_wind_slow_vessel: yupNumber()
      .min(0, "mild_wind_slow_vessel ei voi olla negatiivinen")
      .required("mild_wind_slow_vessel vaaditaan"),

    moderate_wind_fast_vessel: yupNumber()
      .min(0, "moderate_wind_fast_vessel ei voi olla negatiivinen")
      .required("moderate_wind_fast_vessel vaaditaan"),
    moderate_wind_moderate_vessel: yupNumber()
      .min(0, "moderate_wind_moderate_vessel ei voi olla negatiivinen")
      .required("moderate_wind_moderate_vessel vaaditaan"),
    moderate_wind_slow_vessel: yupNumber()
      .min(0, "moderate_wind_slow_vessel ei voi olla negatiivinen")
      .required("moderate_wind_slow_vessel vaaditaan"),

    strong_wind_fast_vessel: yupNumber()
      .min(0, "strong_wind_fast_vessel ei voi olla negatiivinen")
      .required("strong_wind_fast_vessel vaaditaan"),
    strong_wind_moderate_vessel: yupNumber()
      .min(0, "strong_wind_moderate_vessel ei voi olla negatiivinen")
      .required("strong_wind_moderate_vessel vaaditaan"),
    strong_wind_slow_vessel: yupNumber()
      .min(0, "strong_wind_slow_vessel ei voi olla negatiivinen")
      .required("strong_wind_slow_vessel vaaditaan"),
  }),
  S_bend_multipliers: yupObject({
    S_bend_multiplier_1: yupNumber()
      .min(0, "S_bend_multiplier_1 ei voi olla negatiivinen")
      .max(
        yupRef("S_bend_multiplier_2"),
        "S_bend_multiplier_1 ei voi olla isompi kun S_bend_multiplier_2"
      ),
    S_bend_multiplier_2: yupNumber()
      .min(
        yupRef("S_bend_multiplier_1"),
        "S_bend_multiplier_2 ei voi olla pienempi kun S_bend_multiplier_1"
      )
      .max(
        yupRef("S_bend_multiplier_2"),
        "S_bend_multiplier_2 ei voi olla isompi kun S_bend_multiplier_3"
      ),
    S_bend_multiplier_3: yupNumber()
      .min(
        yupRef("S_bend_multiplier_2"),
        "S_bend_multiplier_3 ei voi olla pienempi kun S_bend_multiplier_2"
      )
      .max(
        yupRef("S_bend_multiplier_4"),
        "S_bend_multiplier_3 ei voi olla isompi kun S_bend_multiplier_4"
      ),
    S_bend_multiplier_4: yupNumber()
      .min(
        yupRef("S_bend_multiplier_3"),
        "S_bend_multiplier_4 ei voi olla pienempi kun S_bend_multiplier_3"
      )
      .max(
        yupRef("S_bend_multiplier_5"),
        "S_bend_multiplier_4 ei voi olla isompi kun S_bend_multiplier_5"
      ),
    S_bend_multiplier_5: yupNumber().min(
      yupRef("S_bend_multiplier_4"),
      "S_bend_multiplier_5 ei voi olla pienempi kun S_bend_multiplier_4"
    ),
  }),
  U_bend_multipliers: yupObject({
    U_bend_multiplier_1: yupNumber()
      .min(0, "U_bend_multiplier_1 ei voi olla negatiivinen")
      .max(
        yupRef("U_bend_multiplier_2"),
        "U_bend_multiplier_1 ei voi olla isompi kun U_bend_multiplier_2"
      ),
    U_bend_multiplier_2: yupNumber()
      .min(
        yupRef("U_bend_multiplier_1"),
        "U_bend_multiplier_2 ei voi olla pienempi kun U_bend_multiplier_1"
      )
      .max(
        yupRef("U_bend_multiplier_2"),
        "U_bend_multiplier_2 ei voi olla isompi kun U_bend_multiplier_3"
      ),
    U_bend_multiplier_3: yupNumber()
      .min(
        yupRef("U_bend_multiplier_2"),
        "U_bend_multiplier_3 ei voi olla pienempi kun U_bend_multiplier_2"
      )
      .max(
        yupRef("U_bend_multiplier_4"),
        "U_bend_multiplier_3 ei voi olla isompi kun U_bend_multiplier_4"
      ),
    U_bend_multiplier_4: yupNumber()
      .min(
        yupRef("U_bend_multiplier_3"),
        "U_bend_multiplier_4 ei voi olla pienempi kun U_bend_multiplier_3"
      )
      .max(
        yupRef("U_bend_multiplier_5"),
        "U_bend_multiplier_4 ei voi olla isompi kun U_bend_multiplier_5"
      ),
    U_bend_multiplier_5: yupNumber().min(
      yupRef("U_bend_multiplier_4"),
      "U_bend_multiplier_5 ei voi olla pienempi kun U_bend_multiplier_4"
    ),
  }),
});

export default parametersValidationSchema;
