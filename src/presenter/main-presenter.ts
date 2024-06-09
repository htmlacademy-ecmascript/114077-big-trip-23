import { remove, render } from '../framework/render';
import { updateItem } from '../utils/common';
import { prepareSortValue, sortByDate, sortByEvent, sortByOffers, sortByPrice } from '../utils/sort-waypoints';

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

  #sourcedWayPoints: WayPoint[] = [];

  readonly #models;
  readonly #wayPointsModel: WayPointsModel;
  readonly #destinationsModel: DestinationsModel;
  readonly #offersModel: OffersModel;

  constructor({ ...models }) {
    this.#models = models;

    this.#wayPointsModel = models.wayPointsModel;
    this.#destinationsModel = models.destinationsModel;
    this.#offersModel = models.offersModel;

    this.#filterPresenter = new FilterPresenter({
      container: this.#filterContainer,
    });

    this.#sortPresenter = new SortPresenter({
      container: this.#listContainer,
      onSortTypeChange: this.#handleSortType.bind(this),
    });
  }

  init() {
    this.#wayPoints = [...this.#wayPointsModel.wayPoints];
    this.#sourcedWayPoints = [...this.#wayPointsModel.wayPoints];
    this.#renderWaypointList(this.#wayPoints);
  }

  #renderWaypointList(wayPoints: WayPoint[]): void {
    if (!wayPoints.length) {
      this.#sortPresenter.destroy();
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
    this.#sourcedWayPoints = updateItem(this.#sourcedWayPoints, updatedWayPoint);

    this.#wayPointPresenters.get(updatedWayPoint.id)!.init(updatedWayPoint);
  };

  #handleModeChange = (activeId: string | null = null) => {
    if (this.#openedWayPointId && activeId) {
      this.#wayPointPresenters.get(this.#openedWayPointId)!.resetView();
    }

    this.#openedWayPointId = activeId;
  };

  #handleSortType(value) {
    const preparedValue = prepareSortValue(value);

    switch (preparedValue) {
      case 'day':
        this.#wayPoints.sort(sortByDate);
        break;

      case 'event':
        this.#wayPoints.sort(sortByEvent(this.#destinationsModel));
        break;

      case 'time':
        this.#wayPoints = [...this.#sourcedWayPoints]; // TODO: посмотреть в ТЗ как сортировать
        break;

      case 'price':
        this.#wayPoints.sort(sortByPrice(this.#offersModel));
        break;

      case 'offer':
        this.#wayPoints.sort(sortByOffers);
        break;

      default:
        this.#wayPoints = [...this.#sourcedWayPoints];
    }

    this.#clearWayPoints();
    this.#renderWaypointList(this.#wayPoints);
  }

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

  #clearWayPoints() {
    this.#wayPointPresenters.forEach((presenter) => presenter.destroy());
    this.#wayPointPresenters.clear();

    remove(this.#listComponent);
  }
}
