'use strict';

import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import {ActionTypes} from '../Constants';
import Dispatcher from '../Dispatcher';
import Movie from '../data/Movie';

export class MovieStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return Immutable.OrderedMap({});
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.REFRESH:
        return state.setIn([ action.movieId, 'refreshing' ], true);
        
      case ActionTypes.REFRESHED:
        let movie = action.movie.set('refreshing', false);
        return state.mergeIn([ movie.get('_id') ], movie);

      case ActionTypes.FILTERED:
        return action.movies;

      case ActionTypes.WATCH:
      case ActionTypes.UNWATCH:
        return state.set(action.movie.get('_id'), action.movie);

      case ActionTypes.SORT:
        return state.sort((a, b) => {
          let column = action.sort.column.id;
          let result = 0;
          if (a[column] < b[column]) { result = -1; }
          else if (a[column] > b[column]) { result = 1; }
          if (action.sort.order == SortOrder.ASC) {
            return result;
          } else {
            return -result;
          }
        });

      default:
        return state;
    }
  }
}

export default new MovieStore();
