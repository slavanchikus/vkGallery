import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Settings extends Component {
  static propTypes = {
    onInput: PropTypes.func.isRequired,
    onUserRequest: PropTypes.func.isRequired,
    onSortLikes: PropTypes.func.isRequired,
    onSortComments: PropTypes.func.isRequired,
  };

  userRequest = () => {
    this.props.onUserRequest();
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
    this.props.onInput(e.target.value);
  };

  render() {
    const { user, inputValue, isPhotosEmpty } = this.props;
    const userInfo = user && user.first_name ? `${user.first_name} ${user.last_name}` : 'Не выбран';

    return (
      <div>
        <div className="Input">
          <input
            type="text"
            className="VKtext"
            placeholder="Укажите ID"
            value={inputValue}
            onChange={this.handleChange}
          />
          <input type="submit" value="Взять фото" onClick={this.userRequest} className="VK" />
          <input type="submit" value="Сортировка по лайкам" onClick={this.sortLike} className={`VK ${!isPhotosEmpty ? 'none' : ''}`} />
          <input type="submit" value="Сортировка по комментам" onClick={this.sortComments} className={`VK ${!isPhotosEmpty ? 'none' : ''}`} />
          <p className="info">Выбранный пользователь: {userInfo}</p>
        </div>
      </div>
    );
  }
}
