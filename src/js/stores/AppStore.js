'use strict';

import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import {ActionTypes, 
        Categories,
        TimeFilters,
        Columns,
        SortOrder} from '../Constants';
import Dispatcher from '../Dispatcher';

export class AppStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return Immutable.Map({
      filter: Immutable.Map({
        timeFilter: TimeFilters.WEEK
      }),
      sort: new Sort({
        column: Columns.LOCK_IN,
        order: SortOrder.ASC
      })
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.FILTER:
        return action.filter.set('filtering', true);

      case ActionTypes.FILTERED:
        return state.set('filtering', false);

      case ActionTypes.SORT:
        return state.set('sort', action.sort);

      default:
        return state;
    }
  }
}

export default new FilterStore();
