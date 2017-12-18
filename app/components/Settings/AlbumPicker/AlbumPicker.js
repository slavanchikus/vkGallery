import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import styles from './AlbumPicker.module.styl';

export default class AlbumPicker extends Component {
  static propTypes = {
    onPickAlbum: PropTypes.func.isRequired,
    selectedAlbum: PropTypes.string.isRequired,
  };

  state = {
    expanded: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.expanded && this.state.expanded) {
      document.addEventListener('click', this.handleDocumentClick);
    } else if (prevState.expanded && !this.state.expanded) {
      document.removeEventListener('click', this.handleDocumentClick);
    }
  }

  handleDocumentClick = (e) => {
    if (!this.options.contains(e.target)) {
      this.setState({ expanded: false });
    }
  };

  handleAlbumPick = (e) => {
    const { onPickAlbum } = this.props;
    const { id } = e.target;
    if (id) {
      onPickAlbum(id);
      this.setState({ expanded: false });
    }
  };

  handleSetClassName = album => cx({
    [styles.selected]: this.props.selectedAlbum === album
  });

  render() {
    const { expanded } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.picker} onClick={() => this.setState({ expanded: !this.state.expanded })}>
          Выберите альбом
        </div>
        {expanded &&
        <div ref={node => (this.options = node)} className={styles.options} onClick={this.handleAlbumPick}>
          <div id="wall" className={this.handleSetClassName('wall')}>Стена</div>
          <div id="profile" className={this.handleSetClassName('profile')}>Профиль</div>
          <div id="saved" className={this.handleSetClassName('saved')}>Сохраненные</div>
        </div>}
      </div>

    );
  }
}
