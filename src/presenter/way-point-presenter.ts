import { render } from '../render';
import type { WayPoint } from '../types/way-point';
import type { WayPointsModel, DestinationsModel, OffersModel } from '../model';

import ListItemView from '../view/list-item-view';
import WayPointView from '../view/way-point-view';
import AddPointView from '../view/add-point-view';
import EditPointView from '../view/edit-point-view';

interface WayPointPresenterProps {
  container: HTMLUListElement;
  wayPoint: WayPoint;

  wayPointsModel: WayPointsModel;
  destinationsModel: DestinationsModel;
  offersModel: OffersModel;
}

export default class WayPointPresenter {
  #wayPointsModel: WayPointsModel | null = null;
  #destinationsModel: DestinationsModel | null = null;
  #offersModel: OffersModel | null = null;

  #wayPoint: WayPoint | null = null;

  #container: HTMLElement | null = null;
  #item = new ListItemView();
  #content: WayPointView | AddPointView | EditPointView | null = null;

  constructor({ container, wayPoint, ...models }: WayPointPresenterProps) {
    this.#container = container;
    this.#wayPoint = wayPoint;

    this.#wayPointsModel = models.wayPointsModel;
    this.#destinationsModel = models.destinationsModel;
    this.#offersModel = models.offersModel;

    this.renderInfo();
    render(this.#item, this.#container);
  }

  private renderInfo() {
    const wayPoint = this.#wayPoint!;
    const destination = this.#destinationsModel!.getById(wayPoint.destination);
    const offer = this.#offersModel!.getByType(wayPoint.type);

    this.#content = new WayPointView({ wayPoint, destination, offer });

    render(this.#content, this.#item.element);
  }

  switchToEdit() {
    const oldContent = this.#content!;

    oldContent.element.remove();
    oldContent.removeElement();

    const wayPoint = this.#wayPoint!;
    const destination = this.#destinationsModel!.getById(wayPoint.destination);
    const destinations = this.#destinationsModel!.destinations;
    const offers = this.#offersModel!.offers;

    this.#content = new EditPointView({ wayPoint, destination, destinations, offers });
    render(this.#content, this.#item.element);
  }
}
