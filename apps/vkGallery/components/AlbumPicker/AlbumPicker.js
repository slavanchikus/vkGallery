import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import styles from './AlbumPicker.module.styl';

export default class AlbumPicker extends Component {
  static propTypes = {
    userId: PropTypes.number.isRequired,
    albums: PropTypes.object.isRequired,
    onAlbumRequest: PropTypes.func.isRequired,
    onPickAlbum: PropTypes.func.isRequired,
  };

  state = {
    expanded: false
  };

  componentDidMount() {
    this.props.onAlbumRequest(this.props.userId);
  }

  componentWillReceiveProps({ userId }) {
    if (this.props.userId !== userId) {
      this.props.onAlbumRequest(userId);
    }
  }

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

  handleAlbumPick = (id, name) => {
    const { onPickAlbum } = this.props;
    onPickAlbum(id, name);
    this.setState({ expanded: false });
  };

  handleSetClassName = album => cx({
    [styles.selected]: this.props.albums.selectedAlbumId.toString() === album.toString()
  });

  render() {
    const { expanded } = this.state;
    const { albums } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.info}>
          Выбранный альбом:<br />{albums.selectedAlbumName}
        </div>
        <div className={styles.picker} onClick={() => this.setState({ expanded: !this.state.expanded })}>
          Выберите альбом
        </div>
        {expanded &&
        <div ref={node => (this.options = node)} className={styles.options}>
          <div key="wall" className={this.handleSetClassName('wall')} onClick={() => this.handleAlbumPick('wall', 'Стена')}>Стена</div>
          <div key="profile" className={this.handleSetClassName('profile')} onClick={() => this.handleAlbumPick('profile', 'Профиль')}>Профиль</div>
          {albums.items && albums.items.length > 0 &&
            albums.items.map(album => <div key={album.aid} className={this.handleSetClassName(album.aid)} onClick={() => this.handleAlbumPick(album.aid, album.title)}>{album.title}</div>)
          }
        </div>}
      </div>

    );
  }
}
