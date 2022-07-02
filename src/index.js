import './sass/index.scss';
import Notiflix, { Notify } from 'notiflix';
import FetchApi from './js/fetchApi';
import { createGalleryEl } from './js/renderMurkUp';

const form = document.querySelector('.search-form');
const galary = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const fetchApi = new FetchApi();

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', loadMore);

async function onSearch(e) {
  e.preventDefault();
  resetGalery();
  fetchApi.resetPage();

  fetchApi.query = e.currentTarget.elements.searchQuery.value;

  if (fetchApi.query === '') {
    notFoundImagaes();
    form.reset();
    return;
  }

  const pictures = await fetchApi.fetchPicures();

  if (fetchApi.totalHits === 0) {
    notFoundImagaes();
  } else {
    onFoundImages(fetchApi.totalHits);
    renderMurkUp(pictures);
  }

  form.reset();
}

function renderMurkUp(array) {
  galary.insertAdjacentHTML('beforeend', createGalleryEl(array));
}

async function loadMore() {
  fetchApi.incrementPage();

  const images = await fetchApi.fetchPicures();
  renderMurkUp(images);
}

function notFoundImagaes() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function onFoundImages(totalHits) {
  Notify.success(`Hooray! We found ${totalHits} images.`);
}

function resetGalery() {
  galary.innerHTML = '';
}
