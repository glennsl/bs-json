'use strict';

var $$Array     = require("bs-platform/lib/js/array.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var Js_dict     = require("bs-platform/lib/js/js_dict.js");
var Json_decode = require("../src/json_decode.js");

function arrayOfInts(str) {
  var json = JSON.parse(str);
  return Json_decode.array(Json_decode.$$int, json);
}

console.log(arrayOfInts("[1, 2, 3]").reverse());

console.log(JSON.stringify(/* array */[
          "foo",
          "bar"
        ]));

console.log(JSON.stringify(/* array */[
            "foo",
            "bar"
          ].map(function (prim) {
              return prim;
            })));

function mapJsonObjectString(f, decoder, encoder, str) {
  var json = JSON.parse(str);
  return JSON.stringify(Js_dict.map(Curry.__1(encoder), Js_dict.map(Curry.__1(f), Json_decode.dict(decoder, json))));
}

function sum(param) {
  return $$Array.fold_left(function (prim, prim$1) {
              return prim + prim$1 | 0;
            }, 0, param);
}

console.log(mapJsonObjectString(sum, function (param) {
          return Json_decode.array(Json_decode.$$int, param);
        }, function (prim) {
          return prim;
        }, "\n      {\n        \"foo\": [1, 2, 3],\n        \"bar\": [9, 8, 7]\n      }\n    "));

function parseAddress(json) {
  return /* record */[
          /* city */Json_decode.field("city", Json_decode.string, json),
          /* state */Json_decode.field("state", Json_decode.string, json)
        ];
}

function parsePerson(json) {
  return /* record */[
          /* id */Json_decode.field("id", Json_decode.$$int, json),
          /* name */Json_decode.field("name", Json_decode.string, json),
          /* age */Json_decode.optional(function (param) {
                return Json_decode.field("age", Json_decode.$$int, param);
              }, json),
          /* address */Json_decode.optional(function (param) {
                return Json_decode.field("address", parseAddress, param);
              }, json)
        ];
}

var data = "{\"id\":1,\"name\":\"brad\",\"age\":27,\"address\":{\"city\":\"city1\",\"state\":\"state1\"}}";

console.log(parsePerson(JSON.parse(data)));

exports.arrayOfInts         = arrayOfInts;
exports.mapJsonObjectString = mapJsonObjectString;
exports.sum                 = sum;
exports.parseAddress        = parseAddress;
exports.parsePerson         = parsePerson;
exports.data                = data;
/*  Not a pure module */
