'use strict';

const React = require('react/addons');

class MyButton extends React.Component {
  clickHdl () {
    window.alert('clicked');
  }

  render () {
    return (
      <button type="button" onClick={this.clickHdl.bind(this)}>
        This is React Component
      </button>
    );
  }
}

module.exports = MyButton;
