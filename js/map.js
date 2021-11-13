import { setActivePageState, address } from './form.js';
import { getAdsWithRandomData } from './utils.js';

const map = L.map('map-canvas')
  .setView([35.652832, 139.839478], 10);
L.tileLayer(
  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
  .on('load', () => setActivePageState())
  .addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const otherPinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  [35.652832, 139.839478],
  {
    draggable: true,
    icon: mainPinIcon,
  });

mainMarker.addTo(map);

mainMarker.on('moveend', (event) => {
  address.value = `lat ${math.round(event.target.getLatLng().lat, 5)}, lng ${math.round(event.target.getLatLng().lng, 5)}`;
});

const points = getAdsWithRandomData(20);

const createCustomPopup = (ad) => {
  const popupElement = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);
  popupElement.querySelector('.popup__avatar').src = ad.author.avatar || popupElement.querySelector('.popup__avatar').remove();
  popupElement.querySelector('.popup__title').textContent = ad.offer.title || popupElement.querySelector('.popup__title').remove();
  popupElement.querySelector('.popup__description').textContent = ad.offer.description || popupElement.querySelector('.popup__description').remove();
  if (ad.location.lat && ad.location.lng) {
    popupElement.querySelector('.popup__text--address').textContent = `Координаты: lat ${ad.location.lat}, lng ${ad.location.lng}`;
  } else {
    popupElement.querySelector('.popup__text--address').remove();
  }
  if (ad.offer.price) {
    popupElement.querySelector('.popup__text--price').innerHTML = `${ad.offer.price} <span>₽/ночь</span>`;
  } else {
    popupElement.querySelector('.popup__text--price').remove();
  }
  if (ad.offer.type) {
    popupElement.querySelector('.popup__type').textContent = getAdType(ad.offer.type);
  } else {
    popupElement.querySelector('.popup__type').remove();
  }
  if (ad.offer.rooms && ad.offer.guests) {
    popupElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  } else {
    popupElement.querySelector('.popup__text--capacity').remove();
  }
  if (ad.offer.checkin && ad.offer.checkout) {
    popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  } else {
    popupElement.querySelector('.popup__text--time').remove();
  }
  if (ad.offer.features.length) {
    popupElement.querySelector('.popup__features').innerHTML = `${getFeatures(ad.offer.features)}`;
  } else {
    popupElement.querySelector('.popup__features').remove();
  }
  if (ad.offer.photos.length) {
    popupElement.querySelector('.popup__photos').innerHTML = getImages(ad.offer.photos);
  } else {
    popupElement.querySelector('.popup__photos').remove();
  }

  return popupElement;
};

points.forEach((point) => {
  const marker = L.marker(
    [point.location.lat, point.location.lng],
    {
      icon: otherPinIcon,
    });
  marker
    .addTo(map)
    .bindPopup(createCustomPopup(point));
});

function getFeatures(features) {
  const allFeatures = [];
  for (const feature of features) {
    switch (feature) {
      case 'wifi':
        allFeatures.push('<li class="popup__feature popup__feature--wifi"></li>');
        break;
      case 'dishwasher':
        allFeatures.push('<li class="popup__feature popup__feature--dishwasher"></li>');
        break;
      case 'parking':
        allFeatures.push('<li class="popup__feature popup__feature--parking"></li>');
        break;
      case 'washer':
        allFeatures.push('<li class="popup__feature popup__feature--washer"></li>');
        break;
      case 'elevator':
        allFeatures.push('<li class="popup__feature popup__feature--elevator"></li>');
        break;
      case 'conditioner':
        allFeatures.push('<li class="popup__feature popup__feature--conditioner"></li>');
        break;
    }
  }
  return allFeatures;
}

function getImages(photos) {
  const images = [];
  photos.forEach((photo) => {
    images.push(`<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
  });
  return images;
}

function getAdType(type) {
  switch (type) {
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    case 'bungalow':
      return 'Бунгало';
    case 'hotel':
      return 'Отель';
  }
}

export function a() {
  return false;
}

export function getCoordinates() {
  return mainMarker.getLatLng();
}
