import { sortByDate } from '../utils/sort-waypoints';

import type MockService from '../services/mock-service';
import type { WayPoint } from '../types/way-point';

export default class WayPointsModel {
  readonly #service: MockService | null = null;
  readonly #wayPoints: WayPoint[] = [];

  constructor(service: MockService) {
    this.#service = service;
    this.#wayPoints = this.#service.wayPoints;
  }

  get wayPoints() {
    return this.#wayPoints.sort(sortByDate);
  }

  getWayPointsBy(index) {
    return this.#wayPoints.slice().splice(0, index);
  }
}
