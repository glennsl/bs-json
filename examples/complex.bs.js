'use strict';

var Json = require("../src/Json.bs.js");
var Json_decode = require("../src/Json_decode.bs.js");

function point(json) {
  return /* record */[
          /* x */Json_decode.field("x", Json_decode.$$float, json),
          /* y */Json_decode.field("y", Json_decode.$$float, json)
        ];
}

function line(json) {
  return /* record */[
          /* start */Json_decode.field("start", point, json),
          /* end_ */Json_decode.field("end", point, json),
          /* thickness */Json_decode.optional((function (param) {
                  return Json_decode.field("thickness", Json_decode.$$int, param);
                }), json)
        ];
}

var Decode = /* module */[
  /* point */point,
  /* line */line
];

var data = " {\n  \"start\": { \"x\": 1.1, \"y\": -0.4 },\n  \"end\":   { \"x\": 5.3, \"y\": 3.8 }\n} ";

console.log(line(Json.parseOrRaise(data)));

exports.Decode = Decode;
exports.data = data;
/*  Not a pure module */
