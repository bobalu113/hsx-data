'use strict';

import React from 'react';
import {Container} from 'flux/utils';
import AppView from '../views/AppView';
import Actions from '../actions/Actions';
import MovieStore from '../stores/MovieStore'
import AppStore from '../stores/AppStore'

class AppContainer extends React.Component {
  static getStores() {
    return [
      AppStore,
      MovieStore
    ];
  }

  static calculateState(prevState) {  
    return {
      app: AppStore.getState(),
      movies: MovieStore.getState(),

      onRefresh: movieId => { Actions.refresh(movieId, Actions.refreshed) },
      onFilter: (filter, sort) => { Actions.filter(filter, sort, Actions.filtered) },
      onSort: Actions.sort,
      onWatch: Actions.watch,
      onUnwatch: Actions.unwatch
    };
  }

  render() {
    return (
      <AppView app={this.state.app}
               movies={this.state.movies}
               onRefresh={this.state.onRefresh.bind(this)} 
               onFilter={this.state.onFilter.bind(this)} 
               onSort={this.state.onSort.bind(this)} 
               onWatch={this.state.onWatch.bind(this)}
               onUnwatch={this.state.onUnwatch.bind(this)} />
    );
  }
}

export default Container.create(AppContainer);
