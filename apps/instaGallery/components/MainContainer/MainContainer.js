import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userRequest } from '../../actions/actions';
import { userSelector } from '../../selector/mainSelector';

import styles from './MainContainer.module.styl';

const mapStateToProps = state => ({
  user: userSelector(state),
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ userRequest }, dispatch);

class MainContainer extends Component {

  render() {
    return (
      <div className={styles.container}>
        Привет
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

