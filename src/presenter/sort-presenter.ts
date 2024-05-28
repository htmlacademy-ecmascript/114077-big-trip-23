import { render } from '../framework/render';
import ListSortView from '../view/list-sort-view';

export default class SortPresenter {
  readonly #container: HTMLElement;
  #content = new ListSortView();

  constructor({ container }) {
    this.#container = container;

  }

  init() {
    render(this.#content, this.#container);
  }
}
