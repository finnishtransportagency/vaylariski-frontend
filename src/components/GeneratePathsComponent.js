import { calculationTypeEnums } from "constants/enums";

const GeneratePaths = async (
  values,
  selectedCalculationType,
  selectedRouteline
) => {
  let paths = {
    path: "",
    path_wayarea: "",
    path_navigationline: "",
    path_wayarea_navigationline: "",
    path_routeline: "",
    path_wayarea_routeline: "",
  };

  if (selectedCalculationType == calculationTypeEnums.ROUTELINE) {
    paths.path = `routeline/calculate_risk?routename=${encodeURIComponent(
      selectedRouteline
    )}`;
    paths.path_wayarea = `routeline/wayarea_polygons?routename=${encodeURIComponent(
      selectedRouteline
    )}`;
  } else if (selectedCalculationType == calculationTypeEnums.NAVIGATIONLINE) {
    paths.path = `fairway/calculate_risk?vaylat=${encodeURIComponent(
      values.vaylat
    )}`;
    paths.path_wayarea = `wayarea?vaylat=${encodeURIComponent(values.vaylat)}`;
  } else if (selectedCalculationType == calculationTypeEnums.COMPARE) {
    paths.path_navigationline = `fairway/calculate_risk?vaylat=${encodeURIComponent(
      values.vaylat
    )}`;
    paths.path_wayarea_navigationline = `wayarea?vaylat=${encodeURIComponent(
      values.vaylat
    )}`;
    paths.path_routeline = `routeline/calculate_risk?routename=${encodeURIComponent(
      selectedRouteline
    )}`;
    paths.path_wayarea_routeline = `routeline/wayarea_polygons?routename=${encodeURIComponent(
      selectedRouteline
    )}`;
  }
  return paths;
};

export { GeneratePaths };
