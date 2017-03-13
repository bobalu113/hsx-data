'use strict';

import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import {ActionTypes, SortOrder} from '../Constants';
import Dispatcher from '../Dispatcher';
import Movie from '../data/Movie';

export class MovieStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return Immutable.OrderedMap({});
  }

  sortState(state, sort) {
    return state.sort((a, b) => {
      let column = sort.get('column').id;
      let result = 0;
      if (a.get(column) < b.get(column)) { result = -1; }
      else if (a.get(column) > b.get(column)) { result = 1; }
      if (sort.get('order') == SortOrder.ASC) {
        return result;
      } else {
        return -result;
      }
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.REFRESH:
        return state.setIn([ action.movieId, 'refreshing' ], true);
        
      case ActionTypes.REFRESHED:
        let movie = action.movie.set('refreshing', false);
        return this.sortState(state.mergeIn([ movie.get('_id') ], movie), action.sort);

      case ActionTypes.FILTERED:
        return this.sortState(action.movies, action.sort);

      case ActionTypes.WATCH:
      case ActionTypes.UNWATCH:
        return state.set(action.movie.get('_id'), action.movie);

      case ActionTypes.SORT:
        return this.sortState(state, action.sort);

      default:
        return state;
    }
  }
}

export default new MovieStore();
