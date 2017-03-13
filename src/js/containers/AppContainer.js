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

      onRefresh: (movieId, sort) => { Actions.refresh(movieId, sort, Actions.refreshed) },
      onFilter: (filter, sort) => { Actions.filter(filter, sort, Actions.filtered) },
      onSort: Actions.sort,
      onWatch: Actions.watch,
      onUnwatch: Actions.unwatch
    };
  }

  componentWillMount() {
    Actions.filter(this.state.app.get('filter'), this.state.app.get('sort'), Actions.filtered);
  }

  render() {
    return (
      <AppView app={this.state.app}
               movies={this.state.movies}
               onRefresh={this.state.onRefresh} 
               onFilter={this.state.onFilter} 
               onSort={this.state.onSort} 
               onWatch={this.state.onWatch}
               onUnwatch={this.state.onUnwatch} />
    );
  }
}

export default Container.create(AppContainer);
