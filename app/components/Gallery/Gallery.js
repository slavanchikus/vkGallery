import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Gallery.module.styl';

export default class Gallery extends Component {
  static propTypes = {
    photos: PropTypes.array.isRequired,
    indexOfPhoto: PropTypes.number.isRequired,
    closeGallery: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      photoIndex: props.indexOfPhoto
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('click', this.handleClickOutside);
  }

  moveRight = () => {
    const { photoIndex } = this.state;
    let nextIndex;
    if (photoIndex < this.props.photos.length - 1) {
      nextIndex = photoIndex + 1;
    } else {
      nextIndex = 0;
    }
    this.setState({ photoIndex: nextIndex });
  };

  moveLeft = () => {
    const { photoIndex } = this.state;
    let nextIndex;
    if (photoIndex === 0) {
      nextIndex = this.props.photos.length - 1;
    }
    if (photoIndex < this.props.photos.length && photoIndex !== 0) {
      nextIndex = photoIndex - 1;
    }
    this.setState({ photoIndex: nextIndex });
  };


  handleClick = () => {
    this.moveRight();
  };

  handleClickOutside = (e) => {
    if (!this.photo.contains(e.target)) {
      this.props.closeGallery();
    }
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.props.closeGallery();
    }
    if (e.keyCode === 39) {
      this.moveRight();
    } if (e.keyCode === 37) {
      this.moveLeft();
    }
  };

  render() {
    const { photoIndex } = this.state;
    const { photos } = this.props;
    return (
      <div className={styles.overlay}>
        <div className={styles.container}>
          <div onClick={this.handleClick}>
            <img
              ref={node => (this.photo = node)}
              src={photos[photoIndex].src_big}
              alt={photos[photoIndex].text}
            />
          </div>
        </div>
      </div>
    );
  }
}
