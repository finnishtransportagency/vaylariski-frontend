export type WayareaName = {
  readonly VAYLAT: number;
  readonly NIMIFI: string;
};

export function wayareaNameToString(wayareaName?: WayareaName) {
  return wayareaName ? `${wayareaName.VAYLAT} - ${wayareaName.NIMIFI}` : '';
}
