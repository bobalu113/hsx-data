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
      movie: new Movie(movie)
    });
  },

  filter(filter) {
    Dispatcher.dispatch({
      type: ActionTypes.FILTER,
      filter
    });
    Backend.getMovies(filter, movies => {
      Actions.filtered(movies);
    });
  },

  filtered(filter, movieList) {
    let movies = Immutable.OrderedMap({});
    for (let movie of movieList) {
      let watched = JSON.parse(
        localStorage.getItem(WatchedStoreItem)
      );
      movie.watched = watched.hasOwnProperty(movie._id);
      if (!filter.get('watched') || movie.watched) {
        movies = movies.set(movie._id, new Movie(movie));
      }
    }
    Dispatcher.dispatch({
      type: ActionTypes.FILTERED,
      movies
    });
  },

  sort(sort) {
    Dispatcher.dispatch({
      type: ActionTypes.SORT,
      sort
    });
  },

  watch(movie) {
    movie.set('watched', true),
    Dispatcher.dispatch({
      type: ActionTypes.WATCH,
      movie
    })
  },

  unwatch(movie) {
    movie.set('watched', false),
    Dispatcher.dispatch({
      type: ActionTypes.UNWATCH,
      movie
    })
  }
  
};

export default Actions;
