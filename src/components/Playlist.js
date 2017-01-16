import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Playlist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      edit: false
    }
  }

  handleEdit(e) {
    e.preventDefault();
    this.props.editName(this.name.value);
    this.setState({ edit: !this.state.edit });
  }

  keyPress(e) {
    if (e.charCode === 13) {
      this.props.editName(this.name.value);
      this.setState({ edit: !this.state.edit });
    }
  }

  editRender() {
    const { addSong, playlistName } = this.props;
    return (
      <div className="spacing">
      <input
        ref={(input) => this.name = input}
        type="text"
        defaultValue={playlistName}
        autoFocus="autoFocus"
        onKeyPress={(e) => this.keyPress(e)} />
      <button
        type="submit"
        onClick={(e) => this.handleEdit(e)}
        className="flat">
        Save
      </button>
      <button
        type="submit"
        onClick={() => this.setState({edit: !this.state.edit})}
        className="flat">
        Cancel
      </button>
      <ul className="flexUl">
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}>
        {addSong()}
      </ReactCSSTransitionGroup>
      </ul>
      </div>
    )
  }

  normalRender() {
    const { addSong, playlistName, deletePlaylist } = this.props;
    return (
      <div>
      <h1 className="inline-block">{playlistName}</h1>
      <button
        type="submit"
        onClick={() => this.setState({ edit: !this.state.edit })}
        className="flat">
      Edit
      </button>
      <button
        type="submit"
        onClick={() => deletePlaylist()}
        className="flat">
      Delete
      </button>
      <ul className="flexUl">
      <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}>
        {addSong()}
      </ReactCSSTransitionGroup>
      </ul>
      </div>
    )
  }

  render() {
    if(!this.state.edit) {
     return (this.normalRender());
    } else {
      return (this.editRender());
    }
  }

}

export default Playlist;
