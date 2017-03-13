'use strict';

import moment from 'moment';

export const ActionTypes = {
  REFRESH: 'REFRESH',
  REFRESHED: 'REFRESHED',
  FILTER: 'FILTER',
  FILTERED: 'FILTERED',
  WATCH: 'WATCH',
  UNWATCH: 'UNWATCH',
  SORT: 'SORT'
};

export const Categories = {
  Blockbuster: 'Blockbuster',
  Arthouse: 'Arthouse'
};

export const TimeFilters = {
  ALL: 'ALL',
  WEEK: 'WEEK',
  CUSTOM: 'CUSTOM'
};

export const Columns = { 
  TITLE: { 
  	id: 'title',
  	label: 'Title',
  	order: 10
  },
  LOCK_IN: { 
  	id: 'lockIn',
  	label: 'Lock-in',
  	order: 20
  },
  CATEGORY: { 
  	id: 'category',
  	label: 'Category',
  	order: 30
  },
  WIKI: { 
  	id: 'wiki',
  	label: 'Wiki',
  	order: 40
  },
  HSX_SYMBOL: {
    id: 'hsxSymbol', 
  	label: 'HSX Symbol',
  	order: 50
  },
  CURRENT_VALUE: { 
  	id: 'currentValue',
  	label: 'Current',
  	order: 60
  },
  TREND: { 
  	id: 'trend',
  	label: 'Trend',
  	order: 70
  },
  TREND_PCT: { 
  	id: 'trendPercent',
  	label: 'Trend %',
  	order: 80
  },
  VOLUME: { 
  	id: 'volume',
  	label: 'Trading Volume',
  	order: 90
  },
  HELD_LONG: { 
  	id: 'heldLong',
  	label: 'Held Long',
  	order: 100
  },
  HELD_SHORT: {
  	id: 'heldShort',
    label: 'Held Short',
   	order: 110
  },
  WEEK_HIGH: { 
  	id: 'weekHigh',
  	label: 'Week High',
  	order: 120
  },
  WEEK_LOW: { 
  	id: 'weekLow',
  	label: 'Week Low',
  	order: 130
  },
  MONTH_HIGH: { 
  	id: 'monthHigh',
  	label: 'Month High',
  	order: 140
  },
  MONTH_LOW: { 
  	id: 'monthLow',
  	label: 'Month Low',
  	order: 150
  },
  SEASON_HIGH: { 
  	id: 'seasonHigh',
  	label: 'Season High',
  	order: 160
  },
  SEASON_LOW: { 
  	id: 'seasonLow',
  	label: 'Season Low',
  	order: 170
  },
  YEAR_HIGH: { 
  	id: 'yearHigh',
  	label: 'Year High',
  	order: 180
  },
  YEAR_LOW: { 
  	id: 'yearLow',
  	label: 'Year Low',
  	order: 190
  },
  WATCHED: {
    id: 'watched',
    label: 'Watched',
    order: 200
  },
  REFRESH: { 
  	id: 'refresh',
  	label: 'Refresh',
  	order: 210
  },
};

export const SortOrder = {
	ASC: 'ASC',
	DESC: 'DESC'
};

export const Dates = { 
  StartDate: moment('2017-01-09T05:29:31.508Z').toDate(),
  EndDate: moment('2018-03-10T05:29:31.509Z').toDate()
};