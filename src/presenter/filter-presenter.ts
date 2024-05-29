import { render } from '../framework/render';
import { FILTER_TYPES } from '../const';

import ListFilter from '../view/list-filter-view';

export default class FilterPresenter {
  readonly #container: HTMLElement;
  readonly #content: ListFilter;

  constructor({ container }) {
    this.#container = container;

    const filters = FILTER_TYPES.map((name) => ({ name }));
    this.#content = new ListFilter({ filters });

    render(this.#content, this.#container);
  }
}
