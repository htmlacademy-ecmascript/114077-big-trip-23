import { AbstractElement, type TemplateElement } from './abstract-element';

const createTemplate = (): string => '<li class="trip-events__item"></li>';

export default class ListItemView extends AbstractElement implements TemplateElement {
  get template(): string {
    return createTemplate();
  }
}
