import View from '../framework/view/view';

const createItem = ({ name, isDisabled }, isChecked) => `
  <div class="trip-sort__item  trip-sort__item--${name}">
    <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
    <label class="trip-sort__btn" for="sort-${name}">${name}</label>
  </div>
`;

const createTemplate = ({ items }) => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${items.map((item, index) => createItem(item, index === 0)).join('')}
  </form>
`;

export default class ListSortView extends View<HTMLFormElement> {
  readonly #props;

  constructor(props) {
    super();

    this.#props = props;
  }

  get template(): string {
    return createTemplate(this.#props);
  }
}
