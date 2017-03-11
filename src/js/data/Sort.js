'use strict';

import Immutable from 'immutable';
import {Columns, SortOrder} from '../Constants';

const Sort = Immutable.Record({
  column: Columns.LOCK_IN,
  order: SortOrder.ASC
});

export default Sort;
