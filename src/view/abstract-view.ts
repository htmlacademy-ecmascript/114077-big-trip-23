import { createElement } from '../render';

export abstract class AbstractView<E extends Element = HTMLDivElement> {
  #element: E | null = null;

  abstract get template(): string;

  get element(): E {
    this.#element ??= createElement<E>(this.template);
    return this.#element;
  }

  removeElement(): void {
    this.#element = null;
  }
}
