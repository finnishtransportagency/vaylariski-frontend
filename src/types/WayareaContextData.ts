import { WayareaName } from './WayareaName.ts';

export type WayareaContextData = {
  readonly wayareaNames: WayareaName[];
  readonly selected?: WayareaName;
  readonly isLoaded: number;
  readonly isNoGdoGid: boolean;
  readonly isChanged: boolean;
};
