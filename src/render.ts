import { AbstractElement } from "./view/abstract-element";

function createElement<E extends Element = HTMLDivElement>(template: string): E {
  const newElement : HTMLDivElement = document.createElement('div');
  newElement.innerHTML = template;

  return <E>newElement.firstElementChild;
}

function render(component: Pick<AbstractElement, 'element'>, container: HTMLElement, place: InsertPosition = 'beforeend') {
  container.insertAdjacentElement(place, component.element);
}

export { createElement, render };
