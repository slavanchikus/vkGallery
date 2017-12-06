import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './FriendsBar.module.styl';

export default class FriendsBar extends Component {
  static propTypes = {
    friends: PropTypes.array.isRequired,
    onUserRequest: PropTypes.func.isRequired,
    onChangeInput: PropTypes.func.isRequired,
  };

  handleClick = (e) => {
    const userId = e.target.getAttribute('data-userid');
    if (userId) {
      this.props.onUserRequest(userId);
      this.props.onChangeInput(userId);
    }
  };

  render() {
    const { friends } = this.props;
    return (
      <div className={styles.container} onClick={this.handleClick}>
        {friends && friends.map(item => (
          <div key={item.id}>
            <img
              data-userid={item.id}
              src={item.photo_50}
              alt={`${item.first_name} ${item.last_name}`}
            />
          </div>
        ))
        }
      </div>
    );
  }
}
