import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userRequest } from '../../actions/actions';
import { userSelector } from '../../selector/mainSelector';

import Settings from '../Settings/Settings';

import styles from './MainContainer.module.styl';

const mapStateToProps = state => ({
  user: userSelector(state),
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ userRequest }, dispatch);

class MainContainer extends Component {

  state = {
    inputValue: ''
  };

  handleUserRequest = (name) => {
    this.props.userRequest(name);
  };

  handleInputValue = (id) => {
    this.setState({ inputValue: id });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Settings
            inputValue={inputValue}
            onChange={this.handleInputValue}
            onUserRequest={this.handleUserRequest}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

