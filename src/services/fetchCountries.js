import PNotify from '../../node_modules/pnotify/dist/es/PNotify.js';
const baseUrl = 'https://restcountries.eu/rest/v2/name/';

export default {
  fetchCountries(searchQuery) {
    const requestParams = searchQuery;

    return fetch(baseUrl + requestParams).then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(
        PNotify.error({
          text: '404 Not found1',
        }),
      );
    });
  },
};
