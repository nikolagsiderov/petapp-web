export type Listing = {
  id: string;
  description: string;
  address: string;
  category: string;
  latitude: number;
  longitude: number;
  imageSrc: string;
  price: number;
  createdAt: number;
  updatedAt: number;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    name: string;
  };
};

export type Reservation = {
  id: string;
  totalPrice: number;
  status: string;
  fromDate: Date;
  toDate: Date;
  listing: Listing;
};

export type User = {
  jwt: string;
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  image: string; // TODO: Need a way to obtain user profile image. Either a new microservice for image handling or something else...
  createdAt: string;
  updatedAt: string;
};

export type Review = {
  id: string;
  createdAt: string;
  communicationScore: number;
  accuracyScore: number;
  publicMessage: string;
  privateMessage: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    name: string;
  };
  reservation: Reservation;
};
