import { createElement } from '../render';

export abstract class AbstractView<E extends Element = HTMLDivElement> {
  #element : E | null = null;
  #props;

  constructor(props = {}) {
    this.#props = props;
  }

  abstract get template(): string;

  get element() : E {
    this.#element ??= createElement<E>(this.template);
    return this.#element;
  }

  get props() {
    return this.#props;
  }

  removeElement(): void {
    this.#element = null;
  }
}
