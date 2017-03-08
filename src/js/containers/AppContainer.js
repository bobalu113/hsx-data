'use strict';

import AppView from '../views/AppView';
import React from 'react';
import {Container} from 'flux/utils';
import Actions from '../actions/Actions';
import MovieStore from '../stores/MovieStore'

class AppContainer extends React.Component {
  static getStores() {
    return [
      MovieStore
    ];
  }

  static calculateState(prevState) {  
    return {
      movies: MovieStore.getState(),

      onRefresh: Actions.refresh,
    };
  }

  render() {
    return (
      <AppView movies={this.state.movies}
               onRefresh={this.state.onRefresh.bind(this)} />
    );
  }
}

export default Container.create(AppContainer);
