import { render } from './render';

import ListFilter from './view/list-filter-view';
import ListSortView from './view/list-sort-view';
import { ListPresenter } from './presenter';

import MockService from './services/mock-service';
import { DestinationsModel, OffersModel, WayPointsModel } from './model';

const service: MockService = new MockService();

const models = {
  wayPointsModel: new WayPointsModel(service),
  offersModel: new OffersModel(service),
  destinationsModel: new DestinationsModel(service),
};

const siteHeaderElement = <HTMLElement>document.querySelector('header.page-header');
const siteMainElement = <HTMLElement>document.querySelector('main.page-main');

const filterContainer = <HTMLElement>siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsContainer = <HTMLElement>siteMainElement.querySelector('.trip-events');

render(new ListFilter(), filterContainer);
render(new ListSortView(), tripEventsContainer);

new ListPresenter({ container: tripEventsContainer, ...models });
