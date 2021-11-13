import { postData } from './data.js';
import { getCoordinates, mainMarker, map, setDefaultPosition } from './map.js';
const form = document.querySelector('.ad-form');
const houseType = document.querySelector('#type');
const roomNumber = document.querySelector('#room_number');
const price = document.querySelector('#price');
const capacity = document.querySelector('#capacity');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
export const address = document.querySelector('#address');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  postData(data);
});

form.addEventListener('reset', () => {
  clearForm();
});

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

export function clearForm() {
  form.reset();
  map.closePopup();
  mainMarker.setLatLng([35.652832, 139.839478]);
  setDefaultPosition();
  changeRoomNumber(1);
  changeHousePrice('flat');
  setTimeout(() => {
    address.value = `lat ${math.round(getCoordinates().lat, 5)}, lng ${math.round(getCoordinates().lng, 5)}`;
  });
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

