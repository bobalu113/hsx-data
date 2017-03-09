'use strict';

import Immutable from 'immutable';
import {ActionTypes} from '../Constants';
import Dispatcher from '../Dispatcher';
import Backend from '../utils/Backend';
import Movie from '../data/Movie';

const Actions = {
  refresh(movieId) {
    Dispatcher.dispatch({
      type: ActionTypes.REFRESH,
      movieId
    });
    Backend.refreshMovie(movieId, movie => {
      Actions.refreshed(movie);
    });
  },

  refreshed(movie) {
    Dispatcher.dispatch({
      type: ActionTypes.REFRESHED,
      movie: Immutable.Map(movie)
    });
  },

  filter(filter) {
    Dispatcher.dispatch({
      type: ActionTypes.FILTER,
      filter: Immutable.Map(filter)
    });
    Backend.getMovies(filter, movies => {
      Actions.filtered(movies);
    });
  },

  filtered(movieList) {
    let movies = Immutable.OrderedMap({});
    for (let movie of movieList) {
      movies = movies.set(movie._id, new Movie(movie));
    }
    Dispatcher.dispatch({
      type: ActionTypes.FILTERED,
      movies
    });
  },

  sort(sort) {
    Dispatcher.dispatch({
      type: ActionTypes.SORT,
      sort: new Sort(sort)
    });
  }
  
};

export default Actions;
