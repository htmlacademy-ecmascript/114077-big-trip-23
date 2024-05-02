import Randomizer from '../utils/randomizer';
import { DESCRIPTIONS, MOCK_CITIES } from './const.mock';
import type { Destination, AppPicture } from '../types/destination';

const RANDOM_FROM = 1;
const RANDOM_TO = 5;

const mockDescription = (): string =>
  Array.from({ length: Randomizer.getInteger(RANDOM_FROM, RANDOM_TO) }, () => Randomizer.getElement(DESCRIPTIONS)).join(' ');

const mockPicture = (city: string): AppPicture => ({
  src: `https://loremflickr.com/248/152/${city}?random=${Randomizer.getInteger()}`,
  description: mockDescription(),
});

const mockDestination = (city: string): Destination => ({
  id: crypto.randomUUID(),
  description: mockDescription(),
  name: city,
  picture: Array.from({ length: Randomizer.getInteger(RANDOM_FROM, RANDOM_TO) }, () => mockPicture(city)),
});

const mockDestinations = (): Destination[] => MOCK_CITIES.map(mockDestination);

export { mockDestinations };
