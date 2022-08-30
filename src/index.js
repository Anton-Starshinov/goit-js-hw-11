import './css/styles.css';
import { rendorImagesGallery } from './JS/rendor';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = 'https://pixabay.com/api/?key=';
const API_KEY = '29562775-0cedab5e27dd705c115fa7ca4';
const OPTIONS =
  '&image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

const formEl = document.querySelector('#search-form');
const btnLoadMoreEl = document.querySelector('.load-more');
const galeryEl = document.querySelector('.gallery');

btnLoadMoreEl.style.display = 'none';
let page = 1;
let searchQuery = '';

formEl.addEventListener('submit', onSearch);
btnLoadMoreEl.addEventListener('click', onloadImg);

function onSearch(evt) {
  evt.preventDefault();
  searchQuery = evt.currentTarget.elements.searchQuery.value;
  galeryEl.innerHTML = '';

  if (searchQuery !== '') {
    page = 1;

    onloadImg();
  }
}

function onloadImg() {
  getUser(searchQuery).then(({ data }) => {
    if (data.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      rendorImagesGallery(data.hits);
      page += 1;
      if (page > 1) {
        btnLoadMoreEl.style.display = 'block';
      }
    }
    if (page > totalHits) {
      btnLoadMoreEl.style.display = 'none';
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });
}

export async function getUser(name) {
  try {
    const response = await axios.get(
      `${BASE_URL}${API_KEY}&q=${name}${OPTIONS}&page=${page}`
    );

    return response;
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
