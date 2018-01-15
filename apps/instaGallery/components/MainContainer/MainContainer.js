import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userRequest, sortByComments, sortByLikes } from '../../actions/actions';
import { userSelector, photosSelector, uiStateSelector } from '../../selector/mainSelector';

import Settings from '../Settings/Settings';
import Photos from '../Photos/Photos';

import styles from './MainContainer.module.styl';

const mapStateToProps = state => ({
  user: userSelector(state),
  photos: photosSelector(state),
  uiState: uiStateSelector(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ userRequest, sortByComments, sortByLikes }, dispatch);

class MainContainer extends Component {
  state = {
    inputValue: '',
    showSpinner: false
  };

  componentWillReceiveProps({ uiState }) {
    if (!uiState.isFetching && this.props.uiState.isFetching) {
      /*clearTimeout(this.loader);
      if (this.state.showSpinner) this.setState({ showSpinner: false });*/
    }
    if (uiState.isFetching && !this.props.uiState.isFetching) {
      this.loader = setTimeout(() => this.setState({ showSpinner: true }), 400);
    }
  }

  handleUserRequest = (name) => {
    if (this.props.user.username !== this.state.inputValue) {
      this.props.userRequest(name);
    }
  };

  handleInputValue = (id) => {
    this.setState({ inputValue: id });
  };

  render() {
    const { inputValue, showSpinner } = this.state;
    const { photos, user } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Settings
            inputValue={inputValue}
            user={user}
            showSpinner={showSpinner}
            photosLen={photos.length}
            onChange={this.handleInputValue}
            onUserRequest={this.handleUserRequest}
            onSortLikes={this.props.sortByLikes}
            onSortComments={this.props.sortByComments}
          />
        </div>
        {photos.length > 0 &&
          <Photos
            photos={photos}
          />
         }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

