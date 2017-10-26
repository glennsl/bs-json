'use strict';

var Jest        = require("bs-jest/lib/js/src/jest.js");
var $$Array     = require("bs-platform/lib/js/array.js");
var Js_dict     = require("bs-platform/lib/js/js_dict.js");
var Json_encode = require("../src/Json_encode.js");

Jest.test("null", (function () {
        return Jest.Expect[/* toEqual */12](null)(Jest.Expect[/* expect */0](null));
      }));

Jest.test("string", (function () {
        return Jest.Expect[/* toEqual */12]("foo")(Jest.Expect[/* expect */0]("foo"));
      }));

Jest.test("float", (function () {
        return Jest.Expect[/* toEqual */12](1.23)(Jest.Expect[/* expect */0](1.23));
      }));

Jest.test("int", (function () {
        return Jest.Expect[/* toEqual */12](23)(Jest.Expect[/* expect */0](23));
      }));

Jest.test("boolean", (function () {
        return Jest.Expect[/* toEqual */12](true)(Jest.Expect[/* expect */0](Json_encode.$$boolean(/* true */1)));
      }));

Jest.test("dict - empty", (function () {
        return Jest.Expect[/* toEqual */12]({ })(Jest.Expect[/* expect */0]({ }));
      }));

Jest.test("dict - simple", (function () {
        var o = { };
        o["x"] = 42;
        return Jest.Expect[/* toEqual */12](o)(Jest.Expect[/* expect */0](o));
      }));

Jest.test("object_ - empty", (function () {
        return Jest.Expect[/* toEqual */12]({ })(Jest.Expect[/* expect */0](Json_encode.object_(/* [] */0)));
      }));

Jest.test("object_ - simple", (function () {
        return Jest.Expect[/* toEqual */12](Js_dict.fromList(/* :: */[
                          /* tuple */[
                            "x",
                            42
                          ],
                          /* [] */0
                        ]))(Jest.Expect[/* expect */0](Json_encode.object_(/* :: */[
                            /* tuple */[
                              "x",
                              42
                            ],
                            /* [] */0
                          ])));
      }));

Jest.test("array int", (function () {
        return Jest.Expect[/* toEqual */12](/* int array */[
                      1,
                      2,
                      3
                    ])(Jest.Expect[/* expect */0]($$Array.map((function (prim) {
                              return prim;
                            }), /* int array */[
                            1,
                            2,
                            3
                          ])));
      }));

Jest.test("list int", (function () {
        return Jest.Expect[/* toEqual */12](/* int array */[
                      1,
                      2,
                      3
                    ])(Jest.Expect[/* expect */0](Json_encode.list((function (prim) {
                              return prim;
                            }), /* :: */[
                            1,
                            /* :: */[
                              2,
                              /* :: */[
                                3,
                                /* [] */0
                              ]
                            ]
                          ])));
      }));

Jest.test("stringArray", (function () {
        return Jest.Expect[/* toEqual */12](/* array */[
                      "a",
                      "b"
                    ])(Jest.Expect[/* expect */0](/* array */[
                        "a",
                        "b"
                      ]));
      }));

Jest.test("nubmerArray", (function () {
        return Jest.Expect[/* toEqual */12](/* int array */[
                      0,
                      4
                    ])(Jest.Expect[/* expect */0](/* float array */[
                        0,
                        4
                      ]));
      }));

Jest.test("booleanArray", (function () {
        return Jest.Expect[/* toEqual */12](/* array */[
                      true,
                      false
                    ])(Jest.Expect[/* expect */0](Json_encode.booleanArray(/* int array */[
                            /* true */1,
                            /* false */0
                          ])));
      }));

/*  Not a pure module */
