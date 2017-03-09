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

      onRefresh: Actions.refresh,
      onFilter: Actions.filter,
      onSort: Actions.sort
    };
  }

  render() {
    return (
      <AppView app={this.state.app}
               movies={this.state.movies}
               onRefresh={this.state.onRefresh.bind(this)} 
               onFilter={this.state.onFilter.bind(this)} 
               onSort={this.state.onSort.bind(this)} />
    );
  }
}

export default Container.create(AppContainer);
