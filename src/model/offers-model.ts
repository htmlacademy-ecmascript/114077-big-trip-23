import MockService from '../services/mock-service';
import type { Offer } from '../types/offer';

export default class OffersModel {
  readonly #service : MockService | null = null;
  readonly #offers: Offer[] = [];

  constructor(service: MockService) {
    this.#service = service;
    this.#offers = this.#service.offers;
  }

  get offers() {
    return this.#offers;
  }

  getByType(type: Offer['type']) {
    return this.#offers.find((offer : Offer) => offer.type === type);
  }
}
