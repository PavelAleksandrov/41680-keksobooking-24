import { address, setDefault } from './form.js';
import { getCoordinates } from './map.js';
import { round } from './utils/round.js';

setDisabledPageState();

window.addEventListener('load', () => {
  setDefault();
});

export function setDisabledPageState() {
  address.value = `lat ${round(getCoordinates().lat, 5)}, lng ${round(getCoordinates().lng, 5)}`;
  document.querySelector('.ad-form').classList.add(['.ad-form--disabled']);
  document.querySelector('.map__filters').classList.add(['.map__filters--disabled']);
  document.querySelectorAll('fieldset').forEach((item) => {
    item.disabled = true;
    return item.disabled;
  });
  Array.from(document.querySelector('.map__filters')).forEach((item) => {
    item.disabled = true;
    return item.disabled;
  });
}

export function setActivePageState() {
  document.querySelector('.ad-form').classList.remove(['.ad-form--disabled']);
  document.querySelector('.map__filters').classList.remove(['.map__filters--disabled']);
  document.querySelectorAll('fieldset').forEach((item) => {
    item.disabled = false;
    return item.disabled;
  });
  Array.from(document.querySelector('.map__filters')).forEach((item) => {
    item.disabled = false;
    return item.disabled;
  });
}
