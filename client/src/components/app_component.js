'use strict';

const React = require('react/addons');
const MyButton = require('components/my_button');
const AST = require('services/ast');
const DynamicForm = require('components/dynamic_form');

class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      src: [
        '<div className="article">',
        '<h1 className="header">This is Header</h1>',
        '<div className="body">',
        'Lorem',
        '<Youtube vid="RcDjZWQaONg"/>',
        '<em>Ipsum</em>',
        'brabrabra',
        '<div>',
        '<h4>Title</h4>',
        '<dl>',
        '<dt>def1</dt>',
        '<dd>hoge</dd>',
        '<dd>fuga</dd>',
        '</dl>',
        '</div>',
        '</div>',
        '<div>',
        '<a href="https://example.com" target="_blank">This is link</a>',
        '</div>',
        '<div>',
        '<MyButton></MyButton>',
        '</div>',
        '<div>',
        '<ul>',
        '<li>List 1</li>',
        '<li>List 2</li>',
        '<li>List 3</li>',
        '</ul>',
        '</div>',
        '</div>'
      ].join('\n')
    };
  }

  changeHdl (src) {
    this.setState({src: src});
  }

  resolveElement() {
    let element = AST.generate(this.state.src);
    try {
      React.renderToString(element);
    } catch(e) {
      // invariants causes _currentElement missing loop
      return null;
    }

    return element;
  }

  render () {
    var element = this.resolveElement();

    if (!element) {
      element = (
        <div>Syntax Error</div>
      );
    }

    return (
      <div className="container">
        <div className="preview">
          {element}
        </div>
        <div className="editor">
          <DynamicForm src={this.state.src} changeHdl={this.changeHdl.bind(this)}/>
        </div>
      </div>
    );
  }

}
module.exports = AppComponent;
