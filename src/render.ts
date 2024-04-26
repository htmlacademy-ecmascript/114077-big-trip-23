import type { AbstractElement } from './view/abstract-element';

function createElement<E extends Element = HTMLDivElement>(template: string): E {
  const newElement: HTMLDivElement = document.createElement('div');
  newElement.innerHTML = template;

  return <E>newElement.firstElementChild;
}

type MinimalAbstract = Pick<AbstractElement<Element>, 'element'>;
function render(component: MinimalAbstract, container: HTMLElement, place: InsertPosition = 'beforeend') {
  container.insertAdjacentElement(place, component.element);
}

export { createElement, render };
