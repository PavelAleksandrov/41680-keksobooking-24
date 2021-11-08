export function setActivePageState() {
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
