import LoadingSpinner from "./LoadingSpinner";
import NotificationComponent from "./NotificationComponent";
import MapView from "../views/MapView";
import ParameterTabsComponent from "./ParameterTabsComponent";
import RIVResultsTabsComponent from "./RIVResultsTabsComponent";

function CalculateRIV() {
  return (
    <>
      <NotificationComponent />
      <LoadingSpinner />
      <ParameterTabsComponent />
      <MapView />
      <RIVResultsTabsComponent />
    </>
  );
}

export default CalculateRIV;
