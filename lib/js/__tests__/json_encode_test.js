'use strict';

var Jest    = require("bs-jest/lib/js/src/jest.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry   = require("bs-platform/lib/js/curry.js");

Jest.test("null", (function () {
        return Curry._2(Jest.Expect[/* toEqual */12], null, Curry._1(Jest.Expect[/* expect */0], null));
      }));

Jest.test("string", (function () {
        return Curry._2(Jest.Expect[/* toEqual */12], "foo", Curry._1(Jest.Expect[/* expect */0], "foo"));
      }));

Jest.test("float", (function () {
        return Curry._2(Jest.Expect[/* toEqual */12], 1.23, Curry._1(Jest.Expect[/* expect */0], 1.23));
      }));

Jest.test("int", (function () {
        return Curry._2(Jest.Expect[/* toEqual */12], 23, Curry._1(Jest.Expect[/* expect */0], 23));
      }));

Jest.test("boolean", (function () {
        return Curry._2(Jest.Expect[/* toEqual */12], true, Curry._1(Jest.Expect[/* expect */0], true));
      }));

Jest.test("object_ - empty", (function () {
        return Curry._2(Jest.Expect[/* toEqual */12], { }, Curry._1(Jest.Expect[/* expect */0], { }));
      }));

Jest.test("object_ - simple", (function () {
        var o = { };
        o["x"] = 42;
        return Curry._2(Jest.Expect[/* toEqual */12], o, Curry._1(Jest.Expect[/* expect */0], o));
      }));

Jest.test("array int", (function () {
        return Curry._2(Jest.Expect[/* toEqual */12], /* int array */[
                    1,
                    2,
                    3
                  ], Curry._1(Jest.Expect[/* expect */0], $$Array.map((function (prim) {
                              return prim;
                            }), /* int array */[
                            1,
                            2,
                            3
                          ])));
      }));

Jest.test("stringArray", (function () {
        return Curry._2(Jest.Expect[/* toEqual */12], /* array */[
                    "a",
                    "b"
                  ], Curry._1(Jest.Expect[/* expect */0], /* array */[
                        "a",
                        "b"
                      ]));
      }));

Jest.test("nubmerArray", (function () {
        return Curry._2(Jest.Expect[/* toEqual */12], /* int array */[
                    0,
                    4
                  ], Curry._1(Jest.Expect[/* expect */0], /* float array */[
                        0,
                        4
                      ]));
      }));

Jest.test("booleanArray", (function () {
        return Curry._2(Jest.Expect[/* toEqual */12], /* array */[
                    true,
                    false
                  ], Curry._1(Jest.Expect[/* expect */0], /* array */[
                        true,
                        false
                      ]));
      }));

/*  Not a pure module */
