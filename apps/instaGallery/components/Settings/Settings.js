import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SettingButtons from './SettingButtons/SettingButtons';

import styles from './Settings.module.styl';

export default class Settings extends Component {
  static propTypes = {
    inputValue: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    showSpinner: PropTypes.bool.isRequired,
    photosLen: PropTypes.number.isRequired,
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
    const { user, inputValue, showSpinner, photosLen, onUserRequest, onSortLikes, onSortComments } = this.props;
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
        {showSpinner && user.edge_owner_to_timeline_media && !user.error &&
          <div className={styles.load_container}>
            <div className={styles.spinner_container}>
              <div className={styles.spinner} />
            </div>
            <div className={styles.loadbar}>{photosLen} загружено из {user.edge_owner_to_timeline_media.count}</div>
          </div>}
        {user.username && user.edge_owner_to_timeline_media.count === 0 &&
          <div className={styles.error}>У существующего пользователя нет фоток :(</div>}
        {user.username && user.is_private &&
          <div className={styles.error}>Данный аккаунт является приватным :(</div>}
        {user.error &&
          <div className={styles.error}>Юзера с таким ид не существует :(</div>}
        {user.username && user.edge_owner_to_timeline_media.count > 0 && !user.error &&
          <div className={styles.info_block}>
            {!showSpinner && <div className={styles.info}>Публикации: {user.edge_owner_to_timeline_media.count}</div>}
            <div className={styles.info}>
                Подписки: {user.edge_follow.count}
              <br />
                Подписчики: {user.edge_followed_by.count}
            </div>
            <div className={styles.info}>Выбранный пользователь:<br />{user.full_name || user.username}</div>
          </div>}
      </div>
    );
  }
}
