import { AbstractView } from './abstract-view';

const createTemplate = (): string => '<li class="trip-events__item"></li>';

export default class ListItemView extends AbstractView<HTMLLIElement> {
  get template(): string {
    return createTemplate();
  }
}
