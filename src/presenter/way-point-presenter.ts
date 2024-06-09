import { remove, render, replace } from '../framework/render';
import type { WayPoint } from '../types/way-point';
import type { DestinationsModel, OffersModel } from '../model';

import ListItemView from '../view/list-item-view';
import WayPointView from '../view/way-point-view';
import type AddPointView from '../view/add-point-view';
import EditPointView from '../view/edit-point-view';

let escCallbackPointer;

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

type DataChangeFunction = (wayPoint: WayPoint) => void;
type ModeChangeFunction = (id?: string) => void;

interface WayPointPresenterProps {
  container: HTMLUListElement;

  destinationsModel: DestinationsModel;
  offersModel: OffersModel;

  onDataChange: DataChangeFunction | null;
  onModeChange: ModeChangeFunction | null;
}

export default class WayPointPresenter {
  #destinationsModel: DestinationsModel | null = null;
  #offersModel: OffersModel | null = null;

  #wayPoint: WayPoint | null = null;
  #mode = Mode.DEFAULT;

  readonly #container: HTMLElement | null = null;
  #listItemView = new ListItemView();

  #content: WayPointView | AddPointView | EditPointView | null = null;

  readonly #handleDataChange: DataChangeFunction | null = null;
  readonly #handleModeChange: ModeChangeFunction | null = null;

  constructor({ container, destinationsModel, offersModel, onDataChange, onModeChange }: WayPointPresenterProps) {
    this.#container = container;

    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(wayPoint) {
    this.#wayPoint = wayPoint;
    const prevContent = this.#content;

    if (prevContent === null) {
      this.#renderInfo();
      render(this.#content!, this.#listItemView.element);
      render(this.#listItemView, this.#container!);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this.#mode === Mode.DEFAULT) {
      this.#renderInfo();
      replace(this.#content!, prevContent);
    }

    if (this.#mode === Mode.EDITING) {
      this.#renderEditForm();
      replace(this.#content!, prevContent);
    }

    remove(prevContent);
  }

  destroy() {
    remove(this.#content);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#switchToWayPoint();
    }
  }

  #escKeyDownHandler = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#switchToWayPoint();
      document.removeEventListener('keydown', escCallbackPointer);
    }
  };

  #renderInfo() {
    const wayPoint = this.#wayPoint!;
    const destination = this.#destinationsModel!.getById(wayPoint.destination);
    const offer = this.#offersModel!.getByType(wayPoint.type);

    this.#content = new WayPointView({
      wayPoint,
      destination,
      offer,
      onEditClick: () => {
        this.#switchToEditForm();
        document.addEventListener('keydown', escCallbackPointer);
      },
      onFavoriteClick: () => {
        if (this.#handleDataChange) {
          this.#handleDataChange({ ...wayPoint, isFavorite: !wayPoint.isFavorite });
        }
      },
    });
  }

  #renderEditForm() {
    const wayPoint = this.#wayPoint!;
    const destinations = this.#destinationsModel!.destinations;
    const offers = this.#offersModel!.offers;
    const destination = this.#destinationsModel!.getById(wayPoint.destination);
    const offer = this.#offersModel!.getByType(wayPoint.type);

    this.#content = new EditPointView({
      wayPoint,
      destinations,
      offers,
      destination,
      offer,
      onFormSubmit: () => {
        this.#switchToWayPoint();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      },
      onCloseButtonClick: () => {
        this.#switchToWayPoint();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      },
    });
  }

  #switchToEditForm() {
    escCallbackPointer = this.#escKeyDownHandler;

    remove(this.#content);
    this.#renderEditForm();
    render(this.#content!, this.#listItemView.element);

    this.#handleModeChange!(this.#wayPoint!.id);
    this.#mode = Mode.EDITING;
  }

  #switchToWayPoint() {
    remove(this.#content);
    this.#renderInfo();
    render(this.#content!, this.#listItemView.element);

    this.#handleModeChange!();
    this.#mode = Mode.DEFAULT;
  }
}
