import servicesSearchCountries from './services/fetchCountries';
import '../node_modules/lodash';
import PNotify from '../node_modules/pnotify/dist/es/PNotify.js';
import templatesOneCountrie from './templates/oneCountrie.hbs';
import templatesCountries from './templates/Countries.hbs';

const refs = {
  input: document.querySelector('.input'),
  listItemCountrie: document.querySelector('.listItemCountrie'),
};

refs.input.addEventListener('input', _.debounce(searchCountries, 1000));

function searchCountries(e) {
  const searchValue = e.target.value;
  clearList();

  servicesSearchCountries.fetchCountries(searchValue).then(data => {
    if (data.length > 10) {
      PNotify.error({
        text: 'Too many matches found. Please enter a more specific query!',
      });
    } else if (data.length > 1) {
      const markuplist = buildListMarkupList(data);
      insertItemCountrie(markuplist);
    } else {
      const markupItem = buildListMarkupItem(data);
      insertItemCountrie(markupItem);
    }
  });
}

function insertItemCountrie(items) {
  refs.listItemCountrie.insertAdjacentHTML('beforeend', items);
}

function buildListMarkupItem(items) {
  return templatesOneCountrie(items);
}

function buildListMarkupList(items) {
  return templatesCountries(items);
}

function clearList() {
  refs.listItemCountrie.innerHTML = '';
}
