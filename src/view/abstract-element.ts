import { createElement } from '../render';

export interface TemplateElement {
  template: string;
  element: Element;
  removeElement: () => void;
}

export abstract class AbstractElement {
  _element: Element | null = null;

  abstract get template(): string;

  get element(): Element {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  removeElement(): void {
    this._element = null;
  }
}
