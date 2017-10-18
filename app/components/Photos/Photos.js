import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Photos extends Component {
  static propTypes = {
    photos: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    onPhotoClick: PropTypes.func.isRequired,
  };

  render() {
    const { photos, user } = this.props;
    return (
      <div className="lightbox">
        {user && user.first_name ? photos.map((pic, index) =>
          <div
            id={index}
            key={pic.pid}
            className="lightbox-image"
            onClick={() => this.props.onPhotoClick(index)}
            style={{ backgroundImage: `url(${pic.src})` }}
          >
            <div className="lightbox-likes">
              <div className="like" /><span className="like-count">{pic.likes.count}</span>
              <div className="comment" /><span className="comment-count">{pic.comments.count}</span>
            </div>
          </div>)
            : <p>Введите никнейм или айди :)</p>}
      </div>
    );
  }
}
