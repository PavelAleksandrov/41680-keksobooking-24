import { getAdsWithRandomData } from './utils.js';

const allAdData = getAdsWithRandomData(1);
const templateAdvert = document.querySelector('#card').content;
const advertHeader = templateAdvert.querySelector('.popup__title');
const advertAddress = templateAdvert.querySelector('.popup__text--address');
const advertPrice = templateAdvert.querySelector('.popup__text--price');
const advertType = templateAdvert.querySelector('.popup__type');
const advertCapacity = templateAdvert.querySelector('.popup__text--capacity');
const advertCheckTime = templateAdvert.querySelector('.popup__text--time');
const advertFeatures = templateAdvert.querySelector('.popup__features');
const advertDescription = templateAdvert.querySelector('.popup__description');
const advertPhotos = templateAdvert.querySelector('.popup__photos');
const advertAvatar = templateAdvert.querySelector('.popup__avatar');

export function generateAdvert() {
  for (const item of allAdData) {
    advertHeader.textContent = item.offer.title;
    advertAddress.textContent = item.offer.address;
    advertPrice.textContent = `${item.offer.price} ₽/ночь`;
    advertType.textContent = getAdType(item.offer.type);
    advertCapacity.textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;
    advertCheckTime.textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;
    advertFeatures.textContent = item.offer.features.join(', ');
    advertDescription.textContent = item.offer.description;
    getAdPhotos(item.offer.photos);
    advertAvatar.src = item.author.avatar;
  }
}

function getAdPhotos(photos) {
  const fragment = document.createDocumentFragment();
  const element = advertPhotos.querySelector('.popup__photo').cloneNode(true);
  advertPhotos.innerHTML = '';
  for (const photo of photos) {
    element.src = photo;
    fragment.appendChild(element);
  }
  advertPhotos.appendChild(fragment);
}

function getAdType(type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
    default:
      return '';
  }
}
