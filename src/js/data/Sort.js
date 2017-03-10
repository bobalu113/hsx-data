'use strict';

import Immutable from 'immutable';
import {SortOrder} from '../Constants';

const Sort = Immutable.Record({
  column: null,
  order: SortOrder.ASC
});

export default Sort;
