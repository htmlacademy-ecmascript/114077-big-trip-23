interface AppPicture {
  src: string;
  description: string;
}

interface Destination {
  id: string;
  description: string;
  name: string;
  picture: AppPicture[];
}

export type { Destination, AppPicture };
