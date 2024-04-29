import type { PointType } from './way-point';

interface InnerOffer {
  id: string;
  title: string;
  price: number;
}

interface Offer {
  type: PointType;
  offers: InnerOffer[];
}

export type { InnerOffer, Offer };
