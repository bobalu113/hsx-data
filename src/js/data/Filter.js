'use strict';

import Immutable from 'immutable';
import {Categories, Dates} from '../Constants';

const Filter = Immutable.Record({
  category: '', // All
  startDate: Dates.StartDate,
  endDate: Dates.EndDate,
  watched: false
});

export default Filter;
