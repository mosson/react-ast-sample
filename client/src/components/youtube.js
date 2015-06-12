'use strict';

const React = require('react/addons');

class Youtube extends React.Component {
  render() {
    let containerStyle = {
      position: 'relative',
      paddingBottom: '56.25%',
      height: 0,
      overflow: 'hidden'
    };

    let frameStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    };

    let src = `https://www.youtube.com/embed/${this.props.vid}`;

    return (
      <div style={containerStyle}>
        <iframe style={frameStyle} src={src} frameborder="0" allowfullscreen></iframe>
      </div>
    );
  }
}

module.exports = Youtube;
