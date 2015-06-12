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

    let tag = this.parseTag(node);
    let attr = this.parseAttr(node);
    let children = this.parseChildren(node);
    let arg = [tag, attr].concat(children);

    return React.createElement.apply(this, arg);
  }

  static parseTag(node) {
    return AST.components[node.name] || node.name;
  }

  static parseAttr(node) {
    let attr = _.clone(node.attribs) || {};
    if( attr['class'] ) {
      attr['className'] = attr['class'];
      delete attr['class'];
    }
    return attr;
  }

  static parseChildren(node) {
    let children = _.map(
      node.children,
      this.parseChildNode.bind(this)
    );

    return _.compact(children);
  }

  static parseChildNode(node) {
    if (node.type === "tag") {
      return this.parse(node);
    } else if ( /\S/.test(node.raw) ) {
      return node.raw;
    } else {
      return null;
    }
  }
}

module.exports = AST;
