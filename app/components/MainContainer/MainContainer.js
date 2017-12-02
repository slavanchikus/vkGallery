import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userRequest, photoRequest, sortByLikes, sortByComments } from '../../actions/actions';
import { photosSelector } from '../../selector/photosSelector';
import { userSelector } from '../../selector/userSelector';

import Settings from '../Settings/Settings.js';
import Photos from '../Photos/Photos.js';
import Gallery from '../Gallery/Gallery';

import styles from './MainContainer.module.styl';

const mapStateToProps = state => ({ photos: photosSelector(state), user: userSelector(state) });

const mapDispatchToProps = dispatch =>
    bindActionCreators({ userRequest, photoRequest, sortByLikes, sortByComments }, dispatch);

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      expanded: false,
      indexOfPhoto: 0,
    };
  }

  componentWillReceiveProps({ user }) {
    if (this.props.user.id !== user.id && !this.props.user.error) {
      const countPhotos = this.props.photos.length ? this.props.photos.length : 50;
      this.props.photoRequest(user.id, 0, countPhotos);
    }
  }

  handleUserRequest = () => {
    this.props.userRequest(this.state.inputValue);
  };

  handlePhotoClick= (index) => {
    if (!this.state.expanded) this.setState({ expanded: true });
    this.setState({ indexOfPhoto: index });
  };

  handleInputValue = (id) => {
    this.setState({ inputValue: id });
  };

  toggleExpandState = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { inputValue, indexOfPhoto, expanded } = this.state;
    const { photos, user } = this.props;
    return (
      <div className={styles.container}>
        <Settings
          user={user}
          inputValue={inputValue}
          isPhotosEmpty={photos.length}
          onUserRequest={this.handleUserRequest}
          onChange={this.handleInputValue}
          onSortLikes={this.props.sortByLikes}
          onSortComments={this.props.sortByComments}
        />
        <Photos
          user={user}
          photos={photos}
          onPhotoClick={this.handlePhotoClick}
          onPhotoRequest={this.props.photoRequest}
        />
        {expanded &&
          <Gallery indexOfPhoto={indexOfPhoto} photos={photos} closeGallery={this.toggleExpandState} />
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

