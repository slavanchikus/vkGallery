import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import styles from './FriendsBar.module.styl';

export default class FriendsBar extends Component {
  static propTypes = {
    friends: PropTypes.array.isRequired,
    onUserRequest: PropTypes.func.isRequired,
    onChangeInput: PropTypes.func.isRequired,
  };

  state = {
    expanded: false,
    friendsList: this.props.friends,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.expanded !== this.state.expanded ||
        nextState.friendsList !== this.state.friendsList;
  }

  handleClick = (e) => {
    const userId = e.target.getAttribute('data-userid');
    if (userId) {
      this.props.onUserRequest(userId);
      this.props.onChangeInput(userId);
    }
  };

  handleChange = (e) => {
    const filtredFriends = Object.keys(this.props.friends).reduce((sum, id) => {
      const friend = this.props.friends[id];
      if (`${friend.first_name} ${friend.last_name}`.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) {
        sum.push(friend);
      }
      return sum;
    }, []);
    this.setState({ friendsList: filtredFriends });
  };

  render() {
    const { expanded, friendsList } = this.state;
    const containerClassName = cx(styles.container, {
      [styles.expanded]: expanded,
    });
    return (
      <div className={containerClassName} onClick={this.handleClick}>
        <div className={styles.search} onClick={() => this.setState({ expanded: !this.state.expanded })} />
        <input type="text" className={styles.input} onChange={this.handleChange} />
        <div>
          {friendsList && friendsList.map(item => (
            <div key={item.id} className={styles.friend_block}>
              <img
                data-userid={item.id}
                src={item.photo_50}
                alt={`${item.first_name} ${item.last_name}`}
              />
              <div className={styles.name}>
                {`${item.first_name} ${item.last_name}`}
              </div>
            </div>
            ))
            }
        </div>
      </div>
    );
  }
}
