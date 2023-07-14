import axios from "axios";

const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
const ID_URL = 'https://api.thecatapi.com/v1/images/search';
const API_KEY = "live_JaOlXJlO48Tx22GcLwU6QFTxcGFnpbz6ZGW91WktPPrUZzvLPQCkjepWjBWW5wvZ";

axios.defaults.headers.common["x-api-key"] = API_KEY;

export function fetchBreeds() {
        return axios.get(BASE_URL)
          .then(resp => {
            return resp.data;
          })
          .catch(error => {
            console.error("Error fetching breeds:", error);
            return [];
          });
      }

  export function fetchCatByBreed(breedId) {
    return axios.get(`${ID_URL}?breed_ids=${breedId}`)
      .then(response => {
        return response.data[0];
      })
      .catch(error => {
        console.error("Error fetching cat:", error);
        return null;
      });
  }