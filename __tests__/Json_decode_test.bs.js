'use strict';

var Js = require("bs-platform/lib/js/js.js");
var Jest = require("bs-jest/src/jest.js");
var Json = require("../src/Json.bs.js");
var List = require("bs-platform/lib/js/list.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Json_decode = require("../src/Json_decode.bs.js");
var Json_encode = require("../src/Json_encode.bs.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function valueFor(param) {
  switch (param) {
    case 0 : 
        return 1.23;
    case 1 : 
        return 23;
    case 2 : 
        return "test";
    case 3 : 
        return null;
    case 4 : 
        return /* array */[];
    case 5 : 
        return Json_encode.object_(/* [] */0);
    case 6 : 
        return Js.true_;
    case 7 : 
        return Json_encode.$$char(/* "a" */97);
    
  }
}

function throws($staropt$star, decoder, kinds) {
  var name = $staropt$star ? $staropt$star[0] : "throws";
  return Jest.testAll(name, List.map(valueFor, kinds), (function (value) {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            ""
                          ], Jest.Expect[/* expectFn */1](decoder, value));
              }));
}

var Test = /* module */[
  /* valueFor */valueFor,
  /* throws */throws
];

describe("boolean", (function () {
        Jest.test("boolean", (function () {
                return Jest.Expect[/* toEqual */12](Js.true_, Jest.Expect[/* expect */0](Json_decode.$$boolean(Js.true_)));
              }));
        return throws(/* None */0, Json_decode.$$boolean, /* :: */[
                    /* Float */0,
                    /* :: */[
                      /* Int */1,
                      /* :: */[
                        /* String */2,
                        /* :: */[
                          /* Null */3,
                          /* :: */[
                            /* Array */4,
                            /* :: */[
                              /* Object */5,
                              /* :: */[
                                /* Char */7,
                                /* [] */0
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("bool", (function () {
        Jest.test("bool", (function () {
                return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Json_decode.bool(Js.true_)));
              }));
        Jest.test("bool - false", (function () {
                return Jest.Expect[/* toEqual */12](false, Jest.Expect[/* expect */0](Json_decode.bool(Js.false_)));
              }));
        return throws(/* None */0, Json_decode.bool, /* :: */[
                    /* Float */0,
                    /* :: */[
                      /* Int */1,
                      /* :: */[
                        /* String */2,
                        /* :: */[
                          /* Null */3,
                          /* :: */[
                            /* Array */4,
                            /* :: */[
                              /* Object */5,
                              /* :: */[
                                /* Char */7,
                                /* [] */0
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("float", (function () {
        Jest.test("float", (function () {
                return Jest.Expect[/* toEqual */12](1.23, Jest.Expect[/* expect */0](Json_decode.$$float(1.23)));
              }));
        Jest.test("int", (function () {
                return Jest.Expect[/* toEqual */12](23, Jest.Expect[/* expect */0](Json_decode.$$float(23)));
              }));
        return throws(/* None */0, Json_decode.$$float, /* :: */[
                    /* Bool */6,
                    /* :: */[
                      /* String */2,
                      /* :: */[
                        /* Null */3,
                        /* :: */[
                          /* Array */4,
                          /* :: */[
                            /* Object */5,
                            /* :: */[
                              /* Char */7,
                              /* [] */0
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("int", (function () {
        Jest.test("int", (function () {
                return Jest.Expect[/* toEqual */12](23, Jest.Expect[/* expect */0](Json_decode.$$int(23)));
              }));
        Jest.test("int > 32-bit", (function () {
                var big_int = (2147483648);
                return Jest.Expect[/* toEqual */12](big_int, Jest.Expect[/* expect */0](Json_decode.$$int(big_int)));
              }));
        Jest.test("infinity", (function () {
                var inf = (Infinity);
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected integer, got null"
                          ], Jest.Expect[/* expectFn */1](Json_decode.$$int, inf));
              }));
        return throws(/* None */0, Json_decode.$$int, /* :: */[
                    /* Bool */6,
                    /* :: */[
                      /* Float */0,
                      /* :: */[
                        /* String */2,
                        /* :: */[
                          /* Null */3,
                          /* :: */[
                            /* Array */4,
                            /* :: */[
                              /* Object */5,
                              /* :: */[
                                /* Char */7,
                                /* [] */0
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("string", (function () {
        Jest.test("string", (function () {
                return Jest.Expect[/* toEqual */12]("test", Jest.Expect[/* expect */0](Json_decode.string("test")));
              }));
        Jest.test("single-character string", (function () {
                return Jest.Expect[/* toEqual */12]("a", Jest.Expect[/* expect */0](Json_decode.string(Json_encode.$$char(/* "a" */97))));
              }));
        return throws(/* None */0, Json_decode.string, /* :: */[
                    /* Bool */6,
                    /* :: */[
                      /* Float */0,
                      /* :: */[
                        /* Int */1,
                        /* :: */[
                          /* Null */3,
                          /* :: */[
                            /* Array */4,
                            /* :: */[
                              /* Object */5,
                              /* [] */0
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("date", (function () {
        Jest.test("ISO8601-formatted string", (function () {
                return Jest.Expect[/* toEqual */12](new Date("2012-04-23T18:25:43.511Z"), Jest.Expect[/* expect */0](Json_decode.date("2012-04-23T18:25:43.511Z")));
              }));
        return throws(/* None */0, Json_decode.date, /* :: */[
                    /* Bool */6,
                    /* :: */[
                      /* Float */0,
                      /* :: */[
                        /* Int */1,
                        /* :: */[
                          /* Null */3,
                          /* :: */[
                            /* Array */4,
                            /* :: */[
                              /* Object */5,
                              /* [] */0
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("char", (function () {
        Jest.test("character", (function () {
                return Jest.Expect[/* toEqual */12](/* "a" */97, Jest.Expect[/* expect */0](Json_decode.$$char(Json_encode.$$char(/* "a" */97))));
              }));
        Jest.test("single-character string", (function () {
                return Jest.Expect[/* toEqual */12](/* "a" */97, Jest.Expect[/* expect */0](Json_decode.$$char("a")));
              }));
        Jest.test("empty string", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected single-character string, got \"\""
                          ], Jest.Expect[/* expectFn */1](Json_decode.$$char, ""));
              }));
        Jest.test("multiple-character string", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected single-character string, got \"abc\""
                          ], Jest.Expect[/* expectFn */1](Json_decode.$$char, "abc"));
              }));
        return throws(/* None */0, Json_decode.$$char, /* :: */[
                    /* Bool */6,
                    /* :: */[
                      /* Float */0,
                      /* :: */[
                        /* Int */1,
                        /* :: */[
                          /* Null */3,
                          /* :: */[
                            /* Array */4,
                            /* :: */[
                              /* Object */5,
                              /* [] */0
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("nullable", (function () {
        Jest.test("int -> int", (function () {
                return Jest.Expect[/* toEqual */12](23, Jest.Expect[/* expect */0](Json_decode.nullable(Json_decode.$$int, 23)));
              }));
        Jest.test("null -> int", (function () {
                return Jest.Expect[/* toEqual */12](null, Jest.Expect[/* expect */0](Json_decode.nullable(Json_decode.$$int, null)));
              }));
        Jest.test("boolean -> boolean ", (function () {
                return Jest.Expect[/* toEqual */12](Js.true_, Jest.Expect[/* expect */0](Json_decode.nullable(Json_decode.$$boolean, Js.true_)));
              }));
        Jest.test("float -> float", (function () {
                return Jest.Expect[/* toEqual */12](1.23, Jest.Expect[/* expect */0](Json_decode.nullable(Json_decode.$$float, 1.23)));
              }));
        Jest.test("string -> string", (function () {
                return Jest.Expect[/* toEqual */12]("test", Jest.Expect[/* expect */0](Json_decode.nullable(Json_decode.string, "test")));
              }));
        Jest.test("null -> null", (function () {
                var partial_arg = null;
                return Jest.Expect[/* toEqual */12](null, Jest.Expect[/* expect */0](Json_decode.nullable((function (param) {
                                      return Json_decode.nullAs(partial_arg, param);
                                    }), null)));
              }));
        throws(/* None */0, (function (param) {
                return Json_decode.nullable(Json_decode.$$int, param);
              }), /* :: */[
              /* Bool */6,
              /* :: */[
                /* Float */0,
                /* :: */[
                  /* String */2,
                  /* :: */[
                    /* Array */4,
                    /* :: */[
                      /* Object */5,
                      /* :: */[
                        /* Char */7,
                        /* [] */0
                      ]
                    ]
                  ]
                ]
              ]
            ]);
        return throws(/* None */0, (function (param) {
                      return Json_decode.nullable(Json_decode.$$boolean, param);
                    }), /* :: */[
                    /* Int */1,
                    /* [] */0
                  ]);
      }));

describe("nullAs", (function () {
        Jest.test("as 0 - null", (function () {
                return Jest.Expect[/* toEqual */12](0, Jest.Expect[/* expect */0](Json_decode.nullAs(0, null)));
              }));
        Jest.test("as Js.null", (function () {
                return Jest.Expect[/* toEqual */12](null, Jest.Expect[/* expect */0](Json_decode.nullAs(null, null)));
              }));
        Jest.test("as None", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0, Jest.Expect[/* expect */0](Json_decode.nullAs(/* None */0, null)));
              }));
        Jest.test("as Some _", (function () {
                return Jest.Expect[/* toEqual */12](/* Some */["foo"], Jest.Expect[/* expect */0](Json_decode.nullAs(/* Some */["foo"], null)));
              }));
        return throws(/* None */0, (function (param) {
                      return Json_decode.nullAs(0, param);
                    }), /* :: */[
                    /* Bool */6,
                    /* :: */[
                      /* Float */0,
                      /* :: */[
                        /* Int */1,
                        /* :: */[
                          /* String */2,
                          /* :: */[
                            /* Array */4,
                            /* :: */[
                              /* Object */5,
                              /* :: */[
                                /* Char */7,
                                /* [] */0
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("array", (function () {
        Jest.test("array", (function () {
                return Jest.Expect[/* toEqual */12](/* array */[], Jest.Expect[/* expect */0](Json_decode.array(Json_decode.$$int, /* array */[])));
              }));
        Jest.test("boolean", (function () {
                return Jest.Expect[/* toEqual */12](/* array */[
                            Js.true_,
                            Js.false_,
                            Js.true_
                          ], Jest.Expect[/* expect */0](Json_decode.array(Json_decode.$$boolean, Json.parseOrRaise(" [true, false, true] "))));
              }));
        Jest.test("float", (function () {
                return Jest.Expect[/* toEqual */12](/* array */[
                            1,
                            2,
                            3
                          ], Jest.Expect[/* expect */0](Json_decode.array(Json_decode.$$float, Json.parseOrRaise(" [1, 2, 3] "))));
              }));
        Jest.test("int", (function () {
                return Jest.Expect[/* toEqual */12](/* array */[
                            1,
                            2,
                            3
                          ], Jest.Expect[/* expect */0](Json_decode.array(Json_decode.$$int, Json.parseOrRaise(" [1, 2, 3] "))));
              }));
        Jest.test("string", (function () {
                return Jest.Expect[/* toEqual */12](/* array */[
                            "a",
                            "b",
                            "c"
                          ], Jest.Expect[/* expect */0](Json_decode.array(Json_decode.string, Json.parseOrRaise(" [\"a\", \"b\", \"c\"] "))));
              }));
        Jest.test("nullAs", (function () {
                var partial_arg = null;
                return Jest.Expect[/* toEqual */12](/* array */[
                            null,
                            null,
                            null
                          ], Jest.Expect[/* expect */0](Json_decode.array((function (param) {
                                      return Json_decode.nullAs(partial_arg, param);
                                    }), Json.parseOrRaise(" [null, null, null] "))));
              }));
        Jest.test("array int -> array boolean", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected boolean, got 1\n\tin array"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.array(Json_decode.$$boolean, param);
                                }), Json.parseOrRaise(" [1, 2, 3] ")));
              }));
        Jest.test("non-DecodeError exceptions in decoder should pass through", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Caml_builtin_exceptions.failure,
                            "fail"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.array((function () {
                                                return Pervasives.failwith("fail");
                                              }), param);
                                }), Json_encode.array((function (prim) {
                                      return prim;
                                    }), /* array */[1])));
              }));
        return throws(/* None */0, (function (param) {
                      return Json_decode.array(Json_decode.$$int, param);
                    }), /* :: */[
                    /* Bool */6,
                    /* :: */[
                      /* Float */0,
                      /* :: */[
                        /* Int */1,
                        /* :: */[
                          /* String */2,
                          /* :: */[
                            /* Null */3,
                            /* :: */[
                              /* Object */5,
                              /* :: */[
                                /* Char */7,
                                /* [] */0
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("list", (function () {
        Jest.test("array", (function () {
                return Jest.Expect[/* toEqual */12](/* [] */0, Jest.Expect[/* expect */0](Json_decode.list(Json_decode.$$int, /* array */[])));
              }));
        Jest.test("boolean", (function () {
                return Jest.Expect[/* toEqual */12](/* :: */[
                            Js.true_,
                            /* :: */[
                              Js.false_,
                              /* :: */[
                                Js.true_,
                                /* [] */0
                              ]
                            ]
                          ], Jest.Expect[/* expect */0](Json_decode.list(Json_decode.$$boolean, Json.parseOrRaise(" [true, false, true] "))));
              }));
        Jest.test("float", (function () {
                return Jest.Expect[/* toEqual */12](/* :: */[
                            1,
                            /* :: */[
                              2,
                              /* :: */[
                                3,
                                /* [] */0
                              ]
                            ]
                          ], Jest.Expect[/* expect */0](Json_decode.list(Json_decode.$$float, Json.parseOrRaise(" [1, 2, 3] "))));
              }));
        Jest.test("int", (function () {
                return Jest.Expect[/* toEqual */12](/* :: */[
                            1,
                            /* :: */[
                              2,
                              /* :: */[
                                3,
                                /* [] */0
                              ]
                            ]
                          ], Jest.Expect[/* expect */0](Json_decode.list(Json_decode.$$int, Json.parseOrRaise(" [1, 2, 3] "))));
              }));
        Jest.test("string", (function () {
                return Jest.Expect[/* toEqual */12](/* :: */[
                            "a",
                            /* :: */[
                              "b",
                              /* :: */[
                                "c",
                                /* [] */0
                              ]
                            ]
                          ], Jest.Expect[/* expect */0](Json_decode.list(Json_decode.string, Json.parseOrRaise(" [\"a\", \"b\", \"c\"] "))));
              }));
        Jest.test("nullAs", (function () {
                var partial_arg = null;
                return Jest.Expect[/* toEqual */12](/* :: */[
                            null,
                            /* :: */[
                              null,
                              /* :: */[
                                null,
                                /* [] */0
                              ]
                            ]
                          ], Jest.Expect[/* expect */0](Json_decode.list((function (param) {
                                      return Json_decode.nullAs(partial_arg, param);
                                    }), Json.parseOrRaise(" [null, null, null] "))));
              }));
        Jest.test("array int -> list boolean", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected boolean, got 1\n\tin array"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.list(Json_decode.$$boolean, param);
                                }), Json.parseOrRaise(" [1, 2, 3] ")));
              }));
        Jest.test("non-DecodeError exceptions in decoder should pass through", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Caml_builtin_exceptions.failure,
                            "fail"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.list((function () {
                                                return Pervasives.failwith("fail");
                                              }), param);
                                }), Json_encode.list((function (prim) {
                                      return prim;
                                    }), /* :: */[
                                    1,
                                    /* [] */0
                                  ])));
              }));
        return throws(/* None */0, (function (param) {
                      return Json_decode.list(Json_decode.$$int, param);
                    }), /* :: */[
                    /* Bool */6,
                    /* :: */[
                      /* Float */0,
                      /* :: */[
                        /* Int */1,
                        /* :: */[
                          /* String */2,
                          /* :: */[
                            /* Null */3,
                            /* :: */[
                              /* Object */5,
                              /* :: */[
                                /* Char */7,
                                /* [] */0
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("pair", (function () {
        Jest.test("heterogenous", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                            "a",
                            3
                          ], Jest.Expect[/* expect */0](Json_decode.pair(Json_decode.string, Json_decode.$$int, Json.parseOrRaise(" [\"a\", 3] "))));
              }));
        Jest.test("int int", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                            4,
                            3
                          ], Jest.Expect[/* expect */0](Json_decode.pair(Json_decode.$$int, Json_decode.$$int, Json.parseOrRaise(" [4, 3] "))));
              }));
        Jest.test("too small", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected array of length 2, got array of length 1"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.pair(Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" [4] ")));
              }));
        Jest.test("too large", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected array of length 2, got array of length 3"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.pair(Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" [3, 4, 5] ")));
              }));
        Jest.test("bad type a", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected number, got \"3\"\n\tin pair/tuple2"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.pair(Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" [\"3\", 4] ")));
              }));
        Jest.test("bad type b", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected string, got 4\n\tin pair/tuple2"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.pair(Json_decode.string, Json_decode.string, param);
                                }), Json.parseOrRaise(" [\"3\", 4] ")));
              }));
        Jest.test("not array", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected array, got 4"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.pair(Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" 4 ")));
              }));
        return Jest.test("non-DecodeError exceptions in decoder should pass through", (function () {
                      return Jest.Expect[/* toThrowException */20]([
                                  Caml_builtin_exceptions.failure,
                                  "fail"
                                ], Jest.Expect[/* expectFn */1]((function (param) {
                                        return Json_decode.pair((function () {
                                                      return Pervasives.failwith("fail");
                                                    }), Json_decode.$$int, param);
                                      }), Json.parseOrRaise(" [4, 3] ")));
                    }));
      }));

describe("tuple2", (function () {
        Jest.test("heterogenous", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                            "a",
                            3
                          ], Jest.Expect[/* expect */0](Json_decode.tuple2(Json_decode.string, Json_decode.$$int, Json.parseOrRaise(" [\"a\", 3] "))));
              }));
        Jest.test("too small", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected array of length 2, got array of length 1"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.tuple2(Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" [4] ")));
              }));
        Jest.test("too large", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected array of length 2, got array of length 3"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.tuple2(Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" [3, 4, 5] ")));
              }));
        Jest.test("bad type a", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected number, got \"3\"\n\tin pair/tuple2"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.tuple2(Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" [\"3\", 4] ")));
              }));
        Jest.test("bad type b", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected string, got 4\n\tin pair/tuple2"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.tuple2(Json_decode.string, Json_decode.string, param);
                                }), Json.parseOrRaise(" [\"3\", 4] ")));
              }));
        Jest.test("not array", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected array, got 4"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.tuple2(Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" 4 ")));
              }));
        return Jest.test("non-DecodeError exceptions in decoder should pass through", (function () {
                      return Jest.Expect[/* toThrowException */20]([
                                  Caml_builtin_exceptions.failure,
                                  "fail"
                                ], Jest.Expect[/* expectFn */1]((function (param) {
                                        return Json_decode.tuple2((function () {
                                                      return Pervasives.failwith("fail");
                                                    }), Json_decode.$$int, param);
                                      }), Json.parseOrRaise(" [4, 3] ")));
                    }));
      }));

describe("tuple3", (function () {
        Jest.test("heterogenous", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                            "a",
                            3,
                            4.5
                          ], Jest.Expect[/* expect */0](Json_decode.tuple3(Json_decode.string, Json_decode.$$int, Json_decode.$$float, Json.parseOrRaise(" [\"a\", 3, 4.5] "))));
              }));
        Jest.test("too small", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected array of length 3, got array of length 1"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.tuple3(Json_decode.$$int, Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" [4] ")));
              }));
        Jest.test("too large", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected array of length 3, got array of length 5"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.tuple3(Json_decode.$$int, Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" [3, 4, 5, 6, 7] ")));
              }));
        Jest.test("bad type a", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected number, got \"3\"\n\tin tuple3"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.tuple3(Json_decode.$$int, Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" [\"3\", 4, 5] ")));
              }));
        Jest.test("bad type b", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected string, got 4\n\tin tuple3"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.tuple3(Json_decode.string, Json_decode.string, Json_decode.string, param);
                                }), Json.parseOrRaise(" [\"3\", 4, \"5\"] ")));
              }));
        Jest.test("not array", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected array, got 4"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.tuple3(Json_decode.$$int, Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" 4 ")));
              }));
        return Jest.test("non-DecodeError exceptions in decoder should pass through", (function () {
                      return Jest.Expect[/* toThrowException */20]([
                                  Caml_builtin_exceptions.failure,
                                  "fail"
                                ], Jest.Expect[/* expectFn */1]((function (param) {
                                        return Json_decode.tuple3((function () {
                                                      return Pervasives.failwith("fail");
                                                    }), Json_decode.$$int, Json_decode.$$int, param);
                                      }), Json.parseOrRaise(" [4, 3, 5] ")));
                    }));
      }));

describe("tuple4", (function () {
        Jest.test("heterogenous", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                            "a",
                            3,
                            4.5,
                            true
                          ], Jest.Expect[/* expect */0](Json_decode.tuple4(Json_decode.string, Json_decode.$$int, Json_decode.$$float, Json_decode.bool, Json.parseOrRaise(" [\"a\", 3, 4.5, true] "))));
              }));
        Jest.test("too small", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected array of length 4, got array of length 1"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.tuple4(Json_decode.$$int, Json_decode.$$int, Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" [4] ")));
              }));
        Jest.test("too large", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected array of length 4, got array of length 6"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.tuple4(Json_decode.$$int, Json_decode.$$int, Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" [3, 4, 5, 6, 7, 8] ")));
              }));
        Jest.test("bad type a", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected number, got \"3\"\n\tin tuple4"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.tuple4(Json_decode.$$int, Json_decode.$$int, Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" [\"3\", 4, 5, 6] ")));
              }));
        Jest.test("bad type b", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected string, got 4\n\tin tuple4"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.tuple4(Json_decode.string, Json_decode.string, Json_decode.string, Json_decode.string, param);
                                }), Json.parseOrRaise(" [\"3\", 4, \"5\", \"6\"] ")));
              }));
        Jest.test("not array", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected array, got 4"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.tuple4(Json_decode.$$int, Json_decode.$$int, Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" 4 ")));
              }));
        return Jest.test("non-DecodeError exceptions in decoder should pass through", (function () {
                      return Jest.Expect[/* toThrowException */20]([
                                  Caml_builtin_exceptions.failure,
                                  "fail"
                                ], Jest.Expect[/* expectFn */1]((function (param) {
                                        return Json_decode.tuple4((function () {
                                                      return Pervasives.failwith("fail");
                                                    }), Json_decode.$$int, Json_decode.$$int, Json_decode.$$int, param);
                                      }), Json.parseOrRaise(" [4, 3, 5, 6] ")));
                    }));
      }));

describe("dict", (function () {
        Jest.test("object", (function () {
                return Jest.Expect[/* toEqual */12]({ }, Jest.Expect[/* expect */0](Json_decode.dict(Json_decode.$$int, Json_encode.object_(/* [] */0))));
              }));
        Jest.test("boolean", (function () {
                return Jest.Expect[/* toEqual */12]({
                            a: Js.true_,
                            b: Js.false_
                          }, Jest.Expect[/* expect */0](Json_decode.dict(Json_decode.$$boolean, Json.parseOrRaise(" { \"a\": true, \"b\": false } "))));
              }));
        Jest.test("float", (function () {
                return Jest.Expect[/* toEqual */12]({
                            a: 1.2,
                            b: 2.3
                          }, Jest.Expect[/* expect */0](Json_decode.dict(Json_decode.$$float, Json.parseOrRaise(" { \"a\": 1.2, \"b\": 2.3 } "))));
              }));
        Jest.test("int", (function () {
                return Jest.Expect[/* toEqual */12]({
                            a: 1,
                            b: 2
                          }, Jest.Expect[/* expect */0](Json_decode.dict(Json_decode.$$int, Json.parseOrRaise(" { \"a\": 1, \"b\": 2 } "))));
              }));
        Jest.test("string", (function () {
                return Jest.Expect[/* toEqual */12]({
                            a: "x",
                            b: "y"
                          }, Jest.Expect[/* expect */0](Json_decode.dict(Json_decode.string, Json.parseOrRaise(" { \"a\": \"x\", \"b\": \"y\" } "))));
              }));
        Jest.test("nullAs", (function () {
                var partial_arg = null;
                return Jest.Expect[/* toEqual */12]({
                            a: null,
                            b: null
                          }, Jest.Expect[/* expect */0](Json_decode.dict((function (param) {
                                      return Json_decode.nullAs(partial_arg, param);
                                    }), Json.parseOrRaise(" { \"a\": null, \"b\": null } "))));
              }));
        Jest.test("null -> dict string", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected string, got null\n\tin dict"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.dict(Json_decode.string, param);
                                }), Json.parseOrRaise(" { \"a\": null, \"b\": null } ")));
              }));
        Jest.test("non-DecodeError exceptions in decoder should pass through", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Caml_builtin_exceptions.failure,
                            "fail"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.dict((function () {
                                                return Pervasives.failwith("fail");
                                              }), param);
                                }), Json.parseOrRaise(" { \"a\": 0 } ")));
              }));
        return throws(/* None */0, (function (param) {
                      return Json_decode.dict(Json_decode.$$int, param);
                    }), /* :: */[
                    /* Bool */6,
                    /* :: */[
                      /* Float */0,
                      /* :: */[
                        /* Int */1,
                        /* :: */[
                          /* String */2,
                          /* :: */[
                            /* Null */3,
                            /* :: */[
                              /* Array */4,
                              /* :: */[
                                /* Char */7,
                                /* [] */0
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("field", (function () {
        Jest.test("boolean", (function () {
                return Jest.Expect[/* toEqual */12](Js.false_, Jest.Expect[/* expect */0](Json_decode.field("b", Json_decode.$$boolean, Json.parseOrRaise(" { \"a\": true, \"b\": false } "))));
              }));
        Jest.test("float", (function () {
                return Jest.Expect[/* toEqual */12](2.3, Jest.Expect[/* expect */0](Json_decode.field("b", Json_decode.$$float, Json.parseOrRaise(" { \"a\": 1.2, \"b\": 2.3 } "))));
              }));
        Jest.test("int", (function () {
                return Jest.Expect[/* toEqual */12](2, Jest.Expect[/* expect */0](Json_decode.field("b", Json_decode.$$int, Json.parseOrRaise(" { \"a\": 1, \"b\": 2 } "))));
              }));
        Jest.test("string", (function () {
                return Jest.Expect[/* toEqual */12]("y", Jest.Expect[/* expect */0](Json_decode.field("b", Json_decode.string, Json.parseOrRaise(" { \"a\": \"x\", \"b\": \"y\" } "))));
              }));
        Jest.test("nullAs", (function () {
                var partial_arg = null;
                return Jest.Expect[/* toEqual */12](null, Jest.Expect[/* expect */0](Json_decode.field("b", (function (param) {
                                      return Json_decode.nullAs(partial_arg, param);
                                    }), Json.parseOrRaise(" { \"a\": null, \"b\": null } "))));
              }));
        Jest.test("missing key", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected field 'c'"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.field("c", Json_decode.string, param);
                                }), Json.parseOrRaise(" { \"a\": null, \"b\": null } ")));
              }));
        Jest.test("decoder error", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected string, got null\n\tat field 'b'"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.field("b", Json_decode.string, param);
                                }), Json.parseOrRaise(" { \"a\": null, \"b\": null } ")));
              }));
        Jest.test("non-DecodeError exceptions in decoder should pass through", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Caml_builtin_exceptions.failure,
                            "fail"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.field("a", (function () {
                                                return Pervasives.failwith("fail");
                                              }), param);
                                }), Json.parseOrRaise(" { \"a\": 0 } ")));
              }));
        return throws(/* None */0, (function (param) {
                      return Json_decode.field("foo", Json_decode.$$int, param);
                    }), /* :: */[
                    /* Bool */6,
                    /* :: */[
                      /* Float */0,
                      /* :: */[
                        /* Int */1,
                        /* :: */[
                          /* String */2,
                          /* :: */[
                            /* Null */3,
                            /* :: */[
                              /* Array */4,
                              /* :: */[
                                /* Object */5,
                                /* :: */[
                                  /* Char */7,
                                  /* [] */0
                                ]
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("at", (function () {
        Jest.test("boolean", (function () {
                return Jest.Expect[/* toEqual */12](Js.false_, Jest.Expect[/* expect */0](Json_decode.at(/* :: */[
                                      "a",
                                      /* :: */[
                                        "x",
                                        /* :: */[
                                          "y",
                                          /* [] */0
                                        ]
                                      ]
                                    ], Json_decode.$$boolean)(Json.parseOrRaise(" {\n        \"a\": { \"x\" : { \"y\" : false } }, \n        \"b\": false \n      } "))));
              }));
        Jest.test("nullAs", (function () {
                var partial_arg = null;
                return Jest.Expect[/* toEqual */12](null, Jest.Expect[/* expect */0](Json_decode.at(/* :: */[
                                      "a",
                                      /* :: */[
                                        "x",
                                        /* [] */0
                                      ]
                                    ], (function (param) {
                                        return Json_decode.nullAs(partial_arg, param);
                                      }))(Json.parseOrRaise(" {\n        \"a\": { \"x\" : null }, \n        \"b\": null \n      } "))));
              }));
        Jest.test("missing key", (function () {
                var partial_arg = null;
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected field 'y'\n\tat field 'a'"
                          ], Jest.Expect[/* expectFn */1](Json_decode.at(/* :: */[
                                    "a",
                                    /* :: */[
                                      "y",
                                      /* [] */0
                                    ]
                                  ], (function (param) {
                                      return Json_decode.nullAs(partial_arg, param);
                                    })), Json.parseOrRaise(" {\n        \"a\": { \"x\" : null }, \n        \"b\": null \n      } ")));
              }));
        Jest.test("decoder error", (function () {
                var partial_arg = null;
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected null, got \"foo\"\n\tat field 'y'\n\tat field 'x'\n\tat field 'a'"
                          ], Jest.Expect[/* expectFn */1](Json_decode.at(/* :: */[
                                    "a",
                                    /* :: */[
                                      "x",
                                      /* :: */[
                                        "y",
                                        /* [] */0
                                      ]
                                    ]
                                  ], (function (param) {
                                      return Json_decode.nullAs(partial_arg, param);
                                    })), Json.parseOrRaise(" {\n        \"a\": { \"x\" : { \"y\": \"foo\" } }, \n        \"b\": null \n      } ")));
              }));
        Jest.test("empty list of keys should raise Invalid_argument", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Caml_builtin_exceptions.invalid_argument,
                            "Expected key_path to contain at least one element"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.at(/* [] */0, param);
                                }), Json_decode.$$int));
              }));
        return throws(/* None */0, Json_decode.at(/* :: */[
                        "foo",
                        /* :: */[
                          "bar",
                          /* [] */0
                        ]
                      ], Json_decode.$$int), /* :: */[
                    /* Bool */6,
                    /* :: */[
                      /* Float */0,
                      /* :: */[
                        /* Int */1,
                        /* :: */[
                          /* String */2,
                          /* :: */[
                            /* Null */3,
                            /* :: */[
                              /* Array */4,
                              /* :: */[
                                /* Object */5,
                                /* :: */[
                                  /* Char */7,
                                  /* [] */0
                                ]
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("optional", (function () {
        Jest.test("boolean -> int", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0, Jest.Expect[/* expect */0](Json_decode.optional(Json_decode.$$int, Js.true_)));
              }));
        Jest.test("float -> int", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0, Jest.Expect[/* expect */0](Json_decode.optional(Json_decode.$$int, 1.23)));
              }));
        Jest.test("int -> int", (function () {
                return Jest.Expect[/* toEqual */12](/* Some */[23], Jest.Expect[/* expect */0](Json_decode.optional(Json_decode.$$int, 23)));
              }));
        Jest.test("string -> int", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0, Jest.Expect[/* expect */0](Json_decode.optional(Json_decode.$$int, "test")));
              }));
        Jest.test("null -> int", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0, Jest.Expect[/* expect */0](Json_decode.optional(Json_decode.$$int, null)));
              }));
        Jest.test("array -> int", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0, Jest.Expect[/* expect */0](Json_decode.optional(Json_decode.$$int, /* array */[])));
              }));
        Jest.test("object -> int", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0, Jest.Expect[/* expect */0](Json_decode.optional(Json_decode.$$int, Json_encode.object_(/* [] */0))));
              }));
        Jest.test("boolean -> boolean ", (function () {
                return Jest.Expect[/* toEqual */12](/* Some */[Js.true_], Jest.Expect[/* expect */0](Json_decode.optional(Json_decode.$$boolean, Js.true_)));
              }));
        Jest.test("float -> float", (function () {
                return Jest.Expect[/* toEqual */12](/* Some */[1.23], Jest.Expect[/* expect */0](Json_decode.optional(Json_decode.$$float, 1.23)));
              }));
        Jest.test("string -> string", (function () {
                return Jest.Expect[/* toEqual */12](/* Some */["test"], Jest.Expect[/* expect */0](Json_decode.optional(Json_decode.string, "test")));
              }));
        Jest.test("null -> null", (function () {
                var partial_arg = null;
                return Jest.Expect[/* toEqual */12](/* Some */[null], Jest.Expect[/* expect */0](Json_decode.optional((function (param) {
                                      return Json_decode.nullAs(partial_arg, param);
                                    }), null)));
              }));
        Jest.test("int -> boolean", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0, Jest.Expect[/* expect */0](Json_decode.optional(Json_decode.$$boolean, 1)));
              }));
        Jest.test("optional field", (function () {
                return Jest.Expect[/* toEqual */12](/* Some */[2], Jest.Expect[/* expect */0](Json_decode.optional((function (param) {
                                      return Json_decode.field("x", Json_decode.$$int, param);
                                    }), Json.parseOrRaise(" { \"x\": 2} "))));
              }));
        Jest.test("optional field - incorrect type", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0, Jest.Expect[/* expect */0](Json_decode.optional((function (param) {
                                      return Json_decode.field("x", Json_decode.$$int, param);
                                    }), Json.parseOrRaise(" { \"x\": 2.3} "))));
              }));
        Jest.test("optional field - no such field", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0, Jest.Expect[/* expect */0](Json_decode.optional((function (param) {
                                      return Json_decode.field("y", Json_decode.$$int, param);
                                    }), Json.parseOrRaise(" { \"x\": 2} "))));
              }));
        Jest.test("field optional", (function () {
                return Jest.Expect[/* toEqual */12](/* Some */[2], Jest.Expect[/* expect */0](Json_decode.field("x", (function (param) {
                                      return Json_decode.optional(Json_decode.$$int, param);
                                    }), Json.parseOrRaise(" { \"x\": 2} "))));
              }));
        Jest.test("field optional - incorrect type", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0, Jest.Expect[/* expect */0](Json_decode.field("x", (function (param) {
                                      return Json_decode.optional(Json_decode.$$int, param);
                                    }), Json.parseOrRaise(" { \"x\": 2.3} "))));
              }));
        Jest.test("field optional - no such field", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected field 'y'"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.field("y", (function (param) {
                                                return Json_decode.optional(Json_decode.$$int, param);
                                              }), param);
                                }), Json.parseOrRaise(" { \"x\": 2} ")));
              }));
        return Jest.test("non-DecodeError exceptions in decoder should pass through", (function () {
                      return Jest.Expect[/* toThrowException */20]([
                                  Caml_builtin_exceptions.failure,
                                  "fail"
                                ], Jest.Expect[/* expectFn */1]((function (param) {
                                        return Json_decode.optional((function () {
                                                      return Pervasives.failwith("fail");
                                                    }), param);
                                      }), null));
                    }));
      }));

describe("oneOf", (function () {
        Jest.test("object with field", (function () {
                return Jest.Expect[/* toEqual */12](2, Jest.Expect[/* expect */0](Json_decode.oneOf(/* :: */[
                                    Json_decode.$$int,
                                    /* :: */[
                                      (function (param) {
                                          return Json_decode.field("x", Json_decode.$$int, param);
                                        }),
                                      /* [] */0
                                    ]
                                  ], Json.parseOrRaise(" { \"x\": 2} "))));
              }));
        Jest.test("int", (function () {
                return Jest.Expect[/* toEqual */12](23, Jest.Expect[/* expect */0](Json_decode.oneOf(/* :: */[
                                    Json_decode.$$int,
                                    /* :: */[
                                      (function (param) {
                                          return Json_decode.field("x", Json_decode.$$int, param);
                                        }),
                                      /* [] */0
                                    ]
                                  ], 23)));
              }));
        Jest.test("non-DecodeError exceptions in decoder should pass through", (function () {
                var partial_arg_000 = function () {
                  return Pervasives.failwith("fail");
                };
                var partial_arg = /* :: */[
                  partial_arg_000,
                  /* [] */0
                ];
                return Jest.Expect[/* toThrowException */20]([
                            Caml_builtin_exceptions.failure,
                            "fail"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.oneOf(partial_arg, param);
                                }), null));
              }));
        var partial_arg_001 = /* :: */[
          (function (param) {
              return Json_decode.field("x", Json_decode.$$int, param);
            }),
          /* [] */0
        ];
        var partial_arg = /* :: */[
          Json_decode.$$int,
          partial_arg_001
        ];
        return throws(/* None */0, (function (param) {
                      return Json_decode.oneOf(partial_arg, param);
                    }), /* :: */[
                    /* Bool */6,
                    /* :: */[
                      /* Float */0,
                      /* :: */[
                        /* String */2,
                        /* :: */[
                          /* Null */3,
                          /* :: */[
                            /* Array */4,
                            /* :: */[
                              /* Object */5,
                              /* :: */[
                                /* Char */7,
                                /* [] */0
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("either", (function () {
        Jest.test("object with field", (function () {
                return Jest.Expect[/* toEqual */12](2, Jest.Expect[/* expect */0](Json_decode.either(Json_decode.$$int, (function (param) {
                                        return Json_decode.field("x", Json_decode.$$int, param);
                                      }))(Json.parseOrRaise(" { \"x\": 2} "))));
              }));
        Jest.test("int", (function () {
                return Jest.Expect[/* toEqual */12](23, Jest.Expect[/* expect */0](Json_decode.either(Json_decode.$$int, (function (param) {
                                        return Json_decode.field("x", Json_decode.$$int, param);
                                      }))(23)));
              }));
        return throws(/* None */0, Json_decode.either(Json_decode.$$int, (function (param) {
                          return Json_decode.field("x", Json_decode.$$int, param);
                        })), /* :: */[
                    /* Bool */6,
                    /* :: */[
                      /* Float */0,
                      /* :: */[
                        /* String */2,
                        /* :: */[
                          /* Null */3,
                          /* :: */[
                            /* Array */4,
                            /* :: */[
                              /* Object */5,
                              /* :: */[
                                /* Char */7,
                                /* [] */0
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("withDefault", (function () {
        Jest.test("boolean", (function () {
                return Jest.Expect[/* toEqual */12](0, Jest.Expect[/* expect */0](Json_decode.withDefault(0, Json_decode.$$int, Js.true_)));
              }));
        Jest.test("float", (function () {
                return Jest.Expect[/* toEqual */12](0, Jest.Expect[/* expect */0](Json_decode.withDefault(0, Json_decode.$$int, 1.23)));
              }));
        Jest.test("int", (function () {
                return Jest.Expect[/* toEqual */12](23, Jest.Expect[/* expect */0](Json_decode.withDefault(0, Json_decode.$$int, 23)));
              }));
        Jest.test("string", (function () {
                return Jest.Expect[/* toEqual */12](0, Jest.Expect[/* expect */0](Json_decode.withDefault(0, Json_decode.$$int, "test")));
              }));
        Jest.test("null", (function () {
                return Jest.Expect[/* toEqual */12](0, Jest.Expect[/* expect */0](Json_decode.withDefault(0, Json_decode.$$int, null)));
              }));
        Jest.test("array", (function () {
                return Jest.Expect[/* toEqual */12](0, Jest.Expect[/* expect */0](Json_decode.withDefault(0, Json_decode.$$int, /* array */[])));
              }));
        Jest.test("object", (function () {
                return Jest.Expect[/* toEqual */12](0, Jest.Expect[/* expect */0](Json_decode.withDefault(0, Json_decode.$$int, Json_encode.object_(/* [] */0))));
              }));
        return Jest.test("non-DecodeError exceptions in decoder should pass through", (function () {
                      return Jest.Expect[/* toThrowException */20]([
                                  Caml_builtin_exceptions.failure,
                                  "fail"
                                ], Jest.Expect[/* expectFn */1]((function (param) {
                                        return Json_decode.withDefault(4, (function () {
                                                      return Pervasives.failwith("fail");
                                                    }), param);
                                      }), 0));
                    }));
      }));

describe("map", (function () {
        Jest.test("int", (function () {
                return Jest.Expect[/* toEqual */12](25, Jest.Expect[/* expect */0](Json_decode.map((function (param) {
                                      return 2 + param | 0;
                                    }), Json_decode.$$int, 23)));
              }));
        return throws(/* None */0, (function (param) {
                      return Json_decode.map((function (param) {
                                    return 2 + param | 0;
                                  }), Json_decode.$$int, param);
                    }), /* :: */[
                    /* Bool */6,
                    /* :: */[
                      /* Float */0,
                      /* :: */[
                        /* String */2,
                        /* :: */[
                          /* Null */3,
                          /* :: */[
                            /* Array */4,
                            /* :: */[
                              /* Object */5,
                              /* :: */[
                                /* Char */7,
                                /* [] */0
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("andThen", (function () {
        Jest.test("int -> int", (function () {
                return Jest.Expect[/* toEqual */12](23, Jest.Expect[/* expect */0](Json_decode.andThen((function () {
                                      return Json_decode.$$int;
                                    }), Json_decode.$$int, 23)));
              }));
        Jest.test("int -> int andThen float", (function () {
                return Jest.Expect[/* toEqual */12](23, Jest.Expect[/* expect */0](Json_decode.andThen((function () {
                                      return Json_decode.$$float;
                                    }), Json_decode.$$int, 23)));
              }));
        Jest.test("int -> float andThen int", (function () {
                return Jest.Expect[/* toEqual */12](23, Jest.Expect[/* expect */0](Json_decode.andThen((function () {
                                      return Json_decode.$$int;
                                    }), Json_decode.$$float, 23)));
              }));
        throws(/* Some */["int andThen int "], (function (param) {
                return Json_decode.andThen((function () {
                              return Json_decode.$$int;
                            }), Json_decode.$$int, param);
              }), /* :: */[
              /* Bool */6,
              /* :: */[
                /* Float */0,
                /* :: */[
                  /* String */2,
                  /* :: */[
                    /* Null */3,
                    /* :: */[
                      /* Array */4,
                      /* :: */[
                        /* Object */5,
                        /* :: */[
                          /* Char */7,
                          /* [] */0
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ]);
        throws(/* Some */["float andThen int "], (function (param) {
                return Json_decode.andThen((function () {
                              return Json_decode.$$int;
                            }), Json_decode.$$float, param);
              }), /* :: */[
              /* Float */0,
              /* [] */0
            ]);
        return throws(/* Some */["int to "], (function (param) {
                      return Json_decode.andThen((function () {
                                    return Json_decode.$$float;
                                  }), Json_decode.$$int, param);
                    }), /* :: */[
                    /* Float */0,
                    /* [] */0
                  ]);
      }));

describe("composite expressions", (function () {
        Jest.test("dict array array int", (function () {
                return Jest.Expect[/* toEqual */12]({
                            a: /* array */[
                              /* array */[
                                1,
                                2
                              ],
                              /* array */[3]
                            ],
                            b: /* array */[
                              /* array */[4],
                              /* array */[
                                5,
                                6
                              ]
                            ]
                          }, Jest.Expect[/* expect */0](Json_decode.dict((function (param) {
                                      return Json_decode.array((function (param) {
                                                    return Json_decode.array(Json_decode.$$int, param);
                                                  }), param);
                                    }), Json.parseOrRaise(" { \"a\": [[1, 2], [3]], \"b\": [[4], [5, 6]] } "))));
              }));
        Jest.test("dict array array int - heterogenous structure", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected number, got true\n\tin array at index 0\n\tin array at index 1\n\tin dict"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.dict((function (param) {
                                                return Json_decode.array((function (param) {
                                                              return Json_decode.array(Json_decode.$$int, param);
                                                            }), param);
                                              }), param);
                                }), Json.parseOrRaise(" { \"a\": [[1, 2], [true]], \"b\": [[4], [5, 6]] } ")));
              }));
        Jest.test("dict array array int - heterogenous structure 2", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Json_decode.DecodeError,
                            "Expected array, got \"foo\"\n\tin array at index 1\n\tin dict"
                          ], Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.dict((function (param) {
                                                return Json_decode.array((function (param) {
                                                              return Json_decode.array(Json_decode.$$int, param);
                                                            }), param);
                                              }), param);
                                }), Json.parseOrRaise(" { \"a\": [[1, 2], \"foo\"], \"b\": [[4], [5, 6]] } ")));
              }));
        return Jest.test("field", (function () {
                      var json = Json.parseOrRaise(" { \"foo\": [1, 2, 3], \"bar\": \"baz\" } ");
                      return Jest.Expect[/* toEqual */12](/* tuple */[
                                  /* array */[
                                    1,
                                    2,
                                    3
                                  ],
                                  "baz"
                                ], Jest.Expect[/* expect */0](/* tuple */[
                                      Json_decode.field("foo", (function (param) {
                                              return Json_decode.array(Json_decode.$$int, param);
                                            }), json),
                                      Json_decode.field("bar", Json_decode.string, json)
                                    ]));
                    }));
      }));

exports.Test = Test;
/*  Not a pure module */
