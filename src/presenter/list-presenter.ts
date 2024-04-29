import { render } from '../render';
import { AbstractView } from '../view/abstract-view';

import ListView from '../view/list-view';
import ListItemView from '../view/list-item-view';

import WayPointView from '../view/way-point-view';
import AddNewPointView from '../view/add-new-point-view';

export default class ListPresenter {
  mainContainer;
  taskListElement: ListView = new ListView();

  constructor({ mainContainer }) {
    this.mainContainer = mainContainer;
  }

  #renderListItem(element: AbstractView<Element>) {
    const listItem: ListItemView = new ListItemView();

    render(listItem, this.taskListElement.element);
    render(element, listItem.element);
  }

  init() {
    render(this.taskListElement, this.mainContainer);

    this.#renderListItem(new AddNewPointView());
    this.renderWaypointList(3);
  }

  renderWaypointList(count: number): void {
    for (let i = 0; i < count; i++) {
      this.#renderListItem(new WayPointView());
    }
  }
}
