import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SettingButtons from './SettingButtons/SettingButtons';

import styles from './Settings.module.styl';

export default class Settings extends Component {
  static propTypes = {
    inputValue: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    showSpinner: PropTypes.bool.isRequired,
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
    const { user, inputValue, showSpinner, onUserRequest, onSortLikes, onSortComments } = this.props;
    return (
      <div className={styles.container}>
        <input type="text" className={styles.input_text} placeholder="Укажите ID" value={inputValue} onChange={this.handleChange} />
        <SettingButtons
          inputValue={inputValue}
          disableTakeButton={disableTakeButton}
          showSpinner={showSpinner}
          onUserRequest={onUserRequest}
          onSortLikes={onSortLikes}
          onSortComments={onSortComments}
        />
        {user.username && user.media.count === 0 &&
          <div className={styles.error}>У существующего пользователя нет фоток :(</div>}
        {user.error &&
          <div className={styles.error}>Юзера с таким ид не существует :(</div>}
        {user.username && user.media.count > 0 && !user.error &&
          <div className={styles.info_block}>
            <div className={styles.info}>Публикации: {user.media.count}</div>
            <div className={styles.info}>
                Подписки: {user.follows.count}
              <br />
                Подписчики: {user.followed_by.count}
            </div>
            <div className={styles.info}>Выбранный пользователь:<br />{user.full_name || user.username}</div>
          </div>}
      </div>
    );
  }
}
