import { prepareAdverts } from './filter.js';
import { generateAdvertPins } from './map.js';
import { clear } from './form.js';

const loadErrorBlock = document.querySelector('.load-error');
const errorTemplateFragment = document.querySelector('#error').content;
const successTemplateFragment = document.querySelector('#success').content;
const errorTemplate = errorTemplateFragment.querySelector('.error');
const successTemplate = successTemplateFragment.querySelector('.success');
const fragment = document.createDocumentFragment();

let allData;

export async function getData() {
  const dataQuery = await fetch('https://24.javascript.pages.academy/keksobooking/data');
  if (dataQuery.ok) {
    allData = prepareAdverts(await dataQuery.json());
    generateAdvertPins(allData);
  } else {
    loadErrorBlock.style.display = 'block';
    throw new Error();
  }
}

export async function postData(data) {
  const queryForData = await fetch('https://24.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body: data,
  });
  if (queryForData.ok) {
    const element = successTemplate.cloneNode(true);
    fragment.appendChild(element);
    document.querySelector('body').appendChild(fragment);
    clear();
    document.addEventListener('keydown', (event) => {
      if(event.key === 'Escape'){
        document.removeEventListener('keydown', () => {});
        element.remove();
      }
    });
    element.addEventListener('click', () => {
      element.removeEventListener('click', () => {});
      element.remove();
    });
  } else {
    const element = errorTemplate.cloneNode(true);
    fragment.appendChild(element);
    document.querySelector('body').appendChild(fragment);
    document.addEventListener('keydown', (event) => {
      if(event.key === 'Escape'){
        document.removeEventListener('keydown', () => {});
        element.remove();
      }
    });
    element.addEventListener('click', () => {
      element.removeEventListener('click', () => {});
      element.remove();
    });
    throw new Error('Форма заполнена неправильно');
  }
}
