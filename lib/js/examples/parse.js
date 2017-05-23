'use strict';

var Json_decode = require("../src/json_decode.js");

function arrayOfInts(str) {
  var json = JSON.parse(str);
  return Json_decode.array(Json_decode.$$int, json);
}

console.log(arrayOfInts("[1, 2, 3]").reverse());

exports.arrayOfInts = arrayOfInts;
/*  Not a pure module */
