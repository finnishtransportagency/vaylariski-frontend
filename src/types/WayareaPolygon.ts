export type WayareaPolygon = {
  readonly type: 'FeatureCollection';
  readonly features: {
    readonly id: number;
    readonly type: 'Feature';
    readonly properties: {
      readonly GDO_GID: number;
      readonly VAYLAT: number;
    };
    readonly geometry: {
      readonly type: 'Polygon';
      readonly coordinates: number[][][];
    };
  }[];
};
