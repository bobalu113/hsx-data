'use strict';

import {ActionTypes} from '../Constants';
import Dispatcher from '../Dispatcher';
import Backend from '../utils/Backend';

const Actions = {
  refresh(movies) {
    Dispatcher.dispatch({
      type: ActionTypes.REFRESH,
      movies: movies
    });
    let options = { };
    Backend.getMovies(movies => {
      this.refreshed(movies);
    }, options);
  },

  refreshed(movies) {
    Dispatcher.dispatch({
      type: ActionTypes.REFRESHED,
      movies
    });
  },
  
};

export default Actions;
