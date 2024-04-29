import type { POINTS_TYPES } from '../const';
import type { CamelizeObject, WithDate } from './utils';

type PointType = (typeof POINTS_TYPES)[number];

interface ServerWayPoint {
  id: string;
  base_price: number;
  date_from: string;
  date_to: string;
  destination: string;
  is_favorite: boolean;
  offers: string[];
  type: PointType;
}

type WayPoint = WithDate<CamelizeObject<ServerWayPoint>>;

export type { WayPoint, PointType };
