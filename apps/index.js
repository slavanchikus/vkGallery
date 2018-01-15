import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { vkGallery } from './vkGallery/index';
import { instaGallery } from './instaGallery/index';
import StartPoint from './index/components/StartPoint/StartPoint';

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={StartPoint} />
          <Route path="/vk" component={vkGallery} />
          <Route path="/insta" component={instaGallery} />
        </div>
      </BrowserRouter>
    );
  }
}
render(
  <App />,
    document.getElementById('root')
);
