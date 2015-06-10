'use strict';

const React = require('react/addons');
const parser = require("services/parser");
const _ = require('lodash');

class AST {
  static generate(html) {
    var source = parser.parse(html);

    var rootNode = _.find(source, (src) => {
      return src.type === "tag";
    });

    return this.parse(rootNode);
  }

  static parse (node) {
    if( node.type !== "tag" ) return;

    return React.createElement.apply(
      this,
      [node.name, node.attribs||{}].concat(
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