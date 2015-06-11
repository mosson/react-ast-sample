'use strict';

const React = require('react/addons');

const MyButton = require('components/my_button');

const AST = require('services/ast');

const DynamicForm = require('components/dynamic_form');


class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      src: `<div className="article">
          <h1 className="header">This is Header</h1>
          <div className="body">
            Lorem
            <em>Ipsum</em>
            brabrabra
            <div>
                <h4>Title</h4>
                <dl>
                  <dt>def1</dt>
                  <dd>hoge</dd>
                  <dd>fuga</dd>
                </dl>
            </div>
          </div>
          <div>
            <a href="https://example.com" target="_blank">This is link</a>
          </div>
          <div>
            <MyButton></MyButton>
          </div>
          <div>
            <ul>
              <li>List 1</li>
              <li>List 2</li>
              <li>List 3</li>
            </ul>
          </div>
        </div>`
    };
  }

  changeHdl (src) {
    this.setState({
      src: src
    });
  }

  render () {
    let src = this.state.src;
    this.prevEl = this.el;
    this.el = AST.generate(src);
    var el;

    try {
      // may render?
      React.renderToString(this.el);
      el = this.el;
    } catch (e) {
      el = this.prevEl;
    }

    return (
      <div>
        <div>{el}</div>
        <DynamicForm src={src} changeHdl={this.changeHdl.bind(this)}/>
      </div>
    );
  }
}
module.exports = AppComponent;
