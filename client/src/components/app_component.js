'use strict';

const React = require('react/addons');

const MyButton = require('components/my_button');

const AST = require('services/ast');

const is = require('is_js');
const _ = require('lodash');

class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      src: `
        <div className="article">
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
        </div>
      `
    };
  }

  clickHdl () {
    this.setState({
      src: `
        <div className="article">
          <h2>Changed</h2>
          <a href="https://example.com" target="_blank">This is link</a>
          <div>
            <MyButton></MyButton>
          </div>
        </div>
      `
    });
  }

  render () {
    let el = AST.generate(this.state.src);

    return (
      <div onClick={this.clickHdl.bind(this)}>
        <div>
          {el}
        </div>
      </div>
    );
  }
}
module.exports = AppComponent;
