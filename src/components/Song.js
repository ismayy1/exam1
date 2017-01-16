import React from 'react';
import axios from 'axios';

class Song extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      edit: false
    }
  }

  handleDelete(key) {
    axios.delete(`https://music-playlist-app-4acd6.firebaseio.com/playlists/songs/${key}.json`)
    .then((res) => {
      this.props.getSongs();
    })
  }

  handleEdit(key) {
    console.log(key);
    this.setState({edit: !this.state.edit})
    axios.patch(`https://music-playlist-app-4acd6.firebaseio.com/playlists/songs/${key}.json`, {
      artist: this.artist.value,
      song: this.song.value
    })
    .then((res) => {
      this.props.getSongs();
    })
  }

   keyPress(e) {
    if (e.charCode === 13) {
      this.handleEdit(this.props.uniquePostCode);
    }
  }

  editRender() {
    const { playlists, uniquePostCode } = this.props;
    return (
      <div className="updateRender">
        <textarea
          ref={(text) => this.artist = text}
          defaultValue={playlists[uniquePostCode].artist}
          autoFocus="autofocus" />
        <textarea
          ref={(text) => this.song = text}
          defaultValue={playlists[uniquePostCode].song}
          onKeyPress={(e) => this.keyPress(e)} />
        <div className="cancel">
        <button
          type="submit"
          onClick={() => this.handleEdit(uniquePostCode)}
          className="flat">
          Submit
        </button>
        <button
          type="submit"
          onClick={() => this.setState({edit: !this.state.edit})}
          className="flat">
          Cancel
        </button>
        </div>
      </div>
    )
  }

  normalRender() {
    const { playlists, uniquePostCode, getSongInfo } = this.props;
    return (
      <li className="flexLi">
        <p>{playlists[uniquePostCode].song} by {playlists[uniquePostCode].artist}</p>
        <div className="buttons">
        <button
          type="submit"
          onClick={() => getSongInfo(playlists[uniquePostCode].artist)}
          className="flat">
        Info
        </button>
        <button
          type="submit"
          onClick={() => this.setState({edit: !this.state.edit})}
          className="flat">
        Edit
        </button>
        <button
          type="submit"
          onClick={() => this.handleDelete(uniquePostCode)}
          className="flat">
        Delete
        </button>
        </div>
      </li>
    )
  }

  render() {
    if (!this.state.edit) {
      return (this.normalRender());
    } else {
      return (this.editRender());
    }
  }
}

export default Song;
