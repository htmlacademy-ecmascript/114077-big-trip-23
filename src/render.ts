import { type TemplateElement } from './view/abstract-element';

enum RenderPosition {
  BEFOREBEGIN = 'beforebegin',
  AFTERBEGIN = 'afterbegin',
  BEFOREEND = 'beforeend',
  AFTEREND = 'afterend',
}

function createElement(template: string): Element {
  const newElement: HTMLDivElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild as Element;
}

function render(component: TemplateElement, container: Element, place: RenderPosition = RenderPosition.BEFOREEND) {
  container.insertAdjacentElement(place, component.element);
}

export { RenderPosition, createElement, render };
