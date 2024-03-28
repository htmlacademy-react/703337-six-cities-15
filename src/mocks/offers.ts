import { CardsType } from '../types/types';

const arrayOffers : CardsType = [
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f00',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 145,
    city: {
      name: 'Paris',
      location: {
        latitude: 52.127,
        longitude: 4.44641,
        zoom: 8
      }
    },
    location: {
      latitude: 52.127,
      longitude: 4.44641,
      zoom: 8
    },
    isFavorite: false,
    isPremium: false,
    rating: 4,
    previewImage: 'img/apartment-02.jpg',
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 3,
    goods: [
      'Heating', 'Washing machine', '-12C'
    ],
    host: {
      name: 'Oliver Conner',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: true
    },
    images: [
      'img/apartment-02.jpg', 'img/studio-01.jpg', 'img/apartment-01.jpg'
    ],
    maxAdults: 4
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f01',
    title: 'Прекрасная студия',
    type: 'студия',
    price: 1340,
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
    rating: 3,
    previewImage: 'img/apartment-01.jpg',
    description: 'Отличное место.',
    bedrooms: 13,
    goods: [
      'Heating', 'wi-fi'
    ],
    host: {
      name: 'Илон Маск',
      avatarUrl: './markup/img/avatar-angelina.jpg',
      isPro: true
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
      name: 'Amsterdam',
      location: {
        latitude: 52.0908,
        longitude: 5.12222,
        zoom: 8
      }
    },
    location: {
      latitude: 52.0908,
      longitude: 5.12222,
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
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true
    },
    images: [
      'img/apartment-02.jpg'
    ],
    maxAdults: 5
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f03',
    title: 'Прекрасная комната в общежитии в центре Минска',
    type: 'комната',
    price: 140,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 51.92442,
        longitude: 4.47773,
        zoom: 8
      }
    },
    location: {
      latitude: 51.92442,
      longitude: 4.47773,
      zoom: 8
    },
    isFavorite: false,
    isPremium: true,
    rating: 1,
    previewImage: 'img/apartment-03.jpg',
    description: 'Отличная комната.',
    bedrooms: 0,
    goods: [
      'Heating', 'wi-fi'
    ],
    host: {
      name: 'А.Лукашенко',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: false
    },
    images: [
      'img/apartment-03.jpg'
    ],
    maxAdults: 3
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f04',
    title: 'Прекрасная комната в общежитии в центре Gaage',
    type: 'комната',
    price: 3150,
    city: {
      name: 'Paris',
      location: {
        latitude: 52.0767,
        longitude: 4.29861,
        zoom: 8
      }
    },
    location: {
      latitude: 52.0767,
      longitude: 4.29861,
      zoom: 8
    },
    isFavorite: false,
    isPremium: true,
    rating: 2,
    previewImage: 'img/apartment-03.jpg',
    description: 'Отличная комната.',
    bedrooms: 0,
    goods: [
      'Heating', 'wi-fi'
    ],
    host: {
      name: 'А.Лукашенко',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: false
    },
    images: [
      'img/apartment-03.jpg'
    ],
    maxAdults: 116
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f05',
    title: 'Прекрасная комната в общежитии в центре Leiden',
    type: 'комната',
    price: 2150,
    city: {
      name: 'Paris',
      location: {
        latitude: 52.1583,
        longitude: 4.49306,
        zoom: 8
      }
    },
    location: {
      latitude: 52.1583,
      longitude: 4.49306,
      zoom: 8
    },
    isFavorite: false,
    isPremium: true,
    rating: 1,
    previewImage: 'img/apartment-03.jpg',
    description: 'Отличная комната.',
    bedrooms: 0,
    goods: [
      'Heating', 'wi-fi'
    ],
    host: {
      name: 'J.Smith',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: false
    },
    images: [
      'img/apartment-03.jpg'
    ],
    maxAdults: 16
  },
];

export{arrayOffers};

