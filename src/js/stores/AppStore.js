'use strict';

import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import {ActionTypes, 
        Categories,
        TimeFilters,
        Columns,
        SortOrder} from '../Constants';
import Dispatcher from '../Dispatcher';
import MovieStore from '../stores/MovieStore'
import App from '../data/App';

export class AppStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    let state = new App();
    return state;
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.FILTER:
        return state.set('filter', action.filter)
                    .set('filtering', true);

      case ActionTypes.FILTERED:
        Dispatcher.waitFor([MovieStore.getDispatchToken()]);
        return state.set('filtering', false);

      case ActionTypes.SORT:
        return state.set('sort', action.sort);

      default:
        return state;
    }
  }
}

export default new AppStore();
