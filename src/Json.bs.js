'use strict';

var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");

var ParseError = Caml_exceptions.create("Json.ParseError");

function parse(s) {
  try {
    return /* Some */[JSON.parse(s)];
  }
  catch (exn){
    return /* None */0;
  }
}

function parseOrRaise(s) {
  try {
    return JSON.parse(s);
  }
  catch (raw_exn){
    var exn = Js_exn.internalToOCamlException(raw_exn);
    if (exn[0] === Js_exn.$$Error) {
      var match = exn[1].message;
      var message = match !== undefined ? match : "Unknown error";
      throw [
            ParseError,
            message
          ];
    } else {
      throw exn;
    }
  }
}

var Decode = 0;

var Encode = 0;

function stringify(prim) {
  return JSON.stringify(prim);
}

exports.Decode = Decode;
exports.Encode = Encode;
exports.ParseError = ParseError;
exports.parse = parse;
exports.parseOrRaise = parseOrRaise;
exports.stringify = stringify;
/* No side effect */
