import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './SettingButtons.module.styl';

export default class SettingButtons extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    inputValue: PropTypes.string.isRequired,
    disableTakeButton: PropTypes.bool.isRequired,
    isPhotosEmpty: PropTypes.bool.isRequired,
    onUserRequest: PropTypes.func.isRequired,
    onSortLikes: PropTypes.func.isRequired,
    onSortComments: PropTypes.func.isRequired,
  };

  sortLike = (e) => {
    e.preventDefault();
    this.props.onSortLikes();
  };

  sortComments = (e) => {
    e.preventDefault();
    this.props.onSortComments();
  };

  handleUserRequest = () => {
    const { onUserRequest, user, inputValue } = this.props;
    if (user.lastInputValue !== inputValue) onUserRequest(inputValue);
  };

  render() {
    const { disableTakeButton, isPhotosEmpty } = this.props;
    return (
      <div className={styles.container}>
        <input type="submit" className={styles.input_submit} value="Взять фото" onClick={this.handleUserRequest} disabled={disableTakeButton} />
        {!isPhotosEmpty &&
        <div className={styles.container}>
          <div className={styles.sort_like} onClick={this.sortLike} />
          <div className={styles.sort_comment} onClick={this.sortComments} />
        </div>}
      </div>
    );
  }
}
