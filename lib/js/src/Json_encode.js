'use strict';

var List       = require("bs-platform/lib/js/list.js");
var $$Array    = require("bs-platform/lib/js/array.js");
var Js_dict    = require("bs-platform/lib/js/js_dict.js");
var Js_boolean = require("bs-platform/lib/js/js_boolean.js");

var bool = Js_boolean.to_js_boolean;

var object_ = Js_dict.fromList;

function list(encode, l) {
  return $$Array.of_list(List.map(encode, l));
}

exports.bool    = bool;
exports.object_ = object_;
exports.list    = list;
/* Js_dict Not a pure module */
