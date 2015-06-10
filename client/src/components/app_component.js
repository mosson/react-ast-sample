'use strict';

const React = require('react/addons');

const MyButton = require('components/my_button');

const AST = require('services/ast');

class AppComponent extends React.Component {
  render () {
    const el = AST.generate(`
      <div className="article">
        <h1 className="header">This is Header</h1>
        <p className="body">
          Lorem <em>Ipsum</em> brabrabra
          <div>
              <h4>Title</h4>
              <dl>
                <dt>def1</dt>
                <dd>hoge</dd>
                <dd>fuga</dd>
          </div>
        </p>
        <a href="https://example.com" target="_blank">This is link</a>
        <MyButton/>
        <ul>
          <li>List 1</li>
          <li>List 2</li>
          <li>List 3</li>
        </ul>
      </div>
    `);

    return (
      <div>
        {el}
      </div>
    );
  }
}
module.exports = AppComponent;
