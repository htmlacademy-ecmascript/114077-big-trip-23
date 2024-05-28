import View from '../framework/view/view';

const createTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class ListNoItemView extends View {
  get template(): string {
    return createTemplate();
  }
}
