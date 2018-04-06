import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './index.module.styl';

export default class StartPoint extends Component {

  handleMouseEnter = (color) => {
    this.container.style.background = color;
  };

  handleMouseLeave= (color) => {
    this.container.style.background = color;
  };

  render() {
    return (
      <div ref={node => (this.container = node)} className={styles.container}>
        <div
          onMouseEnter={() => this.handleMouseEnter('#a7d8fa')}
          onMouseLeave={() => this.handleMouseLeave('#edeef0')}
        >
          <Link to="/vkgallery" className={styles.vk} />
        </div>
        <div
          onMouseEnter={() => this.handleMouseEnter('#fabfa7')}
          onMouseLeave={() => this.handleMouseLeave('#edeef0')}
        >
          <Link to="/instagallery" className={styles.insta} />
        </div>
        <div
          onMouseEnter={() => this.handleMouseEnter('#dce082')}
          onMouseLeave={() => this.handleMouseLeave('#edeef0')}
        >
          <Link to="/vkaudio" className={styles.music} />
        </div>
      </div>
    );
  }
}
