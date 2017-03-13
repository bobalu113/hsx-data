'use strict';

import React from 'react';
import FilterView from './FilterView';
import MoviesView from './MoviesView';
import '../../sass/common.scss';

class AppView extends React.Component {
  render() {
    return (
      <div>
        <FilterView filter={this.props.app.get('filter')} 
                    onFilter={this.props.onFilter} 
                    sort={this.props.app.get('sort')} 
                    onSort={this.props.onSort} />
        <MoviesView movies={this.props.movies}
                    sort={this.props.app.get('sort')} 
                    onSort={this.props.onSort}
                    onRefresh={this.props.onRefresh} 
                    onWatch={this.props.onWatch}
                    onUnwatch={this.props.onUnwatch} />
      </div>
    );
  }
}

export default AppView;
