import type { POINTS_TYPES } from '../const';
import type { CamelizeObject, WithDate } from './utils';
import type { InnerOffer } from './offer';
import type { Destination } from './destination';

type PointType = (typeof POINTS_TYPES)[number];

interface ServerWayPoint {
  id: string;
  base_price: number;
  date_from: string;
  date_to: string;
  destination: Destination['id'];
  is_favorite: boolean;
  offers: InnerOffer['id'][];
  type: PointType;
}

type WayPoint = WithDate<CamelizeObject<ServerWayPoint>>;

export type { WayPoint, PointType };
