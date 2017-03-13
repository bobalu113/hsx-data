'use strict';

import Immutable from 'immutable';

const Movie = Immutable.Record({
  _id: '',
  title: '',
  category: '',
  lockIn: '',
  wiki: '',
  hsxUrl: '',
  hsxSymbol: '',
  currentValue: 0.0,
  trend: 0.0,
  trendPercent: 0.0,
  heldLong: 0,
  heldShort: 0,
  volume: 0,
  weekHigh: 0.0,
  weekLow: 0.0,
  monthHigh: 0.0,
  monthLow: 0.0,
  seasonHigh: 0.0,
  seasonLow: 0.0,
  yearHigh: 0.0,
  yearLow: 0.0,
  refresh: '',
  watched: false,
  refreshing: false
});

export default Movie;
