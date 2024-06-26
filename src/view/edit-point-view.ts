import { appDay, flatpickrBaseConfig } from '../utils/time';
import { capitalizeFirstLetter } from '../utils/capitalize';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import type { PointType, WayPoint } from '../types/way-point';
import type { AppPicture, Destination } from '../types/destination';
import type { InnerOffer, Offer } from '../types/offer';
import type { DestinationsModel, OffersModel } from '../model';

type EditPointProps = {
  wayPoint: WayPoint;
  destinationsModel: DestinationsModel;
  offersModel: OffersModel;

  onFormSubmit: () => void;
  onCloseButtonClick: () => void;
};

const createEventTypeItem = (offer: Offer, currentType) => `
  <div class="event__type-item">
    <input id="event-type-${offer.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer.type}" ${offer.type === currentType && 'checked'} >
    <label class="event__type-label  event__type-label--${offer.type}" for="event-type-${offer.type}-1">${capitalizeFirstLetter(offer.type)}</label>
  </div>
`;

const createEventType = (offer: InnerOffer, wayPointOffers: WayPoint['offers']) => `
  <div class="event__offer-selector">
    <input
      class="event__offer-checkbox  visually-hidden"
      id="event-offer-${offer.id}-1"
      type="checkbox"
      name="event-offer-${offer.id}"
      ${wayPointOffers.some((id) => id === offer.id) && 'checked'}
    >
    <label class="event__offer-label" for="event-offer-${offer.id}-1">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>
`;

const prepareOffers = (offers, wayPoint: WayPoint) =>
  offers
    .find((offer) => offer.type === wayPoint.type)
    ?.offers.map((offer) => createEventType(offer, wayPoint.offers))
    .join('');

const createDestinationOption = (destination: Destination) => `<option value="${destination.name}"></option>`;

const createDestinationPicture = (picture: AppPicture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`;

const createTemplate = (wayPoint: WayPoint, { destinationsModel, offersModel }: EditPointProps) => {
  const destination = destinationsModel.getById(wayPoint.destination)!;
  const offer = offersModel!.getByType(wayPoint.type)!;

  const destinations = destinationsModel.destinations;
  const offers = offersModel.offers;

  return `
  <form class="event event--edit" action="#" method="post" id="form-edit">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${wayPoint.type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            ${offers.map((offerItem) => createEventTypeItem(offerItem, wayPoint.type)).join('')}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">${wayPoint.type}</label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${destinations.map(createDestinationOption).join('')}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${appDay(wayPoint.dateFrom).format('DD/MM/YY HH:MM')}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${appDay(wayPoint.dateTo).format('DD/MM/YY HH:MM')}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${offer.offers.reduce((a, b) => a + b.price, 0)}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>

    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${prepareOffers(offers, wayPoint)}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${destination.pictures.map(createDestinationPicture).join('')}
          </div>
        </div>
      </section>
    </section>
  </form>
`;
};

export default class EditPointView extends AbstractStatefulView<WayPoint> {
  readonly #props: EditPointProps;

  readonly #handleFormSubmit;
  readonly #handleClickCloseButton;

  constructor(props) {
    super();

    this.#props = props;

    const { wayPoint } = props;

    this._setState(EditPointView.parseWayPointToState(wayPoint));

    this.#handleFormSubmit = this.#props.onFormSubmit;
    this.#handleClickCloseButton = this.#props.onCloseButtonClick;

    this._restoreHandlers();
  }

  get template(): string {
    return createTemplate(this._state, this.#props);
  }

  #clickCloseButtonHandler(evt: Event) {
    evt.preventDefault();
    this.#handleClickCloseButton();
  }

  #formSubmitHandler(evt: Event) {
    evt.preventDefault();
    this.#handleFormSubmit();
  }

  #setDateFromPicker() {
    const startDateChangeHandler = ([userDate]: Date[]) => {
      const start = appDay(userDate);
      const finish = appDay(this._state.dateTo);

      if (start >= finish) {
        this._state.dateTo = start.add(5, 'minute').toString();
      }

      this.updateElement({
        dateFrom: userDate.toString(),
      });
    };

    flatpickr(this.element.querySelectorAll('.event__input--time')[0], {
      ...flatpickrBaseConfig,
      minDate: 'today',
      dateFormat: 'j\\/m\\/y H\\:i',
      onChange: startDateChangeHandler,
    });
  }

  #setEventFinish() {
    const currentStartDate = this._state.dateFrom === '' ? 'today' : appDay(this._state.dateFrom).toString();

    const finishDateChangeHandler = ([userDate]: Date[]) => {
      const start = appDay(this._state.dateFrom);
      const finish = appDay(userDate);

      if (start >= finish) {
        this._state.dateFrom = start.subtract(5, 'minute').toString();
      }

      this.updateElement({
        dateTo: userDate.toString(),
      });
    };

    flatpickr(this.element.querySelectorAll('.event__input--time')[1], {
      ...flatpickrBaseConfig,
      minDate: currentStartDate,
      onChange: finishDateChangeHandler,
    });
  }

  _restoreHandlers() {
    this.element.addEventListener('submit', this.#formSubmitHandler.bind(this));
    this.element.querySelector('.event__rollup-btn')!.addEventListener('click', this.#clickCloseButtonHandler.bind(this));

    this.element.querySelectorAll('.event__type-input').forEach((input) =>
      input.addEventListener('change', (evt: Event) => {
        if (evt.target instanceof HTMLInputElement) {
          this._state.type = evt.target!.value as PointType;
          this.updateElement(this._state);
        }
      }),
    );

    this.element.querySelector('.event__input--destination')!.addEventListener('change', (evt: Event) => {
      if (evt.target instanceof HTMLInputElement) {
        const newDestination = this.#props.destinationsModel.getByName(evt.target!.value);

        if (newDestination) {
          this._state.destination = newDestination.id;
          this.updateElement(this._state);
        }
      }
    });

    this.#setDateFromPicker();
    this.#setEventFinish();
  }

  static parseWayPointToState(wayPoint: WayPoint) {
    return {
      ...wayPoint,
    };
  }

  static parseStateToWayPoint(state: WayPoint) {
    return {
      ...state,
    };
  }
}
