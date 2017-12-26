'use strict';

var List       = require("bs-platform/lib/js/list.js");
var $$Array    = require("bs-platform/lib/js/array.js");
var Curry      = require("bs-platform/lib/js/curry.js");
var Js_dict    = require("bs-platform/lib/js/js_dict.js");
var Js_boolean = require("bs-platform/lib/js/js_boolean.js");

var bool = Js_boolean.to_js_boolean;

function date(d) {
  return d.toJSON();
}

function nullable(encode, param) {
  if (param) {
    return Curry._1(encode, param[0]);
  } else {
    return null;
  }
}

function withDefault(d, encode, param) {
  if (param) {
    return Curry._1(encode, param[0]);
  } else {
    return d;
  }
}

var object_ = Js_dict.fromList;

var arrayOf = $$Array.map;

function list(encode, l) {
  return $$Array.of_list(List.map(encode, l));
}

function pair(encodeA, encodeB, param) {
  return /* array */[
          Curry._1(encodeA, param[0]),
          Curry._1(encodeB, param[1])
        ];
}

function tuple3(encodeA, encodeB, encodeC, param) {
  return /* array */[
          Curry._1(encodeA, param[0]),
          Curry._1(encodeB, param[1]),
          Curry._1(encodeC, param[2])
        ];
}

function tuple4(encodeA, encodeB, encodeC, encodeD, param) {
  return /* array */[
          Curry._1(encodeA, param[0]),
          Curry._1(encodeB, param[1]),
          Curry._1(encodeC, param[2]),
          Curry._1(encodeD, param[3])
        ];
}

var tuple2 = pair;

exports.bool        = bool;
exports.date        = date;
exports.nullable    = nullable;
exports.withDefault = withDefault;
exports.pair        = pair;
exports.tuple2      = tuple2;
exports.tuple3      = tuple3;
exports.tuple4      = tuple4;
exports.object_     = object_;
exports.arrayOf     = arrayOf;
exports.list        = list;
/* Js_dict Not a pure module */
