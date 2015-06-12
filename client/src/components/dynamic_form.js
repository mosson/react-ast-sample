'use strict';

const React = require('react/addons');
const is = require('is_js');

class DynamicForm extends React.Component {
  changeHdl () {
    if( is.function(this.props.changeHdl) )
      this.props.changeHdl(React.findDOMNode(this).value);
  }

  render () {
    let src = this.props.src;

    return (
      <textarea onChange={this.changeHdl.bind(this)} defaultValue={src}></textarea>
    );
  }
}

module.exports = DynamicForm;
