'use strict';

var Curry           = require("bs-platform/lib/js/curry.js");
var Js_exn          = require("bs-platform/lib/js/js_exn.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");

var Decode_error = Caml_exceptions.create("Json_decode.Decode_error");

function $$boolean(json) {
  if (typeof json === "boolean") {
    return json;
  } else {
    throw [
          Decode_error,
          "Expected boolean, got " + JSON.stringify(json)
        ];
  }
}

function bool(json) {
  return +$$boolean(json);
}

function $$float(json) {
  if (typeof json === "number") {
    return json;
  } else {
    throw [
          Decode_error,
          "Expected number, got " + JSON.stringify(json)
        ];
  }
}

function $$int(json) {
  var f = $$float(json);
  if (Number.isInteger(f)) {
    return f;
  } else {
    throw [
          Decode_error,
          "Expected integer, got " + JSON.stringify(json)
        ];
  }
}

function string(json) {
  if (typeof json === "string") {
    return json;
  } else {
    throw [
          Decode_error,
          "Expected string, got " + JSON.stringify(json)
        ];
  }
}

function nullable(decode, json) {
  if (json === null) {
    return null;
  } else {
    return Curry._1(decode, json);
  }
}

function nullAs(value, json) {
  if (json === null) {
    return value;
  } else {
    throw [
          Decode_error,
          "Expected null, got " + JSON.stringify(json)
        ];
  }
}

function array(decode, json) {
  if (Array.isArray(json)) {
    var l = json.length;
    var target = new Array(l);
    for(var i = 0 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
      var value = Curry._1(decode, json[i]);
      target[i] = value;
    }
    return target;
  } else {
    throw [
          Decode_error,
          "Expected array, got " + JSON.stringify(json)
        ];
  }
}

function dict(decode, json) {
  if (typeof json === "object" && !Array.isArray(json) && json !== null) {
    var keys = Object.keys(json);
    var l = keys.length;
    var target = { };
    for(var i = 0 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
      var key = keys[i];
      var value = Curry._1(decode, json[key]);
      target[key] = value;
    }
    return target;
  } else {
    throw [
          Decode_error,
          "Expected object, got " + JSON.stringify(json)
        ];
  }
}

function field(key, decode, json) {
  if (typeof json === "object" && !Array.isArray(json) && json !== null) {
    var match = json[key];
    if (match !== undefined) {
      return Curry._1(decode, match);
    } else {
      throw [
            Decode_error,
            "Expected field '" + (key + "'")
          ];
    }
  } else {
    throw [
          Decode_error,
          "Expected object, got " + JSON.stringify(json)
        ];
  }
}

function optional(decode, json) {
  var exit = 0;
  var v;
  try {
    v = Curry._1(decode, json);
    exit = 1;
  }
  catch (raw_exn){
    var exn = Js_exn.internalToOCamlException(raw_exn);
    if (exn[0] === Decode_error) {
      return /* None */0;
    } else {
      throw exn;
    }
  }
  if (exit === 1) {
    return /* Some */[v];
  }
  
}

exports.$$boolean = $$boolean;
exports.bool      = bool;
exports.$$float   = $$float;
exports.$$int     = $$int;
exports.string    = string;
exports.nullable  = nullable;
exports.nullAs    = nullAs;
exports.array     = array;
exports.dict      = dict;
exports.field     = field;
exports.optional  = optional;
/* No side effect */
