import { getAdsWithRandomData } from './utils.js';
import { setDefaultForm, setDisabledPageState } from './form.js';
import { a } from './map.js';

getAdsWithRandomData(10);

window.addEventListener('load', () => {
  setDefaultForm();
  setDisabledPageState();
});

a();
