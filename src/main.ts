import { render } from './render';
import ListFilter from './view/list-filter-view';
import ListSortView from './view/list-sort-view';

import ListPresenter from './presenter/list-presenter';

const siteHeaderElement = document.querySelector('header.page-header')! as Element;
const siteMainElement = document.querySelector('main.page-main')! as Element;

const filterContainer = siteHeaderElement.querySelector('.trip-controls__filters')! as Element;

const tripEventsContainer = siteMainElement.querySelector('.trip-events')! as Element;

render(new ListFilter(), filterContainer);
render(new ListSortView(), tripEventsContainer);

const listPresenter: ListPresenter = new ListPresenter({ mainContainer: tripEventsContainer });
listPresenter.init();
