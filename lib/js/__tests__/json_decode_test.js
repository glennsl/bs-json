'use strict';

var Jest        = require("bs-jest/lib/js/src/jest.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var Json_decode = require("../src/json_decode.js");

describe("boolean", function () {
      Jest.test("boolean", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], true, Curry._1(Jest.Expect[/* expect */0], Json_decode.$$boolean(true)));
          });
      Jest.test("float", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.$$boolean, 1.23));
          });
      Jest.test("int", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.$$boolean, 23));
          });
      Jest.test("string", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.$$boolean, "test"));
          });
      Jest.test("null", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.$$boolean, null));
          });
      Jest.test("array", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.$$boolean, /* array */[]));
          });
      return Jest.test("object", function () {
                  return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.$$boolean, { }));
                });
    });

describe("bool", function () {
      Jest.test("boolean", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], /* true */1, Curry._1(Jest.Expect[/* expect */0], Json_decode.bool(true)));
          });
      Jest.test("float", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.bool, 1.23));
          });
      Jest.test("int", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.bool, 23));
          });
      Jest.test("string", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.bool, "test"));
          });
      Jest.test("null", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.bool, null));
          });
      Jest.test("array", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.bool, /* array */[]));
          });
      Jest.test("object", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.bool, { }));
          });
      return Jest.test("boolean - false", function () {
                  return Curry._2(Jest.Expect[/* toEqual */12], /* false */0, Curry._1(Jest.Expect[/* expect */0], Json_decode.bool(false)));
                });
    });

describe("float", function () {
      Jest.test("boolean", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.$$float, true));
          });
      Jest.test("float", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], 1.23, Curry._1(Jest.Expect[/* expect */0], Json_decode.$$float(1.23)));
          });
      Jest.test("int", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], 23, Curry._1(Jest.Expect[/* expect */0], Json_decode.$$float(23)));
          });
      Jest.test("string", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.$$float, "test"));
          });
      Jest.test("null", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.$$float, null));
          });
      Jest.test("array", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.$$float, /* array */[]));
          });
      return Jest.test("object", function () {
                  return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.$$float, { }));
                });
    });

describe("int", function () {
      Jest.test("boolean", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.$$int, true));
          });
      Jest.test("float", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.$$int, 1.23));
          });
      Jest.test("int", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], 23, Curry._1(Jest.Expect[/* expect */0], Json_decode.$$int(23)));
          });
      Jest.test("string", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.$$int, "test"));
          });
      Jest.test("null", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.$$int, null));
          });
      Jest.test("array", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.$$int, /* array */[]));
          });
      return Jest.test("object", function () {
                  return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.$$int, { }));
                });
    });

describe("string", function () {
      Jest.test("boolean", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.string, true));
          });
      Jest.test("float", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.string, 1.23));
          });
      Jest.test("int", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.string, 23));
          });
      Jest.test("string", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], "test", Curry._1(Jest.Expect[/* expect */0], Json_decode.string("test")));
          });
      Jest.test("null", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.string, null));
          });
      Jest.test("array", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.string, /* array */[]));
          });
      return Jest.test("object", function () {
                  return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], Json_decode.string, { }));
                });
    });

describe("nullable", function () {
      Jest.test("boolean -> int", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.nullable(Json_decode.$$int, param);
                          }, true));
          });
      Jest.test("float -> int", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.nullable(Json_decode.$$int, param);
                          }, 1.23));
          });
      Jest.test("int -> int", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], 23, Curry._1(Jest.Expect[/* expect */0], Json_decode.nullable(Json_decode.$$int, 23)));
          });
      Jest.test("string -> int", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.nullable(Json_decode.$$int, param);
                          }, "test"));
          });
      Jest.test("null -> int", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], null, Curry._1(Jest.Expect[/* expect */0], Json_decode.nullable(Json_decode.$$int, null)));
          });
      Jest.test("array -> int", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.nullable(Json_decode.$$int, param);
                          }, /* array */[]));
          });
      Jest.test("object -> int", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.nullable(Json_decode.$$int, param);
                          }, { }));
          });
      Jest.test("boolean -> boolean ", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], true, Curry._1(Jest.Expect[/* expect */0], Json_decode.nullable(Json_decode.$$boolean, true)));
          });
      Jest.test("float -> float", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], 1.23, Curry._1(Jest.Expect[/* expect */0], Json_decode.nullable(Json_decode.$$float, 1.23)));
          });
      Jest.test("string -> string", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], "test", Curry._1(Jest.Expect[/* expect */0], Json_decode.nullable(Json_decode.string, "test")));
          });
      Jest.test("null -> null", function () {
            var partial_arg = null;
            return Curry._2(Jest.Expect[/* toEqual */12], null, Curry._1(Jest.Expect[/* expect */0], Json_decode.nullable(function (param) {
                                return Json_decode.nullAs(partial_arg, param);
                              }, null)));
          });
      return Jest.test("int -> boolean", function () {
                  return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                                  return Json_decode.nullable(Json_decode.$$boolean, param);
                                }, 1));
                });
    });

describe("nullAs", function () {
      Jest.test("as 0 - boolean", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.nullAs(0, param);
                          }, true));
          });
      Jest.test("as 0 - float", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.nullAs(0, param);
                          }, 1.23));
          });
      Jest.test("as 0 - int", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.nullAs(0, param);
                          }, 23));
          });
      Jest.test("as 0 - string", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.nullAs(0, param);
                          }, "test"));
          });
      Jest.test("as 0 - null", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], 0, Curry._1(Jest.Expect[/* expect */0], Json_decode.nullAs(0, null)));
          });
      Jest.test("as 0 - array", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.nullAs(0, param);
                          }, /* array */[]));
          });
      Jest.test("as 0 - object", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.nullAs(0, param);
                          }, { }));
          });
      Jest.test("as Js.null", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], null, Curry._1(Jest.Expect[/* expect */0], Json_decode.nullAs(null, null)));
          });
      Jest.test("as None", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], /* None */0, Curry._1(Jest.Expect[/* expect */0], Json_decode.nullAs(/* None */0, null)));
          });
      return Jest.test("as Some _", function () {
                  return Curry._2(Jest.Expect[/* toEqual */12], /* Some */["foo"], Curry._1(Jest.Expect[/* expect */0], Json_decode.nullAs(/* Some */["foo"], null)));
                });
    });

describe("array", function () {
      Jest.test("boolean", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.array(Json_decode.$$int, param);
                          }, true));
          });
      Jest.test("float", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.array(Json_decode.$$int, param);
                          }, 1.23));
          });
      Jest.test("int", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.array(Json_decode.$$int, param);
                          }, 23));
          });
      Jest.test("string", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.array(Json_decode.$$int, param);
                          }, "test"));
          });
      Jest.test("null", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.array(Json_decode.$$int, param);
                          }, null));
          });
      Jest.test("array", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], /* int array */[], Curry._1(Jest.Expect[/* expect */0], Json_decode.array(Json_decode.$$int, /* array */[])));
          });
      Jest.test("object", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.array(Json_decode.$$int, param);
                          }, { }));
          });
      Jest.test("array boolean", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], /* array */[
                        true,
                        false,
                        true
                      ], Curry._1(Jest.Expect[/* expect */0], Json_decode.array(Json_decode.$$boolean, JSON.parse(" [true, false, true] "))));
          });
      Jest.test("array float", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], /* float array */[
                        1,
                        2,
                        3
                      ], Curry._1(Jest.Expect[/* expect */0], Json_decode.array(Json_decode.$$float, JSON.parse(" [1, 2, 3] "))));
          });
      Jest.test("array int", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], /* int array */[
                        1,
                        2,
                        3
                      ], Curry._1(Jest.Expect[/* expect */0], Json_decode.array(Json_decode.$$int, JSON.parse(" [1, 2, 3] "))));
          });
      Jest.test("array string", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], /* array */[
                        "a",
                        "b",
                        "c"
                      ], Curry._1(Jest.Expect[/* expect */0], Json_decode.array(Json_decode.string, JSON.parse(" [\"a\", \"b\", \"c\"] "))));
          });
      Jest.test("array nullAs", function () {
            var partial_arg = null;
            return Curry._2(Jest.Expect[/* toEqual */12], /* array */[
                        null,
                        null,
                        null
                      ], Curry._1(Jest.Expect[/* expect */0], Json_decode.array(function (param) {
                                return Json_decode.nullAs(partial_arg, param);
                              }, JSON.parse(" [null, null, null] "))));
          });
      return Jest.test("array int -> array boolean", function () {
                  return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                                  return Json_decode.array(Json_decode.$$boolean, param);
                                }, JSON.parse(" [1, 2, 3] ")));
                });
    });

describe("dict", function () {
      Jest.test("boolean", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.dict(Json_decode.$$int, param);
                          }, true));
          });
      Jest.test("float", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.dict(Json_decode.$$int, param);
                          }, 1.23));
          });
      Jest.test("int", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.dict(Json_decode.$$int, param);
                          }, 23));
          });
      Jest.test("string", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.dict(Json_decode.$$int, param);
                          }, "test"));
          });
      Jest.test("null", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.dict(Json_decode.$$int, param);
                          }, null));
          });
      Jest.test("array", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.dict(Json_decode.$$int, param);
                          }, /* array */[]));
          });
      Jest.test("object", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], { }, Curry._1(Jest.Expect[/* expect */0], Json_decode.dict(Json_decode.$$int, { })));
          });
      Jest.test("dict boolean", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], {
                        a: true,
                        b: false
                      }, Curry._1(Jest.Expect[/* expect */0], Json_decode.dict(Json_decode.$$boolean, JSON.parse(" { \"a\": true, \"b\": false } "))));
          });
      Jest.test("dict float", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], {
                        a: 1.2,
                        b: 2.3
                      }, Curry._1(Jest.Expect[/* expect */0], Json_decode.dict(Json_decode.$$float, JSON.parse(" { \"a\": 1.2, \"b\": 2.3 } "))));
          });
      Jest.test("dict int", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], {
                        a: 1,
                        b: 2
                      }, Curry._1(Jest.Expect[/* expect */0], Json_decode.dict(Json_decode.$$int, JSON.parse(" { \"a\": 1, \"b\": 2 } "))));
          });
      Jest.test("dict string", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], {
                        a: "x",
                        b: "y"
                      }, Curry._1(Jest.Expect[/* expect */0], Json_decode.dict(Json_decode.string, JSON.parse(" { \"a\": \"x\", \"b\": \"y\" } "))));
          });
      Jest.test("dict nullAs", function () {
            var partial_arg = null;
            return Curry._2(Jest.Expect[/* toEqual */12], {
                        a: null,
                        b: null
                      }, Curry._1(Jest.Expect[/* expect */0], Json_decode.dict(function (param) {
                                return Json_decode.nullAs(partial_arg, param);
                              }, JSON.parse(" { \"a\": null, \"b\": null } "))));
          });
      return Jest.test("dict null -> dict string", function () {
                  return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                                  return Json_decode.dict(Json_decode.string, param);
                                }, JSON.parse(" { \"a\": null, \"b\": null } ")));
                });
    });

describe("field", function () {
      Jest.test("boolean", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.field("foo", Json_decode.$$int, param);
                          }, true));
          });
      Jest.test("float", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.field("foo", Json_decode.$$int, param);
                          }, 1.23));
          });
      Jest.test("int", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.field("foo", Json_decode.$$int, param);
                          }, 23));
          });
      Jest.test("string", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.field("foo", Json_decode.$$int, param);
                          }, "test"));
          });
      Jest.test("null", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.field("foo", Json_decode.$$int, param);
                          }, null));
          });
      Jest.test("array", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.field("foo", Json_decode.$$int, param);
                          }, /* array */[]));
          });
      Jest.test("object", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.field("foo", Json_decode.$$int, param);
                          }, { }));
          });
      Jest.test("field boolean", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], false, Curry._1(Jest.Expect[/* expect */0], Json_decode.field("b", Json_decode.$$boolean, JSON.parse(" { \"a\": true, \"b\": false } "))));
          });
      Jest.test("field float", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], 2.3, Curry._1(Jest.Expect[/* expect */0], Json_decode.field("b", Json_decode.$$float, JSON.parse(" { \"a\": 1.2, \"b\": 2.3 } "))));
          });
      Jest.test("field int", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], 2, Curry._1(Jest.Expect[/* expect */0], Json_decode.field("b", Json_decode.$$int, JSON.parse(" { \"a\": 1, \"b\": 2 } "))));
          });
      Jest.test("field string", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], "y", Curry._1(Jest.Expect[/* expect */0], Json_decode.field("b", Json_decode.string, JSON.parse(" { \"a\": \"x\", \"b\": \"y\" } "))));
          });
      Jest.test("field nullAs", function () {
            var partial_arg = null;
            return Curry._2(Jest.Expect[/* toEqual */12], null, Curry._1(Jest.Expect[/* expect */0], Json_decode.field("b", function (param) {
                                return Json_decode.nullAs(partial_arg, param);
                              }, JSON.parse(" { \"a\": null, \"b\": null } "))));
          });
      return Jest.test("field null -> field string", function () {
                  return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                                  return Json_decode.field("b", Json_decode.string, param);
                                }, JSON.parse(" { \"a\": null, \"b\": null } ")));
                });
    });

describe("optional", function () {
      Jest.test("boolean -> int", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], /* None */0, Curry._1(Jest.Expect[/* expect */0], Json_decode.optional(Json_decode.$$int, true)));
          });
      Jest.test("float -> int", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], /* None */0, Curry._1(Jest.Expect[/* expect */0], Json_decode.optional(Json_decode.$$int, 1.23)));
          });
      Jest.test("int -> int", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], /* Some */[23], Curry._1(Jest.Expect[/* expect */0], Json_decode.optional(Json_decode.$$int, 23)));
          });
      Jest.test("string -> int", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], /* None */0, Curry._1(Jest.Expect[/* expect */0], Json_decode.optional(Json_decode.$$int, "test")));
          });
      Jest.test("null -> int", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], /* None */0, Curry._1(Jest.Expect[/* expect */0], Json_decode.optional(Json_decode.$$int, null)));
          });
      Jest.test("array -> int", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], /* None */0, Curry._1(Jest.Expect[/* expect */0], Json_decode.optional(Json_decode.$$int, /* array */[])));
          });
      Jest.test("object -> int", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], /* None */0, Curry._1(Jest.Expect[/* expect */0], Json_decode.optional(Json_decode.$$int, { })));
          });
      Jest.test("boolean -> boolean ", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], /* Some */[true], Curry._1(Jest.Expect[/* expect */0], Json_decode.optional(Json_decode.$$boolean, true)));
          });
      Jest.test("float -> float", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], /* Some */[1.23], Curry._1(Jest.Expect[/* expect */0], Json_decode.optional(Json_decode.$$float, 1.23)));
          });
      Jest.test("string -> string", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], /* Some */["test"], Curry._1(Jest.Expect[/* expect */0], Json_decode.optional(Json_decode.string, "test")));
          });
      Jest.test("null -> null", function () {
            var partial_arg = null;
            return Curry._2(Jest.Expect[/* toEqual */12], /* Some */[null], Curry._1(Jest.Expect[/* expect */0], Json_decode.optional(function (param) {
                                return Json_decode.nullAs(partial_arg, param);
                              }, null)));
          });
      Jest.test("int -> boolean", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], /* None */0, Curry._1(Jest.Expect[/* expect */0], Json_decode.optional(Json_decode.$$boolean, 1)));
          });
      Jest.test("optional field", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], /* Some */[2], Curry._1(Jest.Expect[/* expect */0], Json_decode.optional(function (param) {
                                return Json_decode.field("x", Json_decode.$$int, param);
                              }, JSON.parse(" { \"x\": 2} "))));
          });
      Jest.test("optional field - incorrect type", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], /* None */0, Curry._1(Jest.Expect[/* expect */0], Json_decode.optional(function (param) {
                                return Json_decode.field("x", Json_decode.$$int, param);
                              }, JSON.parse(" { \"x\": 2.3} "))));
          });
      Jest.test("optional field - no such field", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], /* None */0, Curry._1(Jest.Expect[/* expect */0], Json_decode.optional(function (param) {
                                return Json_decode.field("y", Json_decode.$$int, param);
                              }, JSON.parse(" { \"x\": 2} "))));
          });
      Jest.test("field optional", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], /* Some */[2], Curry._1(Jest.Expect[/* expect */0], Json_decode.field("x", function (param) {
                                return Json_decode.optional(Json_decode.$$int, param);
                              }, JSON.parse(" { \"x\": 2} "))));
          });
      Jest.test("field optional - incorrect type", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], /* None */0, Curry._1(Jest.Expect[/* expect */0], Json_decode.field("x", function (param) {
                                return Json_decode.optional(Json_decode.$$int, param);
                              }, JSON.parse(" { \"x\": 2.3} "))));
          });
      return Jest.test("field optional - no such field", function () {
                  return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                                  return Json_decode.field("y", function (param) {
                                              return Json_decode.optional(Json_decode.$$int, param);
                                            }, param);
                                }, JSON.parse(" { \"x\": 2} ")));
                });
    });

describe("composite expressions", function () {
      Jest.test("dict array array int", function () {
            return Curry._2(Jest.Expect[/* toEqual */12], {
                        a: /* array */[
                          /* int array */[
                            1,
                            2
                          ],
                          /* int array */[3]
                        ],
                        b: /* array */[
                          /* int array */[4],
                          /* int array */[
                            5,
                            6
                          ]
                        ]
                      }, Curry._1(Jest.Expect[/* expect */0], Json_decode.dict(function (param) {
                                return Json_decode.array(function (param) {
                                            return Json_decode.array(Json_decode.$$int, param);
                                          }, param);
                              }, JSON.parse(" { \"a\": [[1, 2], [3]], \"b\": [[4], [5, 6]] } "))));
          });
      Jest.test("dict array array int - heterogenous structure", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.dict(function (param) {
                                        return Json_decode.array(function (param) {
                                                    return Json_decode.array(Json_decode.$$int, param);
                                                  }, param);
                                      }, param);
                          }, JSON.parse(" { \"a\": [[1, 2], [true]], \"b\": [[4], [5, 6]] } ")));
          });
      Jest.test("dict array array int - heterogenous structure 2", function () {
            return Curry._1(Jest.Expect[/* toThrow */18], Curry._2(Jest.Expect[/* expectFn */1], function (param) {
                            return Json_decode.dict(function (param) {
                                        return Json_decode.array(function (param) {
                                                    return Json_decode.array(Json_decode.$$int, param);
                                                  }, param);
                                      }, param);
                          }, JSON.parse(" { \"a\": [[1, 2], \"foo\"], \"b\": [[4], [5, 6]] } ")));
          });
      return Jest.test("field", function () {
                  var json = JSON.parse(" { \"foo\": [1, 2, 3], \"bar\": \"baz\" } ");
                  return Curry._2(Jest.Expect[/* toEqual */12], /* tuple */[
                              /* int array */[
                                1,
                                2,
                                3
                              ],
                              "baz"
                            ], Curry._1(Jest.Expect[/* expect */0], /* tuple */[
                                  Json_decode.field("foo", function (param) {
                                        return Json_decode.array(Json_decode.$$int, param);
                                      }, json),
                                  Json_decode.field("bar", Json_decode.string, json)
                                ]));
                });
    });

/*  Not a pure module */
