import { render } from '../framework/render';

import ListFilter from '../view/list-filter-view';

export default class FilterPresenter {
  readonly #container: HTMLElement;
  #content : ListFilter = new ListFilter();

  constructor({ container }) {
    this.#container = container;

    render(this.#content, this.#container);
  }
}
