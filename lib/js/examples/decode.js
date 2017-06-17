'use strict';

var $$Array     = require("bs-platform/lib/js/array.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var Js_dict     = require("bs-platform/lib/js/js_dict.js");
var Json_decode = require("../src/json_decode.js");

function mapJsonObjectString(f, decoder, encoder, str) {
  var json = JSON.parse(str);
  return JSON.stringify(Js_dict.map(Curry.__1(encoder), Js_dict.map(Curry.__1(f), Json_decode.dict(decoder, json))));
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

exports.mapJsonObjectString = mapJsonObjectString;
exports.sum                 = sum;
/*  Not a pure module */
