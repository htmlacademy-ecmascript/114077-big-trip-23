import Randomizer from '../utils/randomizer';

import { POINTS_TYPES } from '../const';
import { mockWayPoint } from '../mocks/way-point';

import type { InnerOffer, Offer } from '../types/offer';
import type { WayPoint } from '../types/way-point';
import type { Destination } from '../types/destination';

import { mockDestinations } from '../mocks/destination';
import { mockOffers } from '../mocks/offer';

const WAY_POINT_COUNT = 10;

export default class MockService {
  readonly #destinations : Destination[] = mockDestinations();
  readonly #offers : Offer[] = mockOffers();
  readonly #wayPoints : WayPoint[] = [];

  constructor() {
    this.#wayPoints = this.#generateWayPoints();
  }

  #generateWayPoint() {
    const { id: destinationID } = Randomizer.getElement(this.destinations);
    const offerIDs = Randomizer.getElement(this.offers).offers.map(({ id } : InnerOffer) => id);
    const type = Randomizer.getElement(POINTS_TYPES);

    return mockWayPoint({
      destination: destinationID,
      offers: offerIDs,
      type
    });
  }

  #generateWayPoints() {
    return Array.from({ length: WAY_POINT_COUNT }, () => this.#generateWayPoint());
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get wayPoints() {
    return this.#wayPoints;
  }
}
