'use strict';

var Jest = require("bs-jest/lib/js/src/jest.js");
var Json = require("../src/Json.js");

describe("parse", (function () {
        Jest.test("success", (function () {
                return Jest.Expect[/* toEqual */12](/* Some */[null])(Jest.Expect[/* expect */0](Json.parse("null")));
              }));
        return Jest.test("error", (function () {
                      return Jest.Expect[/* toEqual */12](/* None */0)(Jest.Expect[/* expect */0](Json.parse("{")));
                    }));
      }));

describe("parseOrRaise", (function () {
        Jest.test("success", (function () {
                return Jest.Expect[/* toEqual */12](null)(Jest.Expect[/* expect */0](Json.parseOrRaise("null")));
              }));
        return Jest.test("error", (function () {
                      return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1](Json.parseOrRaise, "{"));
                    }));
      }));

Jest.test("stringify", (function () {
        return Jest.Expect[/* toEqual */12]("null")(Jest.Expect[/* expect */0](Json.stringify(null)));
      }));

/*  Not a pure module */
