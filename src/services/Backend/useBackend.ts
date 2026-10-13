import { RivResult as RiskResult, RivFeature } from '../../types/RivResult.ts';
import { WayareaPolygon } from '../../types/WayareaPolygon.ts';
import { RiskParameters } from '../../types/RiskParameters.ts';
import { useSpinner } from '../../contexts/SpinnerContext.tsx';
import { TestResult } from '../../types/TestResult.ts';
import { DefaultShip } from '../../types/DefaultShip.ts';
import { WayareaPolygonRoute } from '../../types/WayareaPolygonRoute.ts';
import useHttp from './http-common.ts';
import { WayareaName } from '../../types/WayareaName.ts';

export default function useBackend() {
  const { setSpinnerVisibility } = useSpinner();
  const { get, post } = useHttp();

  async function fetchTest(): Promise<TestResult | undefined> {
    return await get<TestResult, undefined>('app');
  }

  async function fetchAllDefaultShips(): Promise<DefaultShip[]> {
    setSpinnerVisibility(true);
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

    setSpinnerVisibility(false);
    return boats;
  }

  async function fetchWayareaNames(): Promise<WayareaName[]> {
    setSpinnerVisibility(true);
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

    setSpinnerVisibility(false);
    return wayareas;
  }

  async function fetchGdoGidsForVaylat(VAYLAT: number): Promise<number[]> {
    setSpinnerVisibility(true);
    const response = await get<
      { readonly GDO_GID: number[] },
      { readonly VAYLAT: number }
    >('gdo_gids_for_vaylat', { VAYLAT });
    setSpinnerVisibility(false);
    return response?.GDO_GID ?? [];
  }

  async function fetchRoutelineNames(): Promise<string[]> {
    setSpinnerVisibility(true);
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

    setSpinnerVisibility(false);
    return routelines;
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

  async function fetchRoutelineRisk(
    routename: string,
    parameters: RiskParameters
  ): Promise<RiskResult | undefined> {
    setSpinnerVisibility(true);

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
    setSpinnerVisibility(false);
    return risks;
  }

  async function fetchRoutelineChannel(
    routename: string,
    boatDraft: number
  ): Promise<WayareaPolygonRoute | undefined> {
    setSpinnerVisibility(true);

    const channel = get<WayareaPolygonRoute, undefined>(
      `routeline/wayarea_polygons?routename=${encodeURIComponent(
        routename
      )}&draft=${encodeURIComponent(boatDraft)}`
    );

    // TODO: Return and let the place that uses this
    //  store them into context and display them
    setSpinnerVisibility(false);
    return channel;
  }

  async function fetchCompareRisk(
    vaylat: number,
    routename: string,
    parameters: RiskParameters
  ): Promise<void> {
    const navigationLineRisks = await fetchNavigationlineRisk(
      vaylat,
      parameters
    );
    const navigationLineChannel = await fetchNavigationlineChannel(vaylat);
    const routeRisks = await fetchRoutelineRisk(routename, parameters);
    const routeChannel = await fetchRoutelineChannel(
      routename,
      parameters.boat.draft
    );

    // Do not change the order the concat is made! As the map zoom in MapView is dependent on it.
    // const concated_response = (navigationLineRisks ?? []).concat(
    //   routeRisks ?? []
    // );

    // TODO: Combine navigation line and route wayareas
  }

  async function fetchRiskValue(vaylat: number, values: RiskParameters) {
    // TODO: Add support for COMPARE and ROUTELINE once backend is finished
    return await fetchNavigationlineRisk(vaylat, values);
  }

  return {
    fetchWayareaNames,
    fetchAllDefaultShips,
    fetchGdoGidsForVaylat,
    fetchRoutelineNames,
    fetchNavigationlineRisk,
    fetchNavigationlineChannel,
    fetchTest,
  };
}
