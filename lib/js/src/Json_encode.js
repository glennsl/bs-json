'use strict';

var List       = require("bs-platform/lib/js/list.js");
var $$Array    = require("bs-platform/lib/js/array.js");
var Js_dict    = require("bs-platform/lib/js/js_dict.js");
var Js_boolean = require("bs-platform/lib/js/js_boolean.js");

var object_ = Js_dict.fromList;

var $$boolean = Js_boolean.to_js_boolean;

function list(encode, l) {
  return $$Array.of_list(List.map(encode, l));
}

function booleanArray(arr) {
  return $$Array.map(Js_boolean.to_js_boolean, arr);
}

exports.$$boolean    = $$boolean;
exports.object_      = object_;
exports.list         = list;
exports.booleanArray = booleanArray;
/* Js_dict Not a pure module */
