import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Waypoint from 'react-waypoint';

import styles from './Photos.module.styl';

export default class Photos extends Component {
  static propTypes = {
    photos: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    onPhotoClick: PropTypes.func.isRequired,
    onPhotoRequest: PropTypes.func.isRequired,
  };

  handlePhotoRequest = () => {
    this.props.onPhotoRequest(this.props.user.id, this.props.photos.length, 50);
  };

  render() {
    const { photos, user } = this.props;
    return (
      <div>
        <div className={styles.container}>
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
          {!photos.length && user.first_name && <p>У существующего пользователя нет фоток :(</p>}
          {!photos.length && user.error && <p>Юзера с таким ид не существует :(</p>}
          {!photos.length && !user.first_name && !user.error && <p>Введите никнейм или айди :)</p>}
        </div>
        {photos && photos.length % 50 !== 1 && <Waypoint onEnter={this.handlePhotoRequest} />}
      </div>
    );
  }
}
