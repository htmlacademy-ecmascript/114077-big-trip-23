import { render } from '../framework/render';
import { updateItem } from '../utils/common';

import { FilterPresenter, SortPresenter, WayPointPresenter } from './index';
import ListView from '../view/list-view';

import type { WayPoint } from '../types/way-point';
import type { WayPointsModel, DestinationsModel, OffersModel } from '../model';

import ListNoItemView from '../view/list-no-item-view';

const siteHeaderElement = <HTMLElement>document.querySelector('header.page-header');
const siteMainElement = <HTMLElement>document.querySelector('main.page-main');

const filterContainer = <HTMLElement>siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsContainer = <HTMLElement>siteMainElement.querySelector('.trip-events');

export default class MainPresenter {
  #filterContainer: HTMLElement = filterContainer;
  #listContainer: HTMLElement = tripEventsContainer;

  #listComponent: ListView = new ListView();

  #sortPresenter;
  #filterPresenter;

  #wayPoints: WayPoint[] = [];
  #openedWayPointId: string | null = null;
  #wayPointPresenters: Map<string, WayPointPresenter> = new Map();

  readonly #models;
  readonly #wayPointsModel: WayPointsModel;
  readonly #destinationsModel: DestinationsModel;
  readonly #offersModel: OffersModel;

  constructor({ ...models }) {
    this.#models = models;

    this.#wayPointsModel = models.wayPointsModel;
    this.#destinationsModel = models.destinationsModel;
    this.#offersModel = models.offersModel;

    this.#filterPresenter = new FilterPresenter({ container: this.#filterContainer });
    this.#sortPresenter = new SortPresenter({ container: this.#listContainer });
  }

  init() {
    this.#wayPoints = [...this.#wayPointsModel.wayPoints];
    this.#renderWaypointList(this.#wayPoints);
  }

  #renderWaypointList(wayPoints: WayPoint[]): void {
    if (!wayPoints.length) {
      render(new ListNoItemView(), this.#listContainer);
    } else {
      this.#sortPresenter.init();

      wayPoints.forEach((waypoint) => {
        this.#renderWayPoint(waypoint, this.#listComponent.element);
      });

      render(this.#listComponent, this.#listContainer);
    }
  }

  #handleTaskChange = (updatedWayPoint: WayPoint) => {
    this.#wayPoints = updateItem(this.#wayPoints, updatedWayPoint);
    this.#wayPointPresenters.get(updatedWayPoint.id)!.init(updatedWayPoint);
  };

  #handleModeChange = (activeId: string | null = null) => {
    if (this.#openedWayPointId && activeId) {
      this.#wayPointPresenters.get(this.#openedWayPointId)!.resetView();
    }

    this.#openedWayPointId = activeId;
  };

  #renderWayPoint(wayPoint: WayPoint, container: HTMLUListElement) {
    const wayPointPresenter = new WayPointPresenter({
      container,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,

      onDataChange: this.#handleTaskChange,
      onModeChange: this.#handleModeChange,
    });

    wayPointPresenter.init(wayPoint);
    this.#wayPointPresenters.set(wayPoint.id, wayPointPresenter);
  }
}
