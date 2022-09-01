import './css/styles.css';
import { rendorImagesGallery } from './JS/rendor';
import { getUser } from './JS/fetch';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('#search-form');
const btnLoadMoreEl = document.querySelector('.load-more');
const galeryEl = document.querySelector('.gallery');

btnLoadMoreEl.style.display = 'none';
let page = 1;
let searchQuery = '';
let gallery = new SimpleLightbox('.gallery a');

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
  getUser(searchQuery, page).then(({ data }) => {
    rendorImagesGallery(data.hits);
    page += 1;

    if (data.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    if (page > 1) {
      btnLoadMoreEl.style.display = 'block';
    }
    if (data.hits.length < 40) {
      btnLoadMoreEl.style.display = 'none';
    }
    if (data.hits > 500) {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      loadButton.style.display = 'none';
      return;
    }
    gallery.refresh();
  });
}
