'use strict';

var List       = require("bs-platform/lib/js/list.js");
var $$Array    = require("bs-platform/lib/js/array.js");
var Curry      = require("bs-platform/lib/js/curry.js");
var Js_dict    = require("bs-platform/lib/js/js_dict.js");
var Js_boolean = require("bs-platform/lib/js/js_boolean.js");

function optional(encode, o) {
  if (o) {
    return Curry._1(encode, o[0]);
  } else {
    return undefined;
  }
}

function nullable(encode, o) {
  if (o) {
    return Curry._1(encode, o[0]);
  } else {
    return null;
  }
}

function withDefault(d, encode, o) {
  if (o) {
    return Curry._1(encode, o[0]);
  } else {
    return d;
  }
}

var bool = Js_boolean.to_js_boolean;

var object_ = Js_dict.fromList;

function list(encode, l) {
  return $$Array.of_list(List.map(encode, l));
}

function pair(encodeA, encodeB, param) {
  return /* array */[
          Curry._1(encodeA, param[0]),
          Curry._1(encodeB, param[1])
        ];
}

exports.bool        = bool;
exports.nullable    = nullable;
exports.optional    = optional;
exports.withDefault = withDefault;
exports.pair        = pair;
exports.object_     = object_;
exports.list        = list;
/* Js_dict Not a pure module */
