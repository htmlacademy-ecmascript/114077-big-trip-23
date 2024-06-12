import Randomizer from '../utils/randomizer';
import { appDay } from '../utils/time';
import type { WayPoint } from '../types/way-point';

const RANDOM_PRICE_FROM = 10;
const RANDOM_PRICE_TO = 5000;

const getRandomDay = () => Randomizer.getInteger(0, 7);
const getRandomHour = () => Randomizer.getInteger(0, 23);
const getRandomMinute = () => Randomizer.getInteger(0, 59);

const getDates = (): { dateTo: WayPoint['dateTo']; dateFrom: WayPoint['dateFrom'] } => {
  const dateFrom = appDay().subtract(getRandomDay(), 'day').subtract(getRandomHour(), 'hour').subtract(getRandomMinute(), 'minute');

  const dateTo = dateFrom.add(getRandomDay(), 'day').add(getRandomHour(), 'hour').add(getRandomMinute(), 'minute');

  return { dateTo: dateTo.toString(), dateFrom: dateFrom.toString() };
};

const mockWayPoint = (props: Pick<WayPoint, 'destination' | 'offers' | 'type'>): WayPoint => {
  const offersIDs: string[] = props.offers.slice(0, Randomizer.getInteger(1, props.offers.length));

  return {
    id: crypto.randomUUID(),
    basePrice: Randomizer.getInteger(RANDOM_PRICE_FROM, RANDOM_PRICE_TO),
    ...getDates(),
    destination: props.destination,
    isFavorite: Randomizer.boolean,
    offers: offersIDs,
    type: props.type,
  };
};

export { mockWayPoint };
