import { render } from '../framework/render';

import { WayPointPresenter } from './index';
import ListView from '../view/list-view';

import type { WayPoint } from '../types/way-point';
import type { WayPointsModel, DestinationsModel, OffersModel } from '../model';

export default class ListPresenter {
  #container: HTMLElement;
  #listElement: ListView = new ListView();

  #wayPoints;
  #models;

  readonly #wayPointsModel: WayPointsModel;
  readonly #offersModel: OffersModel;
  readonly #destinationsModel: DestinationsModel;

  constructor({ container: container, ...models }) {
    this.#container = container;

    this.#models = models;
    this.#wayPointsModel = models.wayPointsModel;
    this.#destinationsModel = models.destinationsModel;
    this.#offersModel = models.offersModel;

    this.renderWaypointList();
  }

  private renderWaypointList(): void {
    const wayPoints: WayPoint[] = this.#wayPointsModel.wayPoints;

    this.#wayPoints = wayPoints.map(this.#renderWayPoint.bind(this));

    render(this.#listElement, this.#container);
  }

  #renderWayPoint(wayPoint) {
    return new WayPointPresenter({
      container: this.#listElement.element,
      wayPoint,
      ...this.#models,
    });
  }
}
