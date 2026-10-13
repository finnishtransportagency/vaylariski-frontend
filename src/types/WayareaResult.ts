import { Feature, FeatureCollection, Polygon } from 'geojson';
import { WayareaResultProperties } from './WayareaResultProperties.ts';

export type WayareaResult = FeatureCollection<Polygon, WayareaResultProperties>;

export type WayareaFeature = Feature<Polygon, WayareaResultProperties>;
