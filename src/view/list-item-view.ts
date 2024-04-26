import { AbstractElement } from './abstract-element';

const createTemplate = (): string => '<li class="trip-events__item"></li>';

export default class ListItemView extends AbstractElement<HTMLLIElement> {
  get template(): string {
    return createTemplate();
  }
}
