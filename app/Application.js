import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userRequest, sortByLikes, sortByComments } from './actions/actions';
import { photosSelector } from './selector/photosSelector';
import { userSelector } from './selector/userSelector';

import Settings from './components/Settings/Settings.js';
import Photos from './components/Photos/Photos.js';
import Gallery from './components/Gallery/Gallery';

const mapStateToProps = state => ({ photos: photosSelector(state), user: userSelector(state) });

const mapDispatchToProps = dispatch =>
    bindActionCreators({ userRequest, sortByLikes, sortByComments }, dispatch);

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      expanded: false,
      indexOfPhoto: 0
    };
  }

  toggleExpandState = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handlePhotoRequest = () => {
    this.props.userRequest(this.state.userId);
  };

  handlePhotoClick= (index) => {
    if (!this.state.expanded) this.setState({ expanded: true });
    this.setState({ indexOfPhoto: index });
  };

  handleSetId = (id) => {
    this.setState({ userId: id });
  };

  render() {
    const { userId, indexOfPhoto, expanded } = this.state;
    const { photos, user } = this.props;
    return (
      <div className="app">
        <Settings
          user={user}
          userId={userId}
          isPhotosEmpty={photos.length}
          onPhotosRequest={this.handlePhotoRequest}
          onSetUserId={this.handleSetId}
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

