import './sass/index.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix';
import FetchApi from './js/fetchApi';
import { createGalleryEl } from './js/renderMurkUp';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const fetchApi = new FetchApi();
const lightbox = new SimpleLightbox('.gallery a');

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

async function loadMore() {
  fetchApi.incrementPage();

  const images = await fetchApi.fetchPicures();
  renderMurkUp(images);
}

function renderMurkUp(array) {
  gallery.insertAdjacentHTML('beforeend', createGalleryEl(array));
  lightbox.refresh();
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
  gallery.innerHTML = '';
}
