import { render } from './render';
import ListFilter from './view/list-filter-view';
import ListSortView from './view/list-sort-view';

import ListPresenter from './presenter/list-presenter';

const siteHeaderElement = <HTMLElement>document.querySelector('header.page-header');
const siteMainElement = <HTMLElement>document.querySelector('main.page-main');

const filterContainer = <HTMLElement>siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsContainer = <HTMLElement>siteMainElement.querySelector('.trip-events');

render(new ListFilter(), filterContainer);
render(new ListSortView(), tripEventsContainer);

const listPresenter: ListPresenter = new ListPresenter({ mainContainer: tripEventsContainer });
listPresenter.init();
