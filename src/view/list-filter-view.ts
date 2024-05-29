import View from '../framework/view/view';

const createFilterItem = ({ name }, isChecked): string => `
  <div class="trip-filters__filter">
    <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
  </div>
`;

const createTemplate = ({ filters }): string => `
  <form class="trip-filters" action="#" method="get">
    ${filters.map((item, index) => createFilterItem(item, index === 0)).join('')}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
`;

export default class ListFilter extends View<HTMLFormElement> {
  readonly #props;

  constructor(props) {
    super();

    this.#props = props;
  }

  get template(): string {
    return createTemplate(this.#props);
  }
}
