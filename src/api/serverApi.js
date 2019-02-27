import fetcher from './fetcher';
import {OMDB_API_ROOT, WIKI_API_ROOT} from './urls';

export default {
  getMovies(options) { 
      const url = fetcher.buildUrl(OMDB_API_ROOT, options);
      return fetcher.get(url);
  },
  getWikiData(options) { 
      const url = fetcher.buildUrl(WIKI_API_ROOT, options);
      return fetcher.get(url);
  }
}