import './css/styles.css';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('#search-form');
const btnLoadMoreEl = document.querySelector('.load-more');
const galeryEl = document.querySelector('.gallery');

formEl.addEventListener('submit', onSearch);
btnLoadMoreEl.addEventListener('click', onloadImg);

btnLoadMoreEl.style.display = 'none';
let page = 1;
let searchQuery = '';
let total = 0;

function onSearch(evt) {
  evt.preventDefault();
  const searchQuery = evt.currentTarget.elements.searchQuery.value;
  galeryEl.innerHTML = '';
  total = 0;

  if (searchQuery !== '') {
    page = 1;
    onloadImg();
  }
}

function onloadImg() {
  getUser(searchQuery).then(({ data }) => {
    rendorImagesGallery(data.hits);
    page += 1;
    if (page > 1) {
      btnLoadMoreEl.style.display = 'block';
    }
  });
}

const BASE_URL = 'https://pixabay.com/api/?key=';
const API_KEY = '29562775-0cedab5e27dd705c115fa7ca4';
const OPTIONS =
  '&image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

async function getUser(name) {
  try {
    const response = await axios.get(
      `${BASE_URL}${API_KEY}&q=${name}${OPTIONS}&page=${page}`
    );
    total += response.data.hits.length;
    const totalHits = response.data.totalHits;
    if (total >= totalHits) {
      Notify.warning(
        'We`re sorry, but you`ve reached the end of search results.'
      );
      btnLoadMoreEl.style.display = 'none';
    }
    return response;
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
getUser().then(users => console.log(users));

function rendorImagesGallery(img) {
  const markup = img
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
    <div class="photo-card">
    <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
    <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`;
      }
    )
    .join('');

  galeryEl.insertAdjacentHTML('beforeend', markup);
}
