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
    disableTakeButton: false
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

  handleUserRequest = () => {
    const { onUserRequest, user, inputValue } = this.props;
    if (user.lastInputValue !== inputValue) onUserRequest(inputValue);
  };

  render() {
    const { disableTakeButton } = this.state;
    const { user, inputValue, isPhotosEmpty } = this.props;
    const userInfo = user && user.first_name ? `${user.first_name} ${user.last_name}` : 'Не выбран';
    return (
      <div className={styles.container}>
        <input type="text" className={styles.input_text} placeholder="Укажите ID" value={inputValue} onChange={this.handleChange} />
        <input type="submit" className={styles.input_submit} value="Взять фото" onClick={this.handleUserRequest} disabled={disableTakeButton} />
        <input type="submit" className={styles.input_submit} value="Сортировка по лайкам" onClick={this.sortLike} disabled={isPhotosEmpty} />
        <input type="submit" className={styles.input_submit} value="Сортировка по комментам" onClick={this.sortComments} disabled={isPhotosEmpty} />
        {isPhotosEmpty && user.first_name &&
        <div className={styles.error}>У существующего пользователя нет фоток :(</div> }
        {user.error &&
        <div className={styles.error}>Юзера с таким ид не существует :(</div> }
        <div className={styles.info}>Выбранный пользователь <br/> {userInfo}</div>
      </div>
    );
  }
}
