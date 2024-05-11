import View from '../framework/view/view';

const createTemplate = (): string => '<ul class="trip-events__list"></ul>';

export default class ListView extends View<HTMLUListElement> {
  get template(): string {
    return createTemplate();
  }
}
