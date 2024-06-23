// import axios from 'axios';
//
// axios.defaults.headers.common['x-api-key'] = 'live_Xzy98WDZOtYgu2L5fGlsKzL763ewGECS740YZoQ7ASi9RIVY0wwFhTnv7ZRUecLp';
//
// export const fetchBreeds = () => {
//   return fetch('https://api.thecatapi.com/v1/breeds')
//     .then(response => response.json())
//     .catch(error => {
//       throw new Error(`Error fetching breeds: ${error}`);
//     });
// };
//
// export const fetchCatByBreed = (breedId) => {
//   return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
//     .then(response => response.json())
//     .catch(error => {
//       throw new Error(`Error fetching breed ${breedId}: ${error}`);
//     });
// };
//
//

import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_Xzy98WDZOtYgu2L5fGlsKzL763ewGECS740YZoQ7ASi9RIVY0wwFhTnv7ZRUecLp';

export const fetchBreeds = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch('https://api.thecatapi.com/v1/breeds')
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch breeds. Status code ${response.status}`);
          }
          return response.json();
        })
        .then(resolve)
        .catch(error => reject(new Error(`Error fetching breeds: ${error.message}`)));
    }, 1500); // 2-second delay for testing
  });
};

export const fetchCatImageByBreed = (breedId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch cat image. Status code ${response.status}`);
          }
          return response.json();
        })
        .then(resolve)
        .catch(error => reject(new Error(`Error fetching image ${breedId}: ${error.message}`)));
    }, 1500); // 2-second delay for testing
  });
};

