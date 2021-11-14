import { address, setDefaultForm } from './form.js';
import { a, getCoordinates } from './map.js';

setDisabledPageState();

window.addEventListener('load', () => {
  setDefaultForm();
});

a();

export function setDisabledPageState() {
  address.value = `lat ${math.round(getCoordinates().lat, 5)}, lng ${math.round(getCoordinates().lng, 5)}`;
  document.querySelector('.ad-form').classList.add(['.ad-form--disabled']);
  document.querySelector('.map__filters').classList.add(['.map__filters--disabled']);
  document.querySelectorAll('fieldset').forEach((item) => item.disabled = true);
  Array.from(document.querySelector('.map__filters')).forEach((item) => item.disabled = true);
}

export function setActivePageState() {
  document.querySelector('.ad-form').classList.remove(['.ad-form--disabled']);
  document.querySelector('.map__filters').classList.remove(['.map__filters--disabled']);
  document.querySelectorAll('fieldset').forEach((item) => item.disabled = false);
  Array.from(document.querySelector('.map__filters')).forEach((item) => item.disabled = false);
}
