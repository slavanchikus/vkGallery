import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Photos.module.styl';

export default class Photos extends Component {
  static propTypes = {
    photos: PropTypes.array.isRequired,
    onPhotoClick: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.photos !== this.props.photos;
  }

  render() {
    const { photos } = this.props;
    return (
      <div className={styles.container}>
        {photos && photos.map((pic, index) =>
          <div className={styles.img} key={pic.id}>
            <div className={styles.panel}>
              <div className={styles.like} /><span className={styles.count}>{pic.likes.count}</span>
              <div className={styles.comment} /><span className={styles.count}>{pic.comments.count}</span>
            </div>
            <img
              id={index}
              onClick={() => this.props.onPhotoClick(index)}
              src={pic.thumbnail_resources[0].src}
              alt="Фоточка"
            />
          </div>)}
      </div>
    );
  }
}
