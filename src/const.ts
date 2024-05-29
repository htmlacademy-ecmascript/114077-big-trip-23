const POINTS_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'] as const;

const FILTER_TYPES = ['everything', 'future', 'present', 'past'] as const;

const SORT_TYPES = ['day', 'event', 'time', 'price', 'offer'] as const;

export { POINTS_TYPES, FILTER_TYPES, SORT_TYPES };
