'use strict';

import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import {ActionTypes, 
        Categories,
        TimeFilters,
        Columns,
        SortOrder} from '../Constants';
import Dispatcher from '../Dispatcher';
import App from '../data/App';
import moment from 'moment';

export class AppStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return new App();
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.FILTER:
        return state.set('filter', action.filter)
                    .set('filtering', true);

      case ActionTypes.FILTERED:
        return state.set('filtering', false);

      case ActionTypes.SORT:
        return state.set('sort', action.sort);

      default:
        return state;
    }
  }
}

export default new AppStore();
