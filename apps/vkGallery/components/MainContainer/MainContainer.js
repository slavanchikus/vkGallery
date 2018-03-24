import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { tokenRequest, userRequest, photoRequest, friendsRequest, sortByLikes, sortByComments, pickAlbum, albumRequest, resetStore } from '../../actions/actions';
import { photosSelector, albumsSelector, userSelector, friendsSelector, uiStateSelector } from '../../selector/mainSelector';

import Settings from '../Settings/Settings.js';
import Photos from '../Photos/Photos.js';
import AlbumPicker from '../AlbumPicker/AlbumPicker';
import Gallery from '../Gallery/Gallery';
import FriendsBar from '../FriendsBar/FriendsBar';

import { getAccessToken } from '../../../index/utils/getAccessToken';

import styles from './MainContainer.module.styl';

const mapStateToProps = state => ({
  photos: photosSelector(state),
  albums: albumsSelector(state),
  user: userSelector(state),
  friends: friendsSelector(state),
  uiState: uiStateSelector(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ tokenRequest, userRequest, albumRequest, photoRequest, friendsRequest, sortByLikes, sortByComments, pickAlbum, resetStore }, dispatch);

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAppReady: false,
      inputValue: '',
      isGalleryVisible: false,
      indexOfPhoto: 0,
      showSpinner: false,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('access_token_vkGallery') || getAccessToken();
    if (!accessToken) this.props.tokenRequest();
    const inputValue = localStorage.getItem('user_id_vkGallery');
    this.props.userRequest(inputValue);
    this.handleInputValue(inputValue);
    setTimeout(() => this.props.friendsRequest(inputValue), 1000);
  }

  componentWillReceiveProps({ user, friends, albums, uiState }) {
    if (!user.error && (this.props.user.id !== user.id || this.props.albums.selectedAlbumId !== albums.selectedAlbumId)) {
      this.props.photoRequest(user.id, 0, 50, albums.selectedAlbumId);
    }
    if (this.props.friends !== friends) {
      this.setState({ isAppReady: true });
    }
    if (!uiState.isFetching && this.props.uiState.isFetching) {
      clearTimeout(this.loader);
      if (this.state.showSpinner) this.setState({ showSpinner: false });
    }
    if (uiState.isFetching && !this.props.uiState.isFetching) {
      this.loader = setTimeout(() => this.setState({ showSpinner: true }), 1000);
    }
  }

  componentWillUnmount() {
    this.props.resetStore();
  }

  handleUserRequest = () => {
    if (this.props.user.lastInputValue !== this.state.inputValue) {
      this.props.userRequest(this.state.inputValue);
    }
  };

  handlePhotoClick= (index) => {
    if (!this.state.isGalleryVisible) this.setState({ isGalleryVisible: true });
    this.setState({ indexOfPhoto: index });
  };

  handleInputValue = (id) => {
    this.setState({ inputValue: id });
  };

  toggleGalleryState = () => {
    this.setState({ isGalleryVisible: !this.state.isGalleryVisible });
  };

  render() {
    const { isAppReady, inputValue, indexOfPhoto, isGalleryVisible, showSpinner } = this.state;
    const { photos, user, friends, albums, uiState } = this.props;
    if (!isAppReady) {
      return (
        <div className={styles.spinner} />
      );
    }
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Settings
            user={user}
            inputValue={inputValue}
            isPhotosEmpty={photos.length < 1}
            onChange={this.handleInputValue}
            onUserRequest={this.handleUserRequest}
            onSortLikes={this.props.sortByLikes}
            onSortComments={this.props.sortByComments}
          />
          {showSpinner && <div className={styles.loader} />}
          <AlbumPicker
            user={user}
            albums={albums}
            onAlbumRequest={this.props.albumRequest}
            onPickAlbum={this.props.pickAlbum}
          />
        </div>
        {photos.length > 0 &&
        <Photos
          user={user}
          photos={photos}
          isFetching={uiState.isFetching}
          selectedAlbumId={albums.selectedAlbumId}
          onPhotoClick={this.handlePhotoClick}
          onPhotoRequest={this.props.photoRequest}
        />
        }
        {isGalleryVisible &&
        <Gallery
          indexOfPhoto={indexOfPhoto}
          photos={photos}
          closeGallery={this.toggleGalleryState}
        />
        }
        {friends.length > 0 &&
        <FriendsBar
          friends={friends}
          onUserRequest={this.props.userRequest}
          onChangeInput={this.handleInputValue}
        />}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

