'use strict';

const React = require('react/addons');
const AST = require('services/ast');

class MyButton extends React.Component {
  clickHdl () {
    window.alert("Yo!");
  }

  render () {
    return (
      <button type="button" onClick={this.clickHdl.bind(this)}>
        This is React Component
      </button>
    );
  }
}

AST.register("MyButton", MyButton);
module.exports = MyButton;
