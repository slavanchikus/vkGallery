import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Settings.module.styl';

export default class Settings extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    inputValue: PropTypes.string.isRequired,
    isPhotosEmpty: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onUserRequest: PropTypes.func.isRequired,
    onSortLikes: PropTypes.func.isRequired,
    onSortComments: PropTypes.func.isRequired,
  };

  state = {
    disableTakeButton: true
  };

  sortLike = (e) => {
    e.preventDefault();
    this.props.onSortLikes();
  };

  sortComments = (e) => {
    e.preventDefault();
    this.props.onSortComments();
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
    const { user, inputValue, onUserRequest, isPhotosEmpty } = this.props;
    const userInfo = user && user.first_name ? `${user.first_name} ${user.last_name}` : 'Не выбран';
    return (
      <div className={styles.container}>
        <input type="text" className={styles.input_text} placeholder="Укажите ID" value={inputValue} onChange={this.handleChange} />
        <input type="submit" className={styles.input_submit} value="Взять фото" onClick={() => onUserRequest()} disabled={disableTakeButton} />
        {!isPhotosEmpty &&
          <div>
            <input type="submit" className={styles.input_submit} value="Сортировка по лайкам" onClick={this.sortLike} />
            <input type="submit" className={styles.input_submit} value="Сортировка по комментам" onClick={this.sortComments} />
          </div>}
        {isPhotosEmpty && user.first_name &&
        <p className={styles.info}>У существующего пользователя нет фоток :(</p> }
        {user.error &&
        <p className={styles.info}>Юзера с таким ид не существует :(</p> }
        <p className={styles.info}>Выбранный пользователь: {userInfo}</p>
      </div>
    );
  }
}
