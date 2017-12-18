import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Photos.module.styl';

export default class Photos extends Component {
  static propTypes = {
    photos: PropTypes.array.isRequired,
    settings: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    onPhotoClick: PropTypes.func.isRequired,
    onPhotoRequest: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.photos !== this.props.photos;
  }

  handleScroll = () => {
    if ((this.container.scrollHeight - this.container.scrollTop === this.container.clientHeight) && this.props.photos.length % 50 === 0) {
      this.props.onPhotoRequest(this.props.user.id, this.props.photos.length, 50, 'wall', this.props.settings.album);
    }
  };

  render() {
    const { photos, user } = this.props;
    return (
      <div>
        <div className={styles.container} onScroll={this.handleScroll} ref={node => (this.container = node)}>
          {user && user.first_name && photos && photos.map((pic, index) =>
            <div
              id={index}
              key={pic.pid}
              className={styles.img}
              onClick={() => this.props.onPhotoClick(index)}
              style={{ backgroundImage: `url(${pic.src})` }}
            >
              <div className={styles.panel}>
                <div className={styles.like} /><span className={styles.count}>{pic.likes.count}</span>
                <div className={styles.comment} /><span className={styles.count}>{pic.comments.count}</span>
              </div>
            </div>)}
        </div>
      </div>
    );
  }
}
