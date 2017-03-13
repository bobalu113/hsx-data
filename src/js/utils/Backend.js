'use strict';

import xhr from 'xhr';
import {Categories, TimeFilters} from '../Constants';

class Backend {

  getMovies(filter, callback) {
    let query = "?startLockIn=" + filter.get('startDate').toISOString();
    query += "&endLockIn=" + filter.get('endDate').toISOString();
    switch (filter.get('category')) {
      case Categories.Blockbuster:
      case Categories.Arthouse:
        query += "&category=" + filter.get('category');
        break;
    }

    xhr.get({ url: '/movies' + query }, (error, resp, body) => {
      let movies = JSON.parse(body);
      movies.map(movie => {
        movie.lockIn = new Date(movie.lockIn);
        movie.refresh = new Date(movie.refresh);
      });
      callback(filter, movies);
    })
  }

  refreshMovie(movieId, callback) {
    xhr.get({ url: '/movie/' + movieId + '?refresh=true' }, (error, resp, body) => {
      let movie = JSON.parse(body);
      movie.lockIn = new Date(movie.lockIn);
      movie.refresh = new Date(movie.refresh);
      callback(movie);
    })
  }
  
}

let backend = new Backend();
export default backend;
