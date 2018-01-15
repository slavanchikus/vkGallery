import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SettingButtons from './SettingButtons/SettingButtons';

import styles from './Settings.module.styl';

export default class Settings extends Component {
  static propTypes = {
    inputValue: PropTypes.string.isRequired,
    uiState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onUserRequest: PropTypes.func.isRequired,
    onSortLikes: PropTypes.func.isRequired,
    onSortComments: PropTypes.func.isRequired,
  };

  state = {
    disableTakeButton: false
  };

  handleChange = (e) => {
    this.props.onChange(e.target.value);
    if (e.target.value.length > 0) {
      this.setState({ disableTakeButton: false });
    } else {
      this.setState({ disableTakeButton: true });
    }
  };

  render() {
    const { disableTakeButton } = this.state;
    const { inputValue, uiState, onUserRequest, onSortLikes, onSortComments } = this.props;
    return (
      <div className={styles.container}>
        <input type="text" className={styles.input_text} placeholder="Укажите ID" value={inputValue} onChange={this.handleChange} />
        <SettingButtons
          inputValue={inputValue}
          disableTakeButton={disableTakeButton}
          uiState={uiState}
          onUserRequest={onUserRequest}
          onSortLikes={onSortLikes}
          onSortComments={onSortComments}
        />
      </div>
    );
  }
}
