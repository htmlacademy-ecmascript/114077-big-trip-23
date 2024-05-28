import { MainPresenter } from './presenter';

import MockService from './services/mock-service';
import { DestinationsModel, OffersModel, WayPointsModel } from './model';

const service: MockService = new MockService();

const models = {
  wayPointsModel: new WayPointsModel(service),
  offersModel: new OffersModel(service),
  destinationsModel: new DestinationsModel(service),
};

new MainPresenter({ ...models });
