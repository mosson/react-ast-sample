'use strict';

const React = require('react/addons');
const AST = require('services/ast');

class MyButton extends React.Component {
  clickHdl () {
    console.log('yo');
  }

  componentDidMount () {
    console.log('mounte');
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
