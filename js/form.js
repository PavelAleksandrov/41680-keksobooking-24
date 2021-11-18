import { postData } from './data.js';
import { getCoordinates, mainMarker, map, setDefaultPosition } from './map.js';
import { change } from './filter.js';

export const address = document.querySelector('#address');
const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const houseType = document.querySelector('#type');
const roomNumber = document.querySelector('#room_number');
const price = document.querySelector('#price');
const capacity = document.querySelector('#capacity');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const data = new FormData(adForm);
  postData(data);
});

adForm.addEventListener('reset', () => {
  clearForm();
});

filterForm.addEventListener('change', (evt) => {
  change(evt.target.name, evt.target.value);
});

houseType.addEventListener('change', (evt) => {
  changeHousePrice(evt.target.value);
});
roomNumber.addEventListener('change', (evt) => {
  changeRoomNumber(evt.target.value);
});
timeIn.addEventListener('change', (evt) => {
  changeTime(evt.target.value, timeOut);
});
timeOut.addEventListener('change', (evt) => {
  changeTime(evt.target.value, timeIn);
});

export function setDefaultForm() {
  adForm.method = 'post';
  adForm.enctype = 'multipart/form-data';
  adForm.action = 'https://24.javascript.pages.academy/keksobooking';
  changeRoomNumber(1);
  changeHousePrice('flat');
}

export function clearForm() {
  adForm.reset();
  map.closePopup();
  mainMarker.setLatLng([35.652832, 139.839478]);
  setDefaultPosition();
  changeRoomNumber(1);
  changeHousePrice('flat');
  setTimeout(() => {
    address.value = `lat ${math.round(getCoordinates().lat, 5)}, lng ${math.round(getCoordinates().lng, 5)}`;
  });
}

function changeTime(currentTime, timeForChange) {
  Array.from(timeForChange).forEach((option) => option.selected = option.value === currentTime);
}

function changeRoomNumber(rooms) {
  Array.from(capacity).forEach((option) => {
    option.disabled = true;
    if (rooms === '100') {
      option.disabled = option.value !== '0';
      return;
    }
    if (option.value !== '0' && option.value <= rooms) {
      option.disabled = false;
    }
  });
}

function changeHousePrice(currentHouseType) {
  price.placeholder = getPrice(currentHouseType);
  price.min = getPrice(currentHouseType);
}

function getPrice(currentHouseType) {
  switch (currentHouseType) {
    case 'flat':
      return '1000';
    case 'hotel':
      return '3000';
    case 'house':
      return '5000';
    case 'palace':
      return '10000';
    case 'bungalow':
    default:
      return '0';
  }
}

