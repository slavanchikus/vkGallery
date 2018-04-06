import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { vkGallery } from './vkGallery/index';
import { instaGallery } from './instaGallery/index';
import { vkAudio } from './vkAudio/index';
import StartPoint from './index/index';

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={StartPoint} />
          <Route path="/vkgallery" component={vkGallery} />
          <Route path="/instagallery" component={instaGallery} />
          <Route path="/vkaudio" component={vkAudio} />
        </div>
      </BrowserRouter>
    );
  }
}
render(
  <App />,
    document.getElementById('root')
);
