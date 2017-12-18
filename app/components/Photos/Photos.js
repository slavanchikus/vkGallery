import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Photos.module.styl';

export default class Photos extends Component {
  static propTypes = {
    photos: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    onPhotoClick: PropTypes.func.isRequired,
    onPhotoRequest: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.photos !== this.props.photos;
  }

  handleScroll = () => {
    if ((this.container.scrollHeight - this.container.scrollTop === this.container.clientHeight) && this.props.photos.length % 50 === 0) {
      this.props.onPhotoRequest(this.props.user.id, this.props.photos.length, 50, this.props.selectedAlbumId);
    }
  };

  render() {
    const { photos, user } = this.props;
    return (
      <div>
        <div className={styles.container} onScroll={this.handleScroll} ref={node => (this.container = node)}>
          {user && user.first_name && photos && photos.map((pic, index) =>
            <div className={styles.img} key={pic.pid}>
              <div className={styles.panel}>
                <div className={styles.like} /><span className={styles.count}>{pic.likes.count}</span>
                <div className={styles.comment} /><span className={styles.count}>{pic.comments.count}</span>
              </div>
              <img
                id={index}
                onClick={() => this.props.onPhotoClick(index)}
                src={pic.src}
              />
            </div>)}
        </div>
      </div>
    );
  }
}
