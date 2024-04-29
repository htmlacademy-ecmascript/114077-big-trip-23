import Randomizer from '../utils/randomizer';
import { appDay } from '../utils/time';
import type { WayPoint } from '../types/way-point';

const RANDOM_PRICE_FROM = 10;
const RANDOM_PRICE_TO = 10;

const getRandomDay = () => Randomizer.getInteger(0, 7);
const getRandomHour = () => Randomizer.getInteger(0, 7);
const getRandomMinute = () => Randomizer.getInteger(0, 7);

const getDates = (): { dateTo: WayPoint['dateTo']; dateFrom: WayPoint['dateFrom'] } => {
  const dateFrom = appDay()
    .subtract(getRandomDay(), 'day')
    .subtract(getRandomHour(), 'hour')
    .subtract(Randomizer.getInteger(0, 59), 'minute');

  const dateTo = dateFrom.add(getRandomDay(), 'day').add(getRandomHour(), 'hour').add(getRandomMinute(), 'minute');

  return { dateTo, dateFrom };
};

const mockPoint = (destination: WayPoint['destination'], offers: WayPoint['offers'], type: WayPoint['type']): WayPoint => ({
  id: crypto.randomUUID(),
  basePrice: Randomizer.getInteger(RANDOM_PRICE_FROM, RANDOM_PRICE_TO),
  ...getDates(),
  destination,
  isFavorite: Randomizer.boolean,
  offers,
  type,
});

export { mockPoint };
