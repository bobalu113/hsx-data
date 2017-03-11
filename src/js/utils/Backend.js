'use strict';

import xhr from 'xhr';
import {Categories, TimeFilters} from '../Constants';

class Backend {

  getMovies(filter, callback) {
    let params = { 
      startLockIn: filter.get('startDate'),
      endLockIn: filter.get('endDate')
    };
    switch (filter.category) {
      case Categories.Blockbuster:
      case Categories.Arthouse:
        params.category = filter.category;
        break;
    }

    hxr.get({ url: '/movies', qs: params }, (error, resp, body) => {
      callback(filter, JSON.parse(body));
    })
  }

  refreshMovie(movieId, callback) {
    hxr.get({ url: '/movies/' + movieId, qs: { 'refresh': true } }, (error, resp, body) => {
      callback(JSON.parse(body));
    })
  }
  
}

let backend = new Backend();
export default backend;
