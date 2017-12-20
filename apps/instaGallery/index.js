import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { store } from './reducers/store';

import MainContainer from './components/MainContainer/MainContainer';

export class instaGallery extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainContainer />
      </Provider>
    );
  }
}
