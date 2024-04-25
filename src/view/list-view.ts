import { AbstractElement, type TemplateElement } from './abstract-element';

const createTemplate = (): string => '<ul class="trip-events__list"></ul>';

export default class ListView extends AbstractElement implements TemplateElement {
  get template(): string {
    return createTemplate();
  }
}
