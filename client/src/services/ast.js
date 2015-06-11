'use strict';

const React = require('react/addons');
const parser = require("services/parser");
const _ = require('lodash');

class AST {
  static register(name, component) {
    if (!AST.components) AST.components = {};
    AST.components[name] = component;
  }

  static unregister(name) {
    if (!AST.components) AST.components = {};
    delete AST[name];
  }

  static generate(html) {
    var source = parser.parse(html);

    var rootNode = _.find(source, (src) => {
      return src.type === "tag";
    });

    return this.parse(rootNode);
  }

  static parse(node) {
    if (!AST.components) AST.components = {};
    if (node.type !== "tag") return null;

    let tag = AST.components[node.name] || node.name;

    let attr = node.attribs || {};

    let children = _.compact(
      _.map(node.children, (n) => {
        if (n.type === "tag") {
          return this.parse(n);
        } else {
          if (/\w/.test(n.raw))
            return n.raw;
        }
      })
    );

    let arg = [tag, attr].concat(children);

    return React.createElement.apply(this, arg);
  }
}

module.exports = AST;
