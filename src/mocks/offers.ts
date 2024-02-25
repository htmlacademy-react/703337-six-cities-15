import { CardsType } from '../types/card';

const arrayOffers : CardsType = [
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f00',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    isFavorite: false,
    isPremium: false,
    rating: 4,
    previewImage: 'img/apartment-02.jpg',
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 3,
    goods: [
      'Heating'
    ],
    host: {
      name: 'Oliver Conner',
      avatarUrl: 'img/apartment-02.png',
      isPro: false
    },
    images: [
      'img/avatar-max.jpg'
    ],
    maxAdults: 4
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f01',
    title: 'Прекрасная студия',
    type: 'студия',
    price: 1340,
    city: {
      name: 'Ялта',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    isFavorite: true,
    isPremium: false,
    rating: 3,
    previewImage: './markup/img/apartment-01.jpg',
    description: 'Отличное место.',
    bedrooms: 13,
    goods: [
      'Heating', 'wi-fi'
    ],
    host: {
      name: 'Илон Маск',
      avatarUrl: './markup/img/avatar-angelina.jpg',
      isPro: false
    },
    images: [
      './markup/img/avatar-angelina.jpg'
    ],
    maxAdults: 25
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f02',
    title: 'Прекрасная комната в общежитии в центре Москвы',
    type: 'комната',
    price: 1540,
    city: {
      name: 'Москва',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    isFavorite: true,
    isPremium: false,
    rating: 2,
    previewImage: './markup/img/apartment-02.jpg',
    description: 'Отличная комната.',
    bedrooms: 13,
    goods: [
      'Heating', 'wi-fi', 'noDisturb'
    ],
    host: {
      name: 'А.Ткачев',
      avatarUrl: './markup/img/avatar-angelina.jpg',
      isPro: false
    },
    images: [
      './markup/img/apartment-02.jpg'
    ],
    maxAdults: 5
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f03',
    title: 'Прекрасная комната в общежитии в центре Минска',
    type: 'комната',
    price: 140,
    city: {
      name: 'Минск',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    isFavorite: true,
    isPremium: false,
    rating: 1,
    previewImage: 'img/apartment-03.jpg',
    description: 'Отличная комната.',
    bedrooms: 13,
    goods: [
      'Heating', 'wi-fi'
    ],
    host: {
      name: 'А.Лукашенко',
      avatarUrl: './markup/img/avatar-angelina.jpg',
      isPro: false
    },
    images: [
      './markup/img/apartment-03.jpg'
    ],
    maxAdults: 3
  },
];

export{arrayOffers};

