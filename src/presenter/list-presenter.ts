import { render } from '../render';
import { AbstractElement } from '../view/abstract-element';

import ListView from '../view/list-view';
import ListItemView from '../view/list-item-view';

import WayPointView from '../view/way-point-view';
import AddNewPointView from '../view/add-new-point-view';
// import EditPointView from '../view/edit-point-view';

export default class ListPresenter {
  mainContainer;
  taskListElement: ListView = new ListView();

  constructor({ mainContainer }) {
    this.mainContainer = mainContainer;
  }

  #renderListItem(element: Pick<AbstractElement, 'element'>) {
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
