'use strict';

const React = require('react/addons');
const parser = require("services/parser");
const _ = require('lodash');

class AST {
  static register(name, component) {
    if( !AST.components ) AST.components = {};
    AST.components[name] = component;
  }

  static unregister(name) {
    if( !AST.components ) AST.components = {};
    delete AST[name];
  }

  static generate(html) {
    var source = parser.parse(html);

    var rootNode = _.find(source, (src) => {
      return src.type === "tag";
    });

    return this.parse(rootNode);
  }

  static parse (node) {
    if( !AST.components ) AST.components = {};
    if( node.type !== "tag" ) return;

    return React.createElement.apply(
      this,
      [
        AST.components[node.name] || node.name,
        node.attribs||{}
      ].concat(
        _.compact(_.map(node.children, (n) => {
          if( n.type === "tag" ) {
            return this.parse(n);
          } else {
            if( /\w/.test(n.raw) )
              return n.raw;
          }
        }))
      )
    );
  }
}

module.exports = AST;
