import { getCoordinates } from './map.js';

const form = document.querySelector('.ad-form');
const houseType = document.querySelector('#type');
const roomNumber = document.querySelector('#room_number');
const price = document.querySelector('#price');
const capacity = document.querySelector('#capacity');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
export const address = document.querySelector('#address');

houseType.addEventListener('change', (event) => {
  changeHousePrice(event.target.value);
});
roomNumber.addEventListener('change', (event) => {
  changeRoomNumber(event.target.value);
});
timeIn.addEventListener('change', (event) => {
  changeTime(event.target.value, timeOut);
});
timeOut.addEventListener('change', (event) => {
  changeTime(event.target.value, timeIn);
});

function changeTime(currentTime, timeForChange) {
  Array.from(timeForChange).forEach((option) => option.selected = option.value === currentTime);
}

export function setDefaultForm() {
  form.method = 'post';
  form.enctype = 'multipart/form-data';
  form.action = 'https://24.javascript.pages.academy/keksobooking';
  changeRoomNumber(1);
  changeHousePrice('flat');
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

export function setActivePageState() {
  address.value = `lat ${math.round(getCoordinates().lat, 5)}, lng ${math.round(getCoordinates().lng, 5)}`;
  document.querySelector('.ad-form').classList.add(['.ad-form--disabled']);
  document.querySelector('.map__filters').classList.add(['.map__filters--disabled']);
  document.querySelectorAll('fieldset').forEach((item) => item.disabled = true);
  Array.from(document.querySelector('.map__filters')).forEach((item) => item.disabled = true);
}

export function setDisabledPageState() {
  document.querySelector('.ad-form').classList.remove(['.ad-form--disabled']);
  document.querySelector('.map__filters').classList.remove(['.map__filters--disabled']);
  document.querySelectorAll('fieldset').forEach((item) => item.disabled = false);
  Array.from(document.querySelector('.map__filters')).forEach((item) => item.disabled = false);
}

