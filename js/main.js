const getRandomNumber = (from, to) => {
  from = Math.floor(from);
  to = Math.ceil(to);
  if (from < 0 || to < 0) {
    // console.log('Ошибка, значения диапазона не могут быть отрицательными.');
    return;
  }
  if (to <= from) {
    // console.log('Ошибка, значение диапазона "до" меньше или равно значению "от".');
    return;
  }
  // console.log(Math.floor(Math.random() * (to - from + 1) + from));
  // eslint-disable-next-line no-undef
  return math.random(to, from);
};

getRandomNumber(1, 5);

// eslint-disable-next-line no-undef
const getRandomNumberWithDec = (from, to, decimal = 0) => math.random(from, to).toFixed(decimal);

// 4.9. Больше деталей

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const similarAds = [];

// eslint-disable-next-line id-length
for (let i = 1; i < 11; i++) {
  const obj = {
    author: {
      avatar: `img/avatars/user${i.toString().length > 1 ? i : `0${i}`}.png`,
    },
    offer: {
      title: 'Отличный вариант',
      address: `${this.location.lat}, ${this.location.lng}`,
      price: getRandomNumberWithDec(1000, 8000),
      type: TYPES[getRandomNumberWithDec(0, TYPES.length - 1)],
      rooms: getRandomNumberWithDec(1, 4),
      guest: getRandomNumberWithDec(1, 7),
      checkin: CHECK_TIME[getRandomNumberWithDec(0, CHECK_TIME.length - 1)],
      checkout: CHECK_TIME[getRandomNumberWithDec(0, CHECK_TIME.length - 1)],
      features: FEATURES.slice(0, getRandomNumberWithDec(1, FEATURES.length - 1)),
      description: 'С видом на море',
      photos: PHOTOS.slice(0, getRandomNumberWithDec(1, PHOTOS.length - 1)),
    },
    location: {
      lat: getRandomNumberWithDec(35.65000, 35.70000, 5),
      lng: getRandomNumberWithDec(139.70000, 139.80000, 5),
    },
  };
  obj.offer.address = `${obj.location.lat}, ${obj.location.lng}`;
  similarAds.push(obj);
}
