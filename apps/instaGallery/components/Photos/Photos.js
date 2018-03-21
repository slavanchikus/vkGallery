import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Photos.module.styl';

export default class Photos extends Component {
  static propTypes = {
    photos: PropTypes.array.isRequired,
    onPhotoClick: PropTypes.func.isRequired,
  };

  render() {
    const { photos } = this.props;
    return (
      <div className={styles.container}>
        {photos && photos.map((pic, index) =>
          <div className={styles.img} key={pic.node.id}>
            <div className={styles.panel}>
              <div className={styles.like} /><span className={styles.count}>{pic.node.edge_media_preview_like.count}</span>
              <div className={styles.comment} /><span className={styles.count}>{pic.node.edge_media_to_comment.count}</span>
            </div>
            <img
              id={index}
              onClick={() => this.props.onPhotoClick(index)}
              src={pic.node.thumbnail_resources[0].src}
              alt="Фоточка"
            />
          </div>)}
      </div>
    );
  }
}
