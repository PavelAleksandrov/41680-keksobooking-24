import { CHECK_TIME, FEATURES, PHOTOS, TYPES } from './data.js';

const getRandomNumber = (from, to) => {
  from = Math.floor(from);
  to = Math.ceil(to);
  if (from < 0 || to < 0) {
    throw new Error('Ошибка, значения диапазона не могут быть отрицательными.');
  }
  if (to <= from) {
    throw new Error('Ошибка, значение диапазона "до" меньше или равно значению "от".');
  }
  return math.random(to, from);
};

const getRandomNumberWithDec = (from, to, decimal = 0) => math.random(from, to).toFixed(decimal);

const getAdsWithRandomData = (adsCount) => {
  const similarAds = [];
  for (let i = 1; i <= adsCount; i++) {
    const obj = {
      author: {
        avatar: `img/avatars/user${i.toString().length > 1 ? i : `0${i}`}.png`,
      },
      offer: {
        title: 'Отличный вариант',
        address: '',
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
  return similarAds;
};

export { getRandomNumber, getRandomNumberWithDec, getAdsWithRandomData };
