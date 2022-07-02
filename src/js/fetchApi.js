import axios from 'axios';

export default class FetchPictures {
  constructor() {
    // this.searchQuery = '';
  }

  fetchPicures(searchQuery) {
    async function getPictures(searchQuery) {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=28284857-c4178a6b6af7e22cb7b0abd73&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${1}`
        );
        // console.log(response.data.hits);
        return response.data.hits;
      } catch (error) {
        console.error(error);
      }
    }
    getPictures();
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
