import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

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

  sortLike = () => {
    this.props.onSortLikes();
  };

  sortComments = () => {
    this.props.onSortComments();
  };

  handleUserRequest = () => {
    const { onUserRequest, user, inputValue } = this.props;
    if (user.lastInputValue !== inputValue) onUserRequest(inputValue);
  };

  render() {
    const { disableTakeButton, isPhotosEmpty } = this.props;
    const containerClassNamex = cx(styles.container, {
      [styles.empty]: isPhotosEmpty,
    });
    return (
      <div className={styles.container}>
        <input type="submit" className={styles.input_submit} value="Взять фото" onClick={this.handleUserRequest} disabled={disableTakeButton} />
        <div className={containerClassNamex}>
          <div className={styles.sort_like} onClick={this.sortLike} />
          <div className={styles.sort_comment} onClick={this.sortComments} />
        </div>
      </div>
    );
  }
}
