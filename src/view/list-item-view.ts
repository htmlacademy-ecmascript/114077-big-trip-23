import View from '../framework/view/view';

const createTemplate = (): string => '<li class="trip-events__item"></li>';

export default class ListItemView extends View<HTMLLIElement> {
  get template(): string {
    return createTemplate();
  }
}
