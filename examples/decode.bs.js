'use strict';

var Json = require("../src/Json.bs.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Json_decode = require("../src/Json_decode.bs.js");

function mapJsonObjectString(f, decoder, encoder, str) {
  var json = Json.parseOrRaise(str);
  return Json.stringify(Js_dict.map(Curry.__1(encoder), Js_dict.map(Curry.__1(f), Json_decode.dict(decoder, json))));
}

function sum(param) {
  return $$Array.fold_left((function (prim, prim$1) {
                return prim + prim$1 | 0;
              }), 0, param);
}

console.log(mapJsonObjectString(sum, (function (param) {
            return Json_decode.array(Json_decode.$$int, param);
          }), (function (prim) {
            return prim;
          }), "\n      {\n        \"foo\": [1, 2, 3],\n        \"bar\": [9, 8, 7]\n      }\n    "));

var json = Json.parseOrRaise("{ \"y\": 42 } ");

var exit = 0;

var x;

try {
  x = Json_decode.field("x", Json_decode.$$int, json);
  exit = 1;
}
catch (raw_exn){
  var exn = Js_exn.internalToOCamlException(raw_exn);
  if (exn[0] === Json_decode.DecodeError) {
    console.log("Error:" + exn[1]);
  } else {
    throw exn;
  }
}

if (exit === 1) {
  console.log(x);
}

exports.mapJsonObjectString = mapJsonObjectString;
exports.sum = sum;
/*  Not a pure module */
