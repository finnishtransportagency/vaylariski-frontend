import { Feature, FeatureCollection, GeoJSON, Point } from 'geojson';
import { RivResultProperties } from './RivResultProperties.ts';

export type RivResult = FeatureCollection<Point, RivResultProperties>;

export type RivFeature = Feature<Point, RivResultProperties>;
