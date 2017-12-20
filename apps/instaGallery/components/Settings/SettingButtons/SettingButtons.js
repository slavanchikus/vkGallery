import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './SettingButtons.module.styl';

export default class SettingButtons extends Component {
  static propTypes = {
    inputValue: PropTypes.string.isRequired,
    disableTakeButton: PropTypes.bool.isRequired,
    onUserRequest: PropTypes.func.isRequired,
  };

  handleUserRequest = () => {
    const { onUserRequest, inputValue } = this.props;
    onUserRequest(inputValue);
  };

  render() {
    const { disableTakeButton } = this.props;
    return (
      <div className={styles.container}>
        <input type="submit" className={styles.input_submit} value="Взять фото" onClick={this.handleUserRequest} disabled={disableTakeButton} />
        <div className={styles.container}>
          <div className={styles.sort_like} />
          <div className={styles.sort_comment} />
        </div>
      </div>
    );
  }
}
