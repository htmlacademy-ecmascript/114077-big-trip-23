import MockService from '../services/mock-service';
import type { Destination } from '../types/destination';

export default class DestinationsModel {
  readonly #service: MockService | null = null;
  readonly #destinations: Destination[] = [];

  constructor(service: MockService) {
    this.#service = service;
    this.#destinations = this.#service.destinations;
  }

  get destinations() {
    return this.#destinations;
  }

  getById(id: string) {
    return this.#destinations.find((destination) => destination.id === id);
  }
}
