'use strict';

var Json = require("../src/Json.bs.js");
var Json_decode = require("../src/Json_decode.bs.js");

function arrayOfInts(str) {
  var json = Json.parseOrRaise(str);
  return Json_decode.array(Json_decode.$$int, json);
}

console.log(arrayOfInts("[1, 2, 3]").reverse());

exports.arrayOfInts = arrayOfInts;
/*  Not a pure module */
