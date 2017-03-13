'use strict';

import Immutable from 'immutable';
import {Categories, Dates} from '../Constants';
import moment from 'moment';

const Filter = Immutable.Record({
  category: '', // All
  startDate:moment().toDate(),
  endDate: moment().add(6, 'days').toDate(),
  watched: false
});

export default Filter;
