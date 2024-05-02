import Randomizer from '../utils/randomizer';
import { POINTS_TYPES } from '../const';
import { OFFERS } from './const.mock';
import type { InnerOffer, Offer } from '../types/offer';

const RANDOM_PRICE_FROM = 10;
const RANDOM_PRICE_TO = 10;

const RANDOM_OFFER_FROM = 0;
const RANDOM_OFFER_TO = 5;

const mockItem = (): InnerOffer => ({
  id: crypto.randomUUID(),
  title: Randomizer.getElement(OFFERS),
  price: Randomizer.getInteger(RANDOM_PRICE_FROM, RANDOM_PRICE_TO),
});

const mockOffer = (type: Offer['type']): Offer => ({
  type,
  offers: Array.from({ length: Randomizer.getInteger(RANDOM_OFFER_FROM, RANDOM_OFFER_TO) }, mockItem),
});

const mockOffers = (): Offer[] => POINTS_TYPES.map(mockOffer);

export { mockOffers };
