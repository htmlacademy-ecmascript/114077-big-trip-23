/* eslint-disable camelcase */

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export const appDay = dayjs;

export const flatpickrBaseConfig = {
  static: false,
  enableTime: true,
  time_24hr: true,
  dateFormat: 'j\\/m\\/y H\\:i',
};
