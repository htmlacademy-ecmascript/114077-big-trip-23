import { AbstractElement } from './abstract-element';

const createTemplate = (): string => '<ul class="trip-events__list"></ul>';

export default class ListView extends AbstractElement {
  get template(): string {
    return createTemplate();
  }
}
