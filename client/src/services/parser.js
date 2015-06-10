'use strict';

const htmlparser = require("htmlparser");

class Parser {
  static parse (html) {
    let handler = new htmlparser.DefaultHandler();

    let parser = new htmlparser.Parser(handler);

    parser.parseComplete(html);

    return handler.dom;
  }
}

module.exports = Parser;
