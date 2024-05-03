import type { AbstractView } from './view/abstract-view';

function createElement<E extends Element = HTMLDivElement>(template: string): E {
  const newElement: HTMLDivElement = document.createElement('div');
  newElement.innerHTML = template;

  return <E>newElement.firstElementChild;
}

function render(component: AbstractView<Element>, container: HTMLElement, place: InsertPosition = 'beforeend') {
  container.insertAdjacentElement(place, component.element);
}

export { createElement, render };
