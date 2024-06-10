import type { WayPoint } from '../types/way-point';
import { appDay } from './time';
import type { SortType } from '../const';
import type { DestinationsModel, OffersModel } from '../model';

function prepareSortValue(value: string): SortType {
  return value.replace('sort-', '') as SortType;
}

function sortByDate(wayPointA: WayPoint, wayPointB: WayPoint): number {
  return appDay(wayPointA.dateFrom).diff(wayPointB.dateFrom);
}

function sortByEvent(destinationsModel: DestinationsModel) {
  return function (wayPointA: WayPoint, wayPointB: WayPoint): number {
    const eventNameA = `${wayPointA.type} ${destinationsModel.getById(wayPointA.destination)?.name}`;
    const eventNameB = `${wayPointB.type} ${destinationsModel.getById(wayPointB.destination)?.name}`;

    return eventNameA.localeCompare(eventNameB);
  };
}

function sortByPrice(offersModel: OffersModel) {
  return function (wayPointA: WayPoint, wayPointB: WayPoint): number {
    const offerA = offersModel.getByType(wayPointA.type)!;
    const offerB = offersModel.getByType(wayPointB.type)!;

    const priceA = offerA.offers.reduce((a, b) => a + b.price, 0);
    const priceB = offerB.offers.reduce((a, b) => a + b.price, 0);

    return priceA - priceB;
  };
}

function sortByOffers(wayPointA: WayPoint, wayPointB: WayPoint): number {
  return wayPointA.offers.length - wayPointB.offers.length;
}

export { prepareSortValue, sortByDate, sortByEvent, sortByPrice, sortByOffers };
