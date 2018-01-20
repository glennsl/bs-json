'use strict';

var List                    = require("bs-platform/lib/js/list.js");
var $$Array                 = require("bs-platform/lib/js/array.js");
var Curry                   = require("bs-platform/lib/js/curry.js");
var Js_exn                  = require("bs-platform/lib/js/js_exn.js");
var Pervasives              = require("bs-platform/lib/js/pervasives.js");
var Caml_exceptions         = require("bs-platform/lib/js/caml_exceptions.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function _isInteger(value) {
  if (isFinite(value)) {
    return +(Math.floor(value) === value);
  } else {
    return /* false */0;
  }
}

var DecodeError = Caml_exceptions.create("Json_decode.DecodeError");

function $$boolean(json) {
  if (typeof json === "boolean") {
    return json;
  } else {
    throw [
          DecodeError,
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
          DecodeError,
          "Expected number, got " + JSON.stringify(json)
        ];
  }
}

function $$int(json) {
  var f = $$float(json);
  if (_isInteger(f)) {
    return f;
  } else {
    throw [
          DecodeError,
          "Expected integer, got " + JSON.stringify(json)
        ];
  }
}

function string(json) {
  if (typeof json === "string") {
    return json;
  } else {
    throw [
          DecodeError,
          "Expected string, got " + JSON.stringify(json)
        ];
  }
}

function date(json) {
  return new Date(string(json));
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
          DecodeError,
          "Expected null, got " + JSON.stringify(json)
        ];
  }
}

function array(decode, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    var target = new Array(length);
    for(var i = 0 ,i_finish = length - 1 | 0; i <= i_finish; ++i){
      var value;
      try {
        value = Curry._1(decode, json[i]);
      }
      catch (raw_exn){
        var exn = Js_exn.internalToOCamlException(raw_exn);
        if (exn[0] === DecodeError) {
          throw [
                DecodeError,
                exn[1] + ("\n\tin array at index " + Pervasives.string_of_int(i))
              ];
        } else {
          throw exn;
        }
      }
      target[i] = value;
    }
    return target;
  } else {
    throw [
          DecodeError,
          "Expected array, got " + JSON.stringify(json)
        ];
  }
}

function list(decode, json) {
  return $$Array.to_list(array(decode, json));
}

function pair(decodeA, decodeB, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    if (length === 2) {
      try {
        return /* tuple */[
                Curry._1(decodeA, json[0]),
                Curry._1(decodeB, json[1])
              ];
      }
      catch (raw_exn){
        var exn = Js_exn.internalToOCamlException(raw_exn);
        if (exn[0] === DecodeError) {
          throw [
                DecodeError,
                exn[1] + "\n\tin pair/tuple2"
              ];
        } else {
          throw exn;
        }
      }
    } else {
      throw [
            DecodeError,
            "Expected array of length 2, got array of length " + (String(length) + "")
          ];
    }
  } else {
    throw [
          DecodeError,
          "Expected array, got " + JSON.stringify(json)
        ];
  }
}

function tuple3(decodeA, decodeB, decodeC, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    if (length === 3) {
      try {
        return /* tuple */[
                Curry._1(decodeA, json[0]),
                Curry._1(decodeB, json[1]),
                Curry._1(decodeC, json[2])
              ];
      }
      catch (raw_exn){
        var exn = Js_exn.internalToOCamlException(raw_exn);
        if (exn[0] === DecodeError) {
          throw [
                DecodeError,
                exn[1] + "\n\tin tuple3"
              ];
        } else {
          throw exn;
        }
      }
    } else {
      throw [
            DecodeError,
            "Expected array of length 3, got array of length " + (String(length) + "")
          ];
    }
  } else {
    throw [
          DecodeError,
          "Expected array, got " + JSON.stringify(json)
        ];
  }
}

function tuple4(decodeA, decodeB, decodeC, decodeD, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    if (length === 4) {
      try {
        return /* tuple */[
                Curry._1(decodeA, json[0]),
                Curry._1(decodeB, json[1]),
                Curry._1(decodeC, json[2]),
                Curry._1(decodeD, json[3])
              ];
      }
      catch (raw_exn){
        var exn = Js_exn.internalToOCamlException(raw_exn);
        if (exn[0] === DecodeError) {
          throw [
                DecodeError,
                exn[1] + "\n\tin tuple4"
              ];
        } else {
          throw exn;
        }
      }
    } else {
      throw [
            DecodeError,
            "Expected array of length 4, got array of length " + (String(length) + "")
          ];
    }
  } else {
    throw [
          DecodeError,
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
      var value;
      try {
        value = Curry._1(decode, json[key]);
      }
      catch (raw_exn){
        var exn = Js_exn.internalToOCamlException(raw_exn);
        if (exn[0] === DecodeError) {
          throw [
                DecodeError,
                exn[1] + "\n\tin dict"
              ];
        } else {
          throw exn;
        }
      }
      target[key] = value;
    }
    return target;
  } else {
    throw [
          DecodeError,
          "Expected object, got " + JSON.stringify(json)
        ];
  }
}

function field(key, decode, json) {
  if (typeof json === "object" && !Array.isArray(json) && json !== null) {
    var match = json[key];
    if (match !== undefined) {
      try {
        return Curry._1(decode, match);
      }
      catch (raw_exn){
        var exn = Js_exn.internalToOCamlException(raw_exn);
        if (exn[0] === DecodeError) {
          throw [
                DecodeError,
                exn[1] + ("\n\tat field '" + (key + "'"))
              ];
        } else {
          throw exn;
        }
      }
    } else {
      throw [
            DecodeError,
            "Expected field \'" + (String(key) + "\'")
          ];
    }
  } else {
    throw [
          DecodeError,
          "Expected object, got " + JSON.stringify(json)
        ];
  }
}

function at(key_path, decoder) {
  if (key_path) {
    var rest = key_path[1];
    var key = key_path[0];
    if (rest) {
      var partial_arg = at(rest, decoder);
      return (function (param) {
          return field(key, partial_arg, param);
        });
    } else {
      return (function (param) {
          return field(key, decoder, param);
        });
    }
  } else {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Expected key_path to contain at least one element"
        ];
  }
}

function optional(decode, json) {
  try {
    return /* Some */[Curry._1(decode, json)];
  }
  catch (raw_exn){
    var exn = Js_exn.internalToOCamlException(raw_exn);
    if (exn[0] === DecodeError) {
      return /* None */0;
    } else {
      throw exn;
    }
  }
}

function oneOf(_decoders, json) {
  while(true) {
    var decoders = _decoders;
    if (decoders) {
      try {
        return Curry._1(decoders[0], json);
      }
      catch (raw_exn){
        var exn = Js_exn.internalToOCamlException(raw_exn);
        if (exn[0] === DecodeError) {
          _decoders = decoders[1];
          continue ;
          
        } else {
          throw exn;
        }
      }
    } else {
      var length = List.length(decoders);
      throw [
            DecodeError,
            "Expected oneOf " + (String(length) + ", got ") + JSON.stringify(json)
          ];
    }
  };
}

function either(a, b) {
  var partial_arg_001 = /* :: */[
    b,
    /* [] */0
  ];
  var partial_arg = /* :: */[
    a,
    partial_arg_001
  ];
  return (function (param) {
      return oneOf(partial_arg, param);
    });
}

function withDefault($$default, decode, json) {
  try {
    return Curry._1(decode, json);
  }
  catch (raw_exn){
    var exn = Js_exn.internalToOCamlException(raw_exn);
    if (exn[0] === DecodeError) {
      return $$default;
    } else {
      throw exn;
    }
  }
}

function map(f, decode, json) {
  return Curry._1(f, Curry._1(decode, json));
}

function andThen(b, a, json) {
  return Curry._2(b, Curry._1(a, json), json);
}

var tuple2 = pair;

exports.DecodeError = DecodeError;
exports.$$boolean   = $$boolean;
exports.bool        = bool;
exports.$$float     = $$float;
exports.$$int       = $$int;
exports.string      = string;
exports.date        = date;
exports.nullable    = nullable;
exports.nullAs      = nullAs;
exports.array       = array;
exports.list        = list;
exports.pair        = pair;
exports.tuple2      = tuple2;
exports.tuple3      = tuple3;
exports.tuple4      = tuple4;
exports.dict        = dict;
exports.field       = field;
exports.at          = at;
exports.optional    = optional;
exports.oneOf       = oneOf;
exports.either      = either;
exports.withDefault = withDefault;
exports.map         = map;
exports.andThen     = andThen;
/* No side effect */
