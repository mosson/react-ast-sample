'use strict';

const htmlparser = require("htmlparser");

class Parser {
  static parse (html) {
    const handler = new htmlparser.DefaultHandler();

    const parser = new htmlparser.Parser(handler);

    parser.parseComplete(html);

    return handler.dom;
  }
}

module.exports = Parser;
