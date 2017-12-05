import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { tokenRequest, userRequest, photoRequest, sortByLikes, sortByComments } from '../../actions/actions';
import { photosSelector } from '../../selector/photosSelector';
import { userSelector } from '../../selector/userSelector';

import Settings from '../Settings/Settings.js';
import Photos from '../Photos/Photos.js';
import Gallery from '../Gallery/Gallery';

import { getAccessToken } from '../../utils/getAccessToken';

import styles from './MainContainer.module.styl';

const mapStateToProps = state => ({ photos: photosSelector(state), user: userSelector(state) });

const mapDispatchToProps = dispatch =>
    bindActionCreators({ tokenRequest, userRequest, photoRequest, sortByLikes, sortByComments }, dispatch);

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      isGalleryVisible: false,
      indexOfPhoto: 0,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('access_token_vkGallery') || getAccessToken();
    const userId = localStorage.getItem('user_id_vkGallery');
    if (!accessToken) this.props.tokenRequest();
    this.props.userRequest(userId);
  }

  componentWillReceiveProps({ user }) {
    if (this.props.user.id !== user.id && !user.error) {
      const countPhotos = this.props.photos.length ? this.props.photos.length : 50;
      this.props.photoRequest(user.id, 0, countPhotos);
    }
  }

  handleUserRequest = () => {
    this.props.userRequest(this.state.inputValue);
  };

  handlePhotoClick= (index) => {
    if (!this.state.isGalleryVisible) this.setState({ isGalleryVisible: true });
    this.setState({ indexOfPhoto: index });
  };

  handleInputValue = (id) => {
    this.setState({ inputValue: id });
  };

  toggleExpandState = () => {
    this.setState({ isGalleryVisible: !this.state.isGalleryVisible });
  };

  render() {
    const { inputValue, indexOfPhoto, isGalleryVisible } = this.state;
    const { photos, user } = this.props;
    return (
      <div className={styles.container}>
        <Settings
          user={user}
          inputValue={inputValue}
          isPhotosEmpty={photos.length < 1}
          onChange={this.handleInputValue}
          onUserRequest={this.handleUserRequest}
          onSortLikes={this.props.sortByLikes}
          onSortComments={this.props.sortByComments}
        />
        {photos.length > 0 &&
        <Photos
          user={user}
          photos={photos}
          onPhotoClick={this.handlePhotoClick}
          onPhotoRequest={this.props.photoRequest}
        />
        }
        {isGalleryVisible &&
        <Gallery
          indexOfPhoto={indexOfPhoto}
          photos={photos}
          closeGallery={this.toggleExpandState}
        />
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

