import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './AlbumPicker.module.styl';

export default class AlbumPicker extends Component {
  static propTypes = {
    onPickAlbum: PropTypes.func.isRequired,
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

  render() {
    const { expanded } = this.state;
    const { onPickAlbum } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.picker} onClick={() => this.setState({ expanded: !this.state.expanded })}>
          Выберите альбом
        </div>
        {expanded &&
        <div ref={node => (this.options = node)} className={styles.options}>
          <div onClick={() => onPickAlbum('wall')}>Стена</div>
          <div onClick={() => onPickAlbum('profile')}>Профиль</div>
          <div onClick={() => onPickAlbum('saved')}>Сохраненные</div>
        </div>}
      </div>

    );
  }
}
