'use strict';

import Immutable from 'immutable';
import Filter from './Filter';
import Sort from './Sort';

const App = Immutable.Record({
	sort: new Sort(),
	filter: new Filter(),
	filtering: false
});

export default App;
