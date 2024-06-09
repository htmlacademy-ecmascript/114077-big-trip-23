import { render } from '../framework/render';
import { SORT_TYPES } from '../const';

import ListSortView from '../view/list-sort-view';
import Randomizer from '../utils/randomizer';

export default class SortPresenter {
  readonly #container: HTMLElement;
  readonly #content: ListSortView;

  constructor({ container, onSortTypeChange }) {
    this.#container = container;

    const items = SORT_TYPES.map((name) => ({ name, isDisabled: Randomizer.boolean }));
    this.#content = new ListSortView({ items, onSortTypeChange });
  }

  init() {
    render(this.#content, this.#container);
  }
}
