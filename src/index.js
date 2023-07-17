import './main.css';
import {fetchImgs} from './fetchImg';
import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// const API_KEY = '38225856-55cf092e00195e84cd316d5f4';
// const BASE_URL = 'https://pixabay.com/api/';

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: '250',
  });

let searchQuery = '';
let page = 1;
const perPage = 40;

formEl.addEventListener('submit', handleForm);
loadMoreBtn.addEventListener('click', handleLoadMoreBtn);

// loadMoreBtn.style.display = 'none';

function handleForm(evt) {
    evt.preventDefault();
 
    searchQuery = evt.target.elements.searchQuery.value.trim();
    page = 1;
  
    if (!searchQuery) {
      Notify.failure('Please enter your search query');
      return;
    }
  
    // await fetchImgs();

    formEl.reset();
    // loadMoreBtn.disabled = true;
    galleryEl.style.display = 'none'

    renderCardsMarkup();
  
  async function renderCardsMarkup() {
    try {
      const { data: resp } = await fetchImgs(searchQuery, page, perPage);
      if (searchQuery === '') {
        return Notify.failure(
          "Sorry, there are no images matching your search query. Please try again."
        );
      }
      if (resp.totalHits === 0) {
        return Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      } else {
          showInfo(resp.hits);
          galleryEl.style.display = 'flex';
          galleryEl.style.flexWrap = 'wrap';
          galleryEl.style.gap = '48px 24px';
        Notify.success(`Hooray! We found ${resp.totalHits} images.`);
        lightbox.refresh();
        if (resp.totalHits > perPage) {
            loadMoreBtn.style.display = 'block'
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

async function handleLoadMoreBtn(){
    page +=1
    try {
      const { data: resp } = await fetchImgs(searchQuery, page, perPage);
      showInfo(resp.hits);
      lightbox.refresh();
      const totalPages = Math.ceil(resp.totalHits / perPage)
      if (page === totalPages) {
        btnLoadMore.style.display = 'none'
          Notify.info("We're sorry, but you've reached the end of search results.");
      }
  }
  catch (error) {
      console.log(error);
  }
  }

  function showInfo(images) {
    const galleryMarkup = images.map(
        ({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
        }) => {
            return `<a class="gallery__link" href="${largeImageURL}">
            <div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" height="100" />
                <div class="info">
                <p class="info-item"><b>Likes</b> ${likes}</p> 
                <p class="info-item"><b>Views</b> ${views}</p>
                <p class="info-item"><b>Comments</b> ${comments}</p>
                <p class="info-item"><b>Downloads</b> ${downloads}</p>
              </div>
            </div>
            </a>`
        }).join('');
    galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);
  }    