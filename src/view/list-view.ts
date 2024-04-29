import { AbstractView } from './abstract-view';

const createTemplate = (): string => '<ul class="trip-events__list"></ul>';

export default class ListView extends AbstractView<HTMLUListElement> {
  get template(): string {
    return createTemplate();
  }
}
