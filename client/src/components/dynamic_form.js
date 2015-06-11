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
    let style = {
      width: '100%',
      height: '500px',
      boxSizing: 'border-box'
    };

    return (
      <textarea style={style} onChange={this.changeHdl.bind(this)} defaultValue={src}></textarea>
    );
  }
}

module.exports = DynamicForm;
