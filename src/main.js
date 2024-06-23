import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchBreeds, fetchCatImageByBreed } from './cat-api.js';

const breedSelect = document.getElementById('breed-select');
const catInfo = document.getElementById('cat-info');
const loader = document.querySelector('.loader');

const showElement = (element) => {
  element.classList.remove('visually-hidden');
};

const hideElement = (element) => {
  element.classList.add('visually-hidden');
};

hideElement(catInfo);
hideElement(breedSelect);
showElement(loader);
fetchBreeds()
  .then(data => {
    breedSelect.innerHTML = data.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
    data.forEach(breed => {
      localStorage.setItem(breed.id, JSON.stringify(breed));
    });
    showElement(breedSelect);
  })
  .catch(error => {
    iziToast.error({ title: 'Error', message: error.message });
  })
  .finally(() => {
    breedSelect.selectedIndex = -1;
    hideElement(loader);
  });

breedSelect.addEventListener('change', () => {
  const breedId = breedSelect.value;
  if (breedId) {
    hideElement(catInfo);
    showElement(loader);

    fetchCatImageByBreed(breedId)
      .then(data => {
        const image = data[0];
        const breedData = JSON.parse(localStorage.getItem(breedId));
        catInfo.innerHTML = `
            <h2>${breedData.name}</h2>
            <img src="${image.url}" alt="${breedData.name} cat image" />
            <p>${breedData.description}</p>
            <p><b>Temperament:</b> ${breedData.temperament}</p>
          `;
        showElement(catInfo);
      })
      .catch(error => {
        iziToast.error({ title: 'Error', message: error.message });
      })
      .finally(() => {
        hideElement(loader);
      });
  }
});