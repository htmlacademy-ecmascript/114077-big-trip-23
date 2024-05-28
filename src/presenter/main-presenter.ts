import { render } from '../framework/render';

import { FilterPresenter, SortPresenter, WayPointPresenter } from './index';
import ListView from '../view/list-view';

import type { WayPoint } from '../types/way-point';
import type { WayPointsModel } from '../model';
import ListNoItemView from '../view/list-no-item-view';

const siteHeaderElement = <HTMLElement>document.querySelector('header.page-header');
const siteMainElement = <HTMLElement>document.querySelector('main.page-main');

const filterContainer = <HTMLElement>siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsContainer = <HTMLElement>siteMainElement.querySelector('.trip-events');

export default class MainPresenter {
  #filterContainer: HTMLElement = filterContainer;
  #listContainer : HTMLElement = tripEventsContainer;

  #listElement: ListView = new ListView();

  #sortPresenter;
  #filterPresenter;

  readonly #models;
  readonly #wayPointsModel: WayPointsModel;

  constructor({ ...models }) {

    this.#models = models;
    this.#wayPointsModel = models.wayPointsModel;

    this.#filterPresenter = new FilterPresenter({ container: this.#filterContainer });
    this.#sortPresenter = new SortPresenter({ container: this.#listContainer });

    const wayPoints: WayPoint[] = this.#wayPointsModel.wayPoints;
    this.renderWaypointList(wayPoints);
  }

  renderWaypointList(wayPoints: WayPoint[]): void {
    if (!wayPoints.length) {
      render(new ListNoItemView(), this.#listContainer);
    } else {
      this.#sortPresenter.init();

      wayPoints.forEach(this.#renderWayPoint.bind(this));
      render(this.#listElement, this.#listContainer);
    }
  }

  #renderWayPoint(wayPoint) {
    return new WayPointPresenter({
      container: this.#listElement.element,
      wayPoint,
      ...this.#models,
    });
  }
}
