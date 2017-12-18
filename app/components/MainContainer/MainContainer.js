import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { tokenRequest, userRequest, photoRequest, friendsRequest, sortByLikes, sortByComments, pickAlbum, albumRequest } from '../../actions/actions';
import { photosSelector, albumsSelector, userSelector, friendsSelector } from '../../selector/mainSelector';

import Settings from '../Settings/Settings.js';
import Photos from '../Photos/Photos.js';
import AlbumPicker from '../AlbumPicker/AlbumPicker';
import Gallery from '../Gallery/Gallery';
import FriendsBar from '../FriendsBar/FriendsBar';

import { getAccessToken } from '../../utils/getAccessToken';

import styles from './MainContainer.module.styl';

const mapStateToProps = state => ({
  photos: photosSelector(state),
  albums: albumsSelector(state),
  user: userSelector(state),
  friends: friendsSelector(state),
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ tokenRequest, userRequest, albumRequest, photoRequest, friendsRequest, sortByLikes, sortByComments, pickAlbum }, dispatch);

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAppReady: false,
      inputValue: '',
      isGalleryVisible: false,
      indexOfPhoto: 0,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('access_token_vkGallery') || getAccessToken();
    const inputValue = localStorage.getItem('user_id_vkGallery');
    if (!accessToken) this.props.tokenRequest();
    this.props.userRequest(inputValue);
    this.handleInputValue(inputValue);
    setTimeout(() => this.props.friendsRequest(inputValue), 1000);
  }

  componentWillReceiveProps({ user, friends, albums }) {
    if (this.props.user.id !== user.id && !user.error) {
      this.props.photoRequest(user.id, 0, 50, this.props.albums.selectedAlbumId);
    }
    if (this.props.albums.selectedAlbumId !== albums.selectedAlbumId && !user.error) {
      this.props.photoRequest(this.props.user.id, 0, 50, albums.selectedAlbumId);
    }
    if (this.props.friends !== friends) {
      this.setState({ isAppReady: true });
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
    const { isAppReady, inputValue, indexOfPhoto, isGalleryVisible } = this.state;
    const { photos, user, friends, albums } = this.props;
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
          <AlbumPicker
            userId={user.id}
            albums={albums}
            onAlbumRequest={this.props.albumRequest}
            onPickAlbum={this.props.pickAlbum}
          />
        </div>
        {photos.length > 0 &&
        <Photos
          user={user}
          photos={photos}
          selectedAlbumId={albums.selectedAlbumId}
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
        {friends.length > 0 &&
        <FriendsBar
          friends={friends}
          onUserRequest={this.props.userRequest}
          onChangeInput={this.handleInputValue}
        />
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

