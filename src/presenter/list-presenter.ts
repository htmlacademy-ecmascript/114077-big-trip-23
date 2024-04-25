import { render } from '../render';
import { type TemplateElement } from '../view/abstract-element';

import ListView from '../view/list-view';
import ListItemView from '../view/list-item-view';

import WayPointView from '../view/way-point-view';
import AddNewPointView from '../view/add-new-point-view';
// import EditPointView from '../view/edit-point-view';

export default class ListPresenter {
  mainContainer;
  taskListElement = new ListView();

  constructor({ mainContainer }) {
    this.mainContainer = mainContainer;
  }

  _renderListItem(element: TemplateElement) {
    const listItem = new ListItemView();

    render(listItem, this.taskListElement.element);
    render(element, listItem.element);
  }

  init() {
    render(this.taskListElement, this.mainContainer);

    this._renderListItem(new AddNewPointView());
    this.renderWaypointList(3);
  }

  renderWaypointList(count: number): void {
    for (let i = 0; i < count; i++) {
      this._renderListItem(new WayPointView());
    }
  }
}
