'use strict';

var Json = require("../src/Json.bs.js");
var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Json_decode = require("../src/Json_decode.bs.js");

function tree(decoder) {
  return (function (param) {
      return Json_decode.andThen((function (param) {
                    switch (param) {
                      case "leaf" : 
                          return (function (param) {
                              return leaf(decoder, param);
                            });
                      case "node" : 
                          return (function (param) {
                              return node(decoder, param);
                            });
                      default:
                        return Pervasives.failwith("unknown node type");
                    }
                  }), (function (param) {
                    return Json_decode.field("type", Json_decode.string, param);
                  }), param);
    });
}

function node(decoder, json) {
  var partial_arg = tree(decoder);
  var partial_arg$1 = function (param) {
    return Json_decode.array(partial_arg, param);
  };
  return /* Node */Block.__(0, [
            Json_decode.field("value", decoder, json),
            Json_decode.field("children", (function (param) {
                    return Json_decode.map($$Array.to_list, partial_arg$1, param);
                  }), json)
          ]);
}

function leaf(decoder, json) {
  return /* Leaf */Block.__(1, [Json_decode.field("value", decoder, json)]);
}

var Decode = /* module */[
  /* tree */tree,
  /* node */node,
  /* leaf */leaf
];

function indent(_n) {
  while(true) {
    var n = _n;
    if (n <= 0) {
      return /* () */0;
    } else {
      Pervasives.print_string("  ");
      _n = n - 1 | 0;
      continue ;
    }
  };
}

function aux(level, param) {
  indent(level);
  console.log(param[0]);
  if (param.tag) {
    return /* () */0;
  } else {
    return List.iter((function (child) {
                  return aux(level + 1 | 0, child);
                }), param[1]);
  }
}

function print(param) {
  return aux(0, param);
}

var json = " {\n  \"type\": \"node\",\n  \"value\": 9,\n  \"children\": [{\n    \"type\": \"node\",\n    \"value\": 5,\n    \"children\": [{\n      \"type\": \"leaf\",\n      \"value\": 3\n    }, {\n      \"type\": \"leaf\",\n      \"value\": 2\n    }]\n  }, {\n      \"type\": \"leaf\",\n      \"value\": 4\n  }]\n} ";

var myTree = print(tree(Json_decode.$$int)(Json.parseOrRaise(json)));

exports.Decode = Decode;
exports.indent = indent;
exports.print = print;
exports.json = json;
exports.myTree = myTree;
/* myTree Not a pure module */
