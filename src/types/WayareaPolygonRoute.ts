export type WayareaPolygonRoute = {
  readonly type: 'FeatureCollection';
  readonly features: {
    readonly id: number;
    readonly type: 'Feature';
    readonly properties: {
      readonly haraus_syv: number;
    };
    readonly geometry: {
      readonly type: 'Polygon';
      readonly coordinates: number[][][];
    };
  }[];
};
