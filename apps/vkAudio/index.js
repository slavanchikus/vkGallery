import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { store } from './reducers/store';

import MainContainer from './components/MainContainer/MainContainer';

export class vkAudio extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainContainer />
      </Provider>
    );
  }
}
