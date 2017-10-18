import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userRequest, photoRequest, sortByLikes, sortByComments } from './actions/actions';
import { photosSelector } from './selector/photosSelector';
import { userSelector } from './selector/userSelector';

import Settings from './components/Settings/Settings.js';
import Photos from './components/Photos/Photos.js';
import Gallery from './components/Gallery/Gallery';

const mapStateToProps = state => ({ photos: photosSelector(state), user: userSelector(state) });

const mapDispatchToProps = dispatch =>
    bindActionCreators({ userRequest, photoRequest, sortByLikes, sortByComments }, dispatch);

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      expanded: false,
      indexOfPhoto: 0,
      countOfPhotos: 0
    };
  }

  componentWillReceiveProps({ user, photos }) {
    if (this.props.user !== user) {
      this.props.photoRequest(user.id, this.state.countOfPhotos);
    }
    if (this.props.photos !== photos) {
      this.setState({ countOfPhotos: photos.length });
    }
  }

  handleUserRequest = () => {
    this.props.userRequest(this.state.inputValue);
  };

  toggleExpandState = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handlePhotoClick= (index) => {
    if (!this.state.expanded) this.setState({ expanded: true });
    this.setState({ indexOfPhoto: index });
  };

  handleInputValue = (id) => {
    this.setState({ inputValue: id });
  };

  render() {
    const { inputValue, indexOfPhoto, expanded } = this.state;
    const { photos, user } = this.props;
    return (
      <div className="app">
        <Settings
          user={user}
          inputValue={inputValue}
          isPhotosEmpty={photos.length}
          onUserRequest={this.handleUserRequest}
          onInput={this.handleInputValue}
          onSortLikes={this.props.sortByLikes}
          onSortComments={this.props.sortByComments}
        />
        <Photos
          user={user}
          photos={photos}
          onPhotoClick={this.handlePhotoClick}
        />
        {expanded ? <Gallery indexOfPhoto={indexOfPhoto} photos={photos} closeGallery={this.toggleExpandState} /> : ''}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);

