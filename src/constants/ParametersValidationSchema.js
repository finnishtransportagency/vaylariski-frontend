import * as Yup from "yup";

const parametersValidationSchema = Yup.object().shape({
  navline: Yup.object().shape({
    VAYLAT: Yup.number()
      .min(1, "VAYLAT id ei voi olla negatiivinen")
      .required("VAYLAT id vaaditaan"),
    calculation_params: Yup.object().shape({
      other: Yup.object().shape({
        visibility: Yup.number()
          .min(0, "visibility ei voi olla negatiivinen")
          .required("visibility vaaditaan"),
      }),
    }),
  }),

  boat: Yup.object().shape({
    length: Yup.number()
      .min(1, "pituus ei voi olla negatiivinen")
      .required("pituus vaaditaan"),
    beam: Yup.number()
      .min(1, "leveys ei voi olla negatiivinen")
      .required("leveys vaaditaan"),
    draft: Yup.number()
      .min(1, "syväys ei voi olla negatiivinen")
      .required("syväys vaaditaan"),
  }),

  PF_bend_parameters: Yup.object().shape({
    bend_ratio_lim_1: Yup.number()
      .min(0, "ei voi olla negatiivinen")
      .max(
        Yup.ref("bend_ratio_lim_2"),
        "ei voi olla isompi kun bend_ratio_lim_2"
      )
      .required("vaaditaan"),
    bend_ratio_lim_2: Yup.number()
      .min(
        Yup.ref("bend_ratio_lim_1"),
        "ei voi olla pienempi kun bend_ratio_lim_1"
      )
      .max(
        Yup.ref("bend_ratio_lim_3"),
        "ei voi olla isompi kun bend_ratio_lim_3"
      )
      .required("vaaditaan"),
    bend_ratio_lim_3: Yup.number()
      .min(
        Yup.ref("bend_ratio_lim_2"),
        "ei voi olla pienempi kun bend_ratio_lim_2"
      )
      .max(
        Yup.ref("bend_ratio_lim_4"),
        "ei voi olla isompi kun bend_ratio_lim_4"
      )
      .required("vaaditaan"),
    bend_ratio_lim_4: Yup.number()
      .min(
        Yup.ref("bend_ratio_lim_3"),
        "ei voi olla pienempi kun bend_ratio_lim_4"
      )
      .required("vaaditaan"),
    PF_bend_radius_1: Yup.number()
      .min(0, "ei voi olla negatiivinen")
      .required("vaaditaan"),
    PF_bend_radius_2: Yup.number()
      .min(0, "ei voi olla negatiivinen")
      .required("vaaditaan"),
    PF_bend_radius_3: Yup.number()
      .min(0, "ei voi olla negatiivinen")
      .required("vaaditaan"),
    PF_bend_radius_4: Yup.number()
      .min(0, "ei voi olla negatiivinen")
      .required("vaaditaan"),
    PF_bend_radius_5: Yup.number()
      .min(0, "ei voi olla negatiivinen")
      .required("vaaditaan"),
    bend_angle_lim_1: Yup.number()
      .min(0, "ei voi negatiivinen")
      .max(
        Yup.ref("bend_angle_lim_2"),
        "ei voi olla isompi kun bend_angle_lim_2"
      )
      .required("vaaditaan"),
    bend_angle_lim_2: Yup.number()
      .min(
        Yup.ref("bend_angle_lim_1"),
        "ei voi olla pienempi kun bend_angle_lim_1"
      )
      .max(
        Yup.ref("bend_angle_lim_3"),
        "ei voi olla isompi kun bend_angle_lim_3"
      )
      .required("vaaditaan"),
    bend_angle_lim_3: Yup.number()
      .min(
        Yup.ref("bend_angle_lim_3"),
        "ei voi olla pienempi kun bend_angle_lim_3"
      )
      .max(
        Yup.ref("bend_angle_lim_4"),
        "ei voi olla isompi kun bend_angle_lim_4"
      )
      .required("vaaditaan"),
    bend_angle_lim_4: Yup.number()
      .min(
        Yup.ref("bend_angle_lim_3"),
        "ei voi olla pienempi kun bend_angle_lim_3"
      )
      .lessThan(360, "pitää olla pienempi kun 360")
      .required("vaaditaan"),
    PF_bend_angle_1: Yup.number()
      .min(0, "ei voi olla negatiivinen")
      .required("vaaditaan"),
    PF_bend_angle_2: Yup.number()
      .min(0, "ei voi olla negatiivinen")
      .required("vaaditaan"),
    PF_bend_angle_3: Yup.number()
      .min(0, "ei voi olla negatiivinen")
      .required("vaaditaan"),
    PF_bend_angle_4: Yup.number()
      .min(0, "ei voi olla negatiivinen")
      .required("vaaditaan"),
    PF_bend_angle_5: Yup.number()
      .min(0, "ei voi olla negatiivinen")
      .required("vaaditaan"),
  }),
  weightfactors: Yup.object().shape({
    WF_bend: Yup.number()
      .min(0, "Mutka (WF bend) ei voi olla negatiivinen")
      .required("Mutka (WF bend) vaaditaan"),
    WF_channel: Yup.number()
      .min(0, "Väylä (WF channel) ei voi olla negatiivinen")
      .required("Väylä (WF channel) vaaditaan"),
    WF_light_pollution: Yup.number()
      .min(
        0,
        "Taustavalon voimakkuus (WF light pollution) ei voi olla negatiivinen"
      )
      .required("Taustavalon voimakkuus (WF light pollution) vaaditaan"),
    WF_reduced_visibility: Yup.number()
      .min(
        0,
        "Heikentynyt näkyvyys (WF reduced visibility) ei voi olla negatiivinen"
      )
      .required("Heikentynyt näkyvyys (WF reduced visibility) vaaditaan"),
    WF_s_bend: Yup.number()
      .min(0, "S-mutka (WF S-bend) ei voi olla negatiivinen")
      .required("S-mutka (WF S-bend) vaaditaan"),
    WF_traffic_complexity: Yup.number()
      .min(
        0,
        "Liikenteen monimutkaisuus (WF traffic complexity) ei voi olla negatiivinen"
      )
      .required("Liikenteen monimutkaisuus (WF traffic complexity) vaaditaan"),
  }),
  channel_depth_wf: Yup.object().shape({
    deep_inner_channel: Yup.number()
      .min(0, "deep_inner_channel ei voi olla negatiivinen")
      .required("deep_inner_channel vaaditaan"),
    deep_outer_channel: Yup.number()
      .min(0, "deep_outer_channel ei voi olla negatiivinen")
      .required("deep_outer_channel vaaditaan"),
    medium_deep_inner_channel: Yup.number()
      .min(0, "medium_deep_inner_channel ei voi olla negatiivinen")
      .required("medium_deep_inner_channel vaaditaan"),
    medium_deep_outer_channel: Yup.number()
      .min(0, "medium_deep_outer_channel ei voi olla negatiivinen")
      .required("medium_deep_outer_channel vaaditaan"),
    shallow_inner_channel: Yup.number()
      .min(0, "shallow_inner_channel ei voi olla negatiivinen")
      .required("shallow_inner_channel vaaditaan"),
    shallow_outer_channel: Yup.number()
      .min(0, "shallow_outer_channel ei voi olla negatiivinen")
      .required("shallow_outer_channel vaaditaan"),
  }),
  bank_clearance_wf: Yup.object().shape({
    edge_category_gentle_fast: Yup.number()
      .min(0, "edge_category_gentle_fast ei voi olla negatiivinen")
      .required("edge_category_gentle_fast vaaditaan"),
    edge_category_gentle_moderate: Yup.number()
      .min(0, "edge_category_gentle_moderate ei voi olla negatiivinen")
      .required("edge_category_gentle_moderate vaaditaan"),
    edge_category_gentle_slow: Yup.number()
      .min(0, "edge_category_gentle_slow ei voi olla negatiivinen")
      .required("edge_category_gentle_slow vaaditaan"),
    edge_category_sloping_fast: Yup.number()
      .min(0, "edge_category_sloping_fast ei voi olla negatiivinen")
      .required("edge_category_sloping_fast vaaditaan"),
    edge_category_sloping_moderate: Yup.number()
      .min(0, "edge_category_sloping_moderate ei voi olla negatiivinen")
      .required("edge_category_sloping_moderate vaaditaan"),
    edge_category_sloping_slow: Yup.number()
      .min(0, "edge_category_sloping_slow ei voi olla negatiivinen")
      .required("edge_category_sloping_slow vaaditaan"),
    edge_category_steep_fast: Yup.number()
      .min(0, "edge_category_steep_fast ei voi olla negatiivinen")
      .required("edge_category_steep_fast vaaditaan"),
    edge_category_steep_moderate: Yup.number()
      .min(0, "edge_category_steep_moderate ei voi olla negatiivinen")
      .required("edge_category_steep_moderate vaaditaan"),
    edge_category_steep_slow: Yup.number()
      .min(0, "edge_category_steep_slow ei voi olla negatiivinen")
      .required("edge_category_steep_slow vaaditaan"),
  }),
  wind_wf: Yup.object({
    mild_wind_fast_vessel: Yup.number()
      .min(0, "ei voi olla negatiivinen")
      .required("vaaditaan"),
    mild_wind_moderate_vessel: Yup.number()
      .min(0, "ei voi olla negatiivinen")
      .required("vaaditaan"),
    mild_wind_slow_vessel: Yup.number()
      .min(0, "ei voi olla negatiivinen")
      .required("vaaditaan"),

    moderate_wind_fast_vessel: Yup.number()
      .min(0, "ei voi olla negatiivinen")
      .required("vaaditaan"),
    moderate_wind_moderate_vessel: Yup.number()
      .min(0, "ei voi olla negatiivinen")
      .required("vaaditaan"),
    moderate_wind_slow_vessel: Yup.number()
      .min(0, "ei voi olla negatiivinen")
      .required("vaaditaan"),

    strong_wind_fast_vessel: Yup.number()
      .min(0, "ei voi olla negatiivinen")
      .required("vaaditaan"),
    strong_wind_moderate_vessel: Yup.number()
      .min(0, "ei voi olla negatiivinen")
      .required("vaaditaan"),
    strong_wind_slow_vessel: Yup.number()
      .min(0, "ei voi olla negatiivinen")
      .required("vaaditaan"),
  }),
});

export default parametersValidationSchema;
