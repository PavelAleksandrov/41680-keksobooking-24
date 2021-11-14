import { prepareAdverts } from './utils.js';
import { generateAdvertPins } from './map.js';
import { clearForm, setDefaultForm } from './form.js';
const loadErrorBlock = document.querySelector('.load-error');
const errorTemplateFragment = document.querySelector('#error').content;
const successTemplateFragment = document.querySelector('#success').content;
const errorTemplate = errorTemplateFragment.querySelector('.error');
const successTemplate = successTemplateFragment.querySelector('.success');
const fragment = document.createDocumentFragment();

let allData;
export let similarAds;

export async function getData() {
  const getData = await fetch('https://24.javascript.pages.academy/keksobooking/data');
  if (getData.ok) {
    allData = await getData.json();
    similarAds = prepareAdverts(allData);
    generateAdvertPins(similarAds);
  } else {
    loadErrorBlock.style.display = 'block';
    throw new Error();
  }
}

export async function postData(data) {
  const postData = await fetch('https://24.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body: data,
  });
  if (postData.ok) {
    const element = successTemplate.cloneNode(true);
    fragment.appendChild(element);
    document.querySelector('body').appendChild(fragment);
    clearForm();
    document.addEventListener('keydown', (event) => {
      if(event.key === 'Escape'){
        element.remove();
      }
    });
    element.addEventListener('click', () => {
      element.remove();
    });
  } else {
    const element = errorTemplate.cloneNode(true);
    fragment.appendChild(element);
    document.querySelector('body').appendChild(fragment);
    document.addEventListener('keydown', (event) => {
      if(event.key === 'Escape'){
        element.remove();
      }
    });
    element.addEventListener('click', () => {
      element.remove();
    });
    throw new Error();
  }
}
