import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Settings extends Component {
  static propTypes = {
    onSetUserId: PropTypes.func.isRequired,
    onPhotosRequest: PropTypes.func.isRequired,
    onSortLikes: PropTypes.func.isRequired,
    onSortComments: PropTypes.func.isRequired,
  };

  takePhotos = () => {
    this.props.onPhotosRequest();
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
    this.props.onSetUserId(e.target.value);
  };

  render() {
    const { user, userId, isPhotosEmpty } = this.props;
    const userInfo = user && user.first_name ? `${user.first_name} ${user.last_name}` : 'Не выбран';

    return (
      <div>
        <div className="Input">
          <input
            type="text"
            className="VKtext"
            placeholder="Укажите ID"
            value={userId}
            onChange={this.handleChange}
          />
          <input type="submit" value="Взять все фото" onClick={this.takePhotos} className="VK" />
          <input type="submit" value="Сортировка по лайкам" onClick={this.sortLike} className={`VK ${!isPhotosEmpty ? 'none' : ''}`} />
          <input type="submit" value="Сортировка по комментам" onClick={this.sortComments} className={`VK ${!isPhotosEmpty ? 'none' : ''}`} />
          <p className="info">Выбранный пользователь: {userInfo}</p>
        </div>
      </div>
    );
  }
}
