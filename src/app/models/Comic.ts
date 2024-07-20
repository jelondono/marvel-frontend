export interface Comic {
  id: number;
  title: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  urls: Url[];
  creators: Creators;
  dates: Date[];
  prices: Price[];
  isFavorite: Boolean;
}

interface Url {
  type: string;
  url: string;
}

interface Creators {
  items: Creator[];
}

interface Creator {
  name: string;
  role: string;
}

interface Date {
  type: string;
  date: string;
}

interface Price {
  type: string;
  price: number;
}
