'use strict';

import xhr from 'xhr';
import {Categories, TimeFilters} from '../Constants';

class Backend {

  getMovies(filter, callback) {
    let params = { 
      startLockIn: filter.get('startDate'),
      endLockIn: filter.get('endDate')
    };
    switch (filter.get('category')) {
      case Categories.Blockbuster:
      case Categories.Arthouse:
        params.category = filter.get('category');
        break;
    }

    xhr.get({ url: '/movies', qs: params }, (error, resp, body) => {
      let movies = JSON.parse(body);
      movies.map(movie => {
        movie.lockIn = new Date(movie.lockIn);
      });
      callback(filter, movies);
    })
  }

  refreshMovie(movieId, callback) {
    xhr.get({ url: '/movie/' + movieId, qs: { 'refresh': true } }, (error, resp, body) => {
      let movie = JSON.parse(body);
      movie.lockIn = new Date(movie.lockIn);
      callback(movie);
    })
  }
  
}

let backend = new Backend();
export default backend;
