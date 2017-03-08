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
      case ActionTypes.REFRESHED:
        return state.merge(action.movies);

      default:
        return state;
    }
  }
}

export default new MovieStore();
