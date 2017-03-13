'use strict';

import Immutable from 'immutable';
import {ActionTypes} from '../Constants';
import Dispatcher from '../Dispatcher';
import Backend from '../utils/Backend';
import Movie from '../data/Movie';

const WatchedStoreItem = 'watched';

function persistWatch(movieId, watched) {
  let watchSet = JSON.parse(localStorage.getItem(WatchedStoreItem));
  watchSet[movieId] = watched;
  localStorage.setItem(WatchedStoreItem, JSON.stringify(watchSet));
}

function getWatches() {
  let watchSet = JSON.parse(localStorage.getItem(WatchedStoreItem));
  if (watchSet == undefined) {
    watchSet = { };
  }
  localStorage.setItem(WatchedStoreItem, JSON.stringify(watchSet));
  return watchSet;
}

const Actions = {
  refresh(movieId, sort, refreshed) {
    Dispatcher.dispatch({
      type: ActionTypes.REFRESH,
      movieId
    });
    Backend.refreshMovie(movieId, movie => {
      refreshed(sort, movie);
    });
  },

  refreshed(sort, movie) {
    let watches = getWatches();
    movie.watched = watches[movie._id];
    Dispatcher.dispatch({
      type: ActionTypes.REFRESHED,
      movie: new Movie(movie),
      sort
    });
  },

  filter(filter, sort, filtered) {
    Dispatcher.dispatch({
      type: ActionTypes.FILTER,
      filter
    });
    Backend.getMovies(filter, (f, mL) => { filtered(f, sort, mL); });
  },

  filtered(filter, sort, movieList) {
    let movies = Immutable.OrderedMap({});
    let watches = getWatches();
    for (let movie of movieList) {
      movie.watched = watches[movie._id];
      if (!(filter.get('watched')) || movie.watched) {
        movies = movies.set(movie._id, new Movie(movie));
      }
    }
    Dispatcher.dispatch({
      type: ActionTypes.FILTERED,
      movies,
      sort
    });
  },

  sort(sort) {
    Dispatcher.dispatch({
      type: ActionTypes.SORT,
      sort
    });
  },

  watch(movie) {
    persistWatch(movie.get('_id'), true);
    movie = movie.set('watched', true),
    Dispatcher.dispatch({
      type: ActionTypes.WATCH,
      movie
    })
  },

  unwatch(movie) {
    persistWatch(movie.get('_id'), false);
    movie = movie.set('watched', false),
    Dispatcher.dispatch({
      type: ActionTypes.UNWATCH,
      movie
    })
  }
  
};

export default Actions;
