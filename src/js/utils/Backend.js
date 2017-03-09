'use strict';

import xhr from 'xhr';
import {Categories, TimeFilters} from '../Constants';

class Backend {

  getMovies(filter, callback) {
    let params = { };
    switch (filter.timeFilter) {
      case TimeFilters.WEEK:
        let now = new Date();
        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let oneWeek = new Date(today);
        oneWeek.setDate(week.getDate() + 7);
        params.startLockIn = today;
        params.endLockIn = oneWeek;
        break;
      case TimeFilters.CUSTOM:
        params.startLockIn = filter.startDate;
        params.endLockIn = filter.endDate;
        break;
    }
    switch (filter.category) {
      case Category.Blockbuster:
      case Category.Arthouse:
        params.category = filter.category;
        break;
    }

    hxr.get({ url: '/movies', qs: params }, (error, resp, body) => {
      callback(JSON.parse(body));
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
