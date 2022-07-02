import './css/style.css';
import axios from 'axios';
import FetchApi from './js/fetchApi';

const form = document.querySelector('.search-form');
const galary = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', loadMore);

let pageNumber = 1;

function onSearch(e) {
  e.preventDefault();

  const inputValue = e.currentTarget.elements.searchQuery.value;
  getPictures(inputValue).then(res => {
    const galeryEl = createGalleryEl(res);
    console.log(galeryEl);
    galary.insertAdjacentHTML('beforeend', galeryEl);
  });
}

async function getPictures(text) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=28284857-c4178a6b6af7e22cb7b0abd73&q=${text}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageNumber}`
    );
    // console.log(response.data.hits);
    return response.data.hits;
  } catch (error) {
    console.error(error);
  }
}

function createGalleryEl(pictures) {
  return pictures
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
        return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
}

function loadMore() {
  pageNumber += 1;
  getPictures(inputValue).then(res => {
    const galeryEl = createGalleryEl(res);
    console.log(galeryEl);
    galary.insertAdjacentHTML('beforeend', galeryEl);
  });
}
