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
        return Jest.Expect[/* toEqual */12](true)(Jest.Expect[/* expect */0](true));
      }));

Jest.test("bool", (function () {
        return Jest.Expect[/* toEqual */12](true)(Jest.Expect[/* expect */0](Json_encode.bool(/* true */1)));
      }));

Jest.test("date", (function () {
        return Jest.Expect[/* toEqual */12]("2012-04-23T18:25:43.511Z")(Jest.Expect[/* expect */0](Json_encode.date(new Date("2012-04-23T18:25:43.511Z"))));
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

Jest.test("arrayOf int", (function () {
        return Jest.Expect[/* toEqual */12](/* int array */[
                      1,
                      2,
                      3
                    ])(Jest.Expect[/* expect */0](Json_encode.arrayOf((function (prim) {
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

Jest.test("jsonArray int", (function () {
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

Jest.test("stringArray", (function () {
        return Jest.Expect[/* toEqual */12](/* array */[
                      "a",
                      "b"
                    ])(Jest.Expect[/* expect */0](/* array */[
                        "a",
                        "b"
                      ]));
      }));

Jest.test("numberArray", (function () {
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
                    ])(Jest.Expect[/* expect */0](/* array */[
                        true,
                        false
                      ]));
      }));

Jest.test("nullable (None)", (function () {
        return Jest.Expect[/* toEqual */12](null)(Jest.Expect[/* expect */0](Json_encode.nullable((function (prim) {
                              return prim;
                            }), /* None */0)));
      }));

Jest.test("nullable (Some)", (function () {
        return Jest.Expect[/* toEqual */12]("success")(Jest.Expect[/* expect */0](Json_encode.nullable((function (prim) {
                              return prim;
                            }), /* Some */["success"])));
      }));

Jest.test("withDefault (None)", (function () {
        return Jest.Expect[/* toEqual */12]("default")(Jest.Expect[/* expect */0](Json_encode.withDefault("default", (function (prim) {
                              return prim;
                            }), /* None */0)));
      }));

Jest.test("withDefault (Some)", (function () {
        return Jest.Expect[/* toEqual */12]("success")(Jest.Expect[/* expect */0](Json_encode.withDefault("default", (function (prim) {
                              return prim;
                            }), /* Some */["success"])));
      }));

Jest.test("pair", (function () {
        return Jest.Expect[/* toEqual */12](/* array */[
                      "hello",
                      1.2
                    ])(Jest.Expect[/* expect */0](Json_encode.pair((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), /* tuple */[
                            "hello",
                            1.2
                          ])));
      }));

Jest.test("tuple2", (function () {
        return Jest.Expect[/* toEqual */12](/* array */[
                      "hello",
                      1.2
                    ])(Jest.Expect[/* expect */0](Json_encode.tuple2((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), /* tuple */[
                            "hello",
                            1.2
                          ])));
      }));

Jest.test("tuple3", (function () {
        return Jest.Expect[/* toEqual */12](/* array */[
                      "hello",
                      1.2,
                      4
                    ])(Jest.Expect[/* expect */0](Json_encode.tuple3((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), /* tuple */[
                            "hello",
                            1.2,
                            4
                          ])));
      }));

Jest.test("tuple4", (function () {
        return Jest.Expect[/* toEqual */12](/* array */[
                      "hello",
                      1.2,
                      4,
                      Json_encode.bool(/* true */1)
                    ])(Jest.Expect[/* expect */0](Json_encode.tuple4((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), Json_encode.bool, /* tuple */[
                            "hello",
                            1.2,
                            4,
                            /* true */1
                          ])));
      }));

/*  Not a pure module */
