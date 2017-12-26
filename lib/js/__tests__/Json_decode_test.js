'use strict';

var Jest        = require("bs-jest/lib/js/src/jest.js");
var Json        = require("../src/Json.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var Pervasives  = require("bs-platform/lib/js/pervasives.js");
var Json_decode = require("../src/Json_decode.js");
var Json_encode = require("../src/Json_encode.js");

function test(decoder, prefix, param) {
  switch (param) {
    case 0 : 
        return Jest.test(prefix + "float", (function () {
                      return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1](decoder, 1.23));
                    }));
    case 1 : 
        return Jest.test(prefix + "int", (function () {
                      return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1](decoder, 23));
                    }));
    case 2 : 
        return Jest.test(prefix + "string", (function () {
                      return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1](decoder, "test"));
                    }));
    case 3 : 
        return Jest.test(prefix + "null", (function () {
                      return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1](decoder, null));
                    }));
    case 4 : 
        return Jest.test(prefix + "array", (function () {
                      return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1](decoder, /* array */[]));
                    }));
    case 5 : 
        return Jest.test(prefix + "object", (function () {
                      return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1](decoder, Json_encode.object_(/* [] */0)));
                    }));
    case 6 : 
        return Jest.test(prefix + "boolean", (function () {
                      return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1](decoder, true));
                    }));
    
  }
}

function throws(_$staropt$star, decoder, _param) {
  while(true) {
    var param = _param;
    var $staropt$star = _$staropt$star;
    var prefix = $staropt$star ? $staropt$star[0] : "";
    if (param) {
      test(decoder, prefix, param[0]);
      _param = param[1];
      _$staropt$star = /* Some */[prefix];
      continue ;
      
    } else {
      return /* () */0;
    }
  };
}

var Test = /* module */[
  /* test */test,
  /* throws */throws
];

describe("boolean", (function () {
        Jest.test("boolean", (function () {
                return Jest.Expect[/* toEqual */12](true)(Jest.Expect[/* expect */0](Json_decode.$$boolean(true)));
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
                              /* [] */0
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("bool", (function () {
        Jest.test("bool", (function () {
                return Jest.Expect[/* toEqual */12](/* true */1)(Jest.Expect[/* expect */0](Json_decode.bool(true)));
              }));
        Jest.test("bool - false", (function () {
                return Jest.Expect[/* toEqual */12](/* false */0)(Jest.Expect[/* expect */0](Json_decode.bool(false)));
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
                              /* [] */0
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("float", (function () {
        Jest.test("float", (function () {
                return Jest.Expect[/* toEqual */12](1.23)(Jest.Expect[/* expect */0](Json_decode.$$float(1.23)));
              }));
        Jest.test("int", (function () {
                return Jest.Expect[/* toEqual */12](23)(Jest.Expect[/* expect */0](Json_decode.$$float(23)));
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
                            /* [] */0
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("int", (function () {
        Jest.test("int", (function () {
                return Jest.Expect[/* toEqual */12](23)(Jest.Expect[/* expect */0](Json_decode.$$int(23)));
              }));
        Jest.test("int > 32-bit", (function () {
                var big_int = (2147483648);
                return Jest.Expect[/* toEqual */12](big_int)(Jest.Expect[/* expect */0](Json_decode.$$int(big_int)));
              }));
        Jest.test("infinity", (function () {
                var inf = (Infinity);
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1](Json_decode.$$int, inf));
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
                              /* [] */0
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("string", (function () {
        Jest.test("string", (function () {
                return Jest.Expect[/* toEqual */12]("test")(Jest.Expect[/* expect */0](Json_decode.string("test")));
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
                return Jest.Expect[/* toEqual */12](new Date("2012-04-23T18:25:43.511Z"))(Jest.Expect[/* expect */0](Json_decode.date("2012-04-23T18:25:43.511Z")));
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

describe("nullable", (function () {
        Jest.test("int -> int", (function () {
                return Jest.Expect[/* toEqual */12](23)(Jest.Expect[/* expect */0](Json_decode.nullable(Json_decode.$$int, 23)));
              }));
        Jest.test("null -> int", (function () {
                return Jest.Expect[/* toEqual */12](null)(Jest.Expect[/* expect */0](Json_decode.nullable(Json_decode.$$int, null)));
              }));
        Jest.test("boolean -> boolean ", (function () {
                return Jest.Expect[/* toEqual */12](true)(Jest.Expect[/* expect */0](Json_decode.nullable(Json_decode.$$boolean, true)));
              }));
        Jest.test("float -> float", (function () {
                return Jest.Expect[/* toEqual */12](1.23)(Jest.Expect[/* expect */0](Json_decode.nullable(Json_decode.$$float, 1.23)));
              }));
        Jest.test("string -> string", (function () {
                return Jest.Expect[/* toEqual */12]("test")(Jest.Expect[/* expect */0](Json_decode.nullable(Json_decode.string, "test")));
              }));
        Jest.test("null -> null", (function () {
                var partial_arg = null;
                return Jest.Expect[/* toEqual */12](null)(Jest.Expect[/* expect */0](Json_decode.nullable((function (param) {
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
                      /* [] */0
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
                return Jest.Expect[/* toEqual */12](0)(Jest.Expect[/* expect */0](Json_decode.nullAs(0, null)));
              }));
        Jest.test("as Js.null", (function () {
                return Jest.Expect[/* toEqual */12](null)(Jest.Expect[/* expect */0](Json_decode.nullAs(null, null)));
              }));
        Jest.test("as None", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0)(Jest.Expect[/* expect */0](Json_decode.nullAs(/* None */0, null)));
              }));
        Jest.test("as Some _", (function () {
                return Jest.Expect[/* toEqual */12](/* Some */["foo"])(Jest.Expect[/* expect */0](Json_decode.nullAs(/* Some */["foo"], null)));
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
                              /* [] */0
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("array", (function () {
        Jest.test("array", (function () {
                return Jest.Expect[/* toEqual */12](/* int array */[])(Jest.Expect[/* expect */0](Json_decode.array(Json_decode.$$int, /* array */[])));
              }));
        Jest.test("array boolean", (function () {
                return Jest.Expect[/* toEqual */12](/* array */[
                              true,
                              false,
                              true
                            ])(Jest.Expect[/* expect */0](Json_decode.array(Json_decode.$$boolean, Json.parseOrRaise(" [true, false, true] "))));
              }));
        Jest.test("array float", (function () {
                return Jest.Expect[/* toEqual */12](/* float array */[
                              1,
                              2,
                              3
                            ])(Jest.Expect[/* expect */0](Json_decode.array(Json_decode.$$float, Json.parseOrRaise(" [1, 2, 3] "))));
              }));
        Jest.test("array int", (function () {
                return Jest.Expect[/* toEqual */12](/* int array */[
                              1,
                              2,
                              3
                            ])(Jest.Expect[/* expect */0](Json_decode.array(Json_decode.$$int, Json.parseOrRaise(" [1, 2, 3] "))));
              }));
        Jest.test("array string", (function () {
                return Jest.Expect[/* toEqual */12](/* array */[
                              "a",
                              "b",
                              "c"
                            ])(Jest.Expect[/* expect */0](Json_decode.array(Json_decode.string, Json.parseOrRaise(" [\"a\", \"b\", \"c\"] "))));
              }));
        Jest.test("array nullAs", (function () {
                var partial_arg = null;
                return Jest.Expect[/* toEqual */12](/* array */[
                              null,
                              null,
                              null
                            ])(Jest.Expect[/* expect */0](Json_decode.array((function (param) {
                                      return Json_decode.nullAs(partial_arg, param);
                                    }), Json.parseOrRaise(" [null, null, null] "))));
              }));
        Jest.test("array int -> array boolean", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.array(Json_decode.$$boolean, param);
                                }), Json.parseOrRaise(" [1, 2, 3] ")));
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
                              /* [] */0
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("list", (function () {
        Jest.test("array", (function () {
                return Jest.Expect[/* toEqual */12](/* [] */0)(Jest.Expect[/* expect */0](Json_decode.list(Json_decode.$$int, /* array */[])));
              }));
        Jest.test("list boolean", (function () {
                return Jest.Expect[/* toEqual */12](/* :: */[
                              true,
                              /* :: */[
                                false,
                                /* :: */[
                                  true,
                                  /* [] */0
                                ]
                              ]
                            ])(Jest.Expect[/* expect */0](Json_decode.list(Json_decode.$$boolean, Json.parseOrRaise(" [true, false, true] "))));
              }));
        Jest.test("list float", (function () {
                return Jest.Expect[/* toEqual */12](/* :: */[
                              1,
                              /* :: */[
                                2,
                                /* :: */[
                                  3,
                                  /* [] */0
                                ]
                              ]
                            ])(Jest.Expect[/* expect */0](Json_decode.list(Json_decode.$$float, Json.parseOrRaise(" [1, 2, 3] "))));
              }));
        Jest.test("list int", (function () {
                return Jest.Expect[/* toEqual */12](/* :: */[
                              1,
                              /* :: */[
                                2,
                                /* :: */[
                                  3,
                                  /* [] */0
                                ]
                              ]
                            ])(Jest.Expect[/* expect */0](Json_decode.list(Json_decode.$$int, Json.parseOrRaise(" [1, 2, 3] "))));
              }));
        Jest.test("list string", (function () {
                return Jest.Expect[/* toEqual */12](/* :: */[
                              "a",
                              /* :: */[
                                "b",
                                /* :: */[
                                  "c",
                                  /* [] */0
                                ]
                              ]
                            ])(Jest.Expect[/* expect */0](Json_decode.list(Json_decode.string, Json.parseOrRaise(" [\"a\", \"b\", \"c\"] "))));
              }));
        Jest.test("list nullAs", (function () {
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
                            ])(Jest.Expect[/* expect */0](Json_decode.list((function (param) {
                                      return Json_decode.nullAs(partial_arg, param);
                                    }), Json.parseOrRaise(" [null, null, null] "))));
              }));
        Jest.test("array int -> list boolean", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.list(Json_decode.$$boolean, param);
                                }), Json.parseOrRaise(" [1, 2, 3] ")));
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
                              /* [] */0
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
                            ])(Jest.Expect[/* expect */0](Json_decode.pair(Json_decode.string, Json_decode.$$int, Json.parseOrRaise(" [\"a\", 3] "))));
              }));
        Jest.test("int int", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                              4,
                              3
                            ])(Jest.Expect[/* expect */0](Json_decode.pair(Json_decode.$$int, Json_decode.$$int, Json.parseOrRaise(" [4, 3] "))));
              }));
        Jest.test("too small", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.pair(Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" [4] ")));
              }));
        Jest.test("too large", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.pair(Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" [3, 4, 5] ")));
              }));
        Jest.test("bad type a", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.pair(Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" [\"3\", 4] ")));
              }));
        Jest.test("bad type b", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.pair(Json_decode.string, Json_decode.string, param);
                                }), Json.parseOrRaise(" [\"3\", 4] ")));
              }));
        return Jest.test("not array", (function () {
                      return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                        return Json_decode.pair(Json_decode.$$int, Json_decode.$$int, param);
                                      }), Json.parseOrRaise(" 4 ")));
                    }));
      }));

describe("tuple2", (function () {
        Jest.test("heterogenous", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                              "a",
                              3
                            ])(Jest.Expect[/* expect */0](Json_decode.tuple2(Json_decode.string, Json_decode.$$int, Json.parseOrRaise(" [\"a\", 3] "))));
              }));
        Jest.test("too small", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.tuple2(Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" [4] ")));
              }));
        Jest.test("too large", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.tuple2(Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" [3, 4, 5] ")));
              }));
        Jest.test("bad type a", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.tuple2(Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" [\"3\", 4] ")));
              }));
        Jest.test("bad type b", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.tuple2(Json_decode.string, Json_decode.string, param);
                                }), Json.parseOrRaise(" [\"3\", 4] ")));
              }));
        return Jest.test("not array", (function () {
                      return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                        return Json_decode.tuple2(Json_decode.$$int, Json_decode.$$int, param);
                                      }), Json.parseOrRaise(" 4 ")));
                    }));
      }));

describe("tuple3", (function () {
        Jest.test("heterogenous", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                              "a",
                              3,
                              4.5
                            ])(Jest.Expect[/* expect */0](Json_decode.tuple3(Json_decode.string, Json_decode.$$int, Json_decode.$$float, Json.parseOrRaise(" [\"a\", 3, 4.5] "))));
              }));
        Jest.test("too small", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.tuple3(Json_decode.$$int, Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" [4] ")));
              }));
        Jest.test("too large", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.tuple3(Json_decode.$$int, Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" [3, 4, 5, 6, 7] ")));
              }));
        Jest.test("bad type a", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.tuple3(Json_decode.$$int, Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" [\"3\", 4, 5] ")));
              }));
        Jest.test("bad type b", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.tuple3(Json_decode.string, Json_decode.string, Json_decode.string, param);
                                }), Json.parseOrRaise(" [\"3\", 4, \"5\"] ")));
              }));
        return Jest.test("not array", (function () {
                      return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                        return Json_decode.tuple3(Json_decode.$$int, Json_decode.$$int, Json_decode.$$int, param);
                                      }), Json.parseOrRaise(" 4 ")));
                    }));
      }));

describe("tuple4", (function () {
        Jest.test("heterogenous", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                              "a",
                              3,
                              4.5,
                              /* true */1
                            ])(Jest.Expect[/* expect */0](Json_decode.tuple4(Json_decode.string, Json_decode.$$int, Json_decode.$$float, Json_decode.bool, Json.parseOrRaise(" [\"a\", 3, 4.5, true] "))));
              }));
        Jest.test("too small", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.tuple4(Json_decode.$$int, Json_decode.$$int, Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" [4] ")));
              }));
        Jest.test("too large", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.tuple4(Json_decode.$$int, Json_decode.$$int, Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" [3, 4, 5, 6, 7, 8] ")));
              }));
        Jest.test("bad type a", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.tuple4(Json_decode.$$int, Json_decode.$$int, Json_decode.$$int, Json_decode.$$int, param);
                                }), Json.parseOrRaise(" [\"3\", 4, 5, 6] ")));
              }));
        Jest.test("bad type b", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.tuple4(Json_decode.string, Json_decode.string, Json_decode.string, Json_decode.string, param);
                                }), Json.parseOrRaise(" [\"3\", 4, \"5\", \"6\"] ")));
              }));
        return Jest.test("not array", (function () {
                      return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                        return Json_decode.tuple4(Json_decode.$$int, Json_decode.$$int, Json_decode.$$int, Json_decode.$$int, param);
                                      }), Json.parseOrRaise(" 4 ")));
                    }));
      }));

describe("dict", (function () {
        Jest.test("object", (function () {
                return Jest.Expect[/* toEqual */12]({ })(Jest.Expect[/* expect */0](Json_decode.dict(Json_decode.$$int, Json_encode.object_(/* [] */0))));
              }));
        Jest.test("dict boolean", (function () {
                return Jest.Expect[/* toEqual */12]({
                              a: true,
                              b: false
                            })(Jest.Expect[/* expect */0](Json_decode.dict(Json_decode.$$boolean, Json.parseOrRaise(" { \"a\": true, \"b\": false } "))));
              }));
        Jest.test("dict float", (function () {
                return Jest.Expect[/* toEqual */12]({
                              a: 1.2,
                              b: 2.3
                            })(Jest.Expect[/* expect */0](Json_decode.dict(Json_decode.$$float, Json.parseOrRaise(" { \"a\": 1.2, \"b\": 2.3 } "))));
              }));
        Jest.test("dict int", (function () {
                return Jest.Expect[/* toEqual */12]({
                              a: 1,
                              b: 2
                            })(Jest.Expect[/* expect */0](Json_decode.dict(Json_decode.$$int, Json.parseOrRaise(" { \"a\": 1, \"b\": 2 } "))));
              }));
        Jest.test("dict string", (function () {
                return Jest.Expect[/* toEqual */12]({
                              a: "x",
                              b: "y"
                            })(Jest.Expect[/* expect */0](Json_decode.dict(Json_decode.string, Json.parseOrRaise(" { \"a\": \"x\", \"b\": \"y\" } "))));
              }));
        Jest.test("dict nullAs", (function () {
                var partial_arg = null;
                return Jest.Expect[/* toEqual */12]({
                              a: null,
                              b: null
                            })(Jest.Expect[/* expect */0](Json_decode.dict((function (param) {
                                      return Json_decode.nullAs(partial_arg, param);
                                    }), Json.parseOrRaise(" { \"a\": null, \"b\": null } "))));
              }));
        Jest.test("dict null -> dict string", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.dict(Json_decode.string, param);
                                }), Json.parseOrRaise(" { \"a\": null, \"b\": null } ")));
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
                              /* [] */0
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("field", (function () {
        Jest.test("field boolean", (function () {
                return Jest.Expect[/* toEqual */12](false)(Jest.Expect[/* expect */0](Json_decode.field("b", Json_decode.$$boolean, Json.parseOrRaise(" { \"a\": true, \"b\": false } "))));
              }));
        Jest.test("field float", (function () {
                return Jest.Expect[/* toEqual */12](2.3)(Jest.Expect[/* expect */0](Json_decode.field("b", Json_decode.$$float, Json.parseOrRaise(" { \"a\": 1.2, \"b\": 2.3 } "))));
              }));
        Jest.test("field int", (function () {
                return Jest.Expect[/* toEqual */12](2)(Jest.Expect[/* expect */0](Json_decode.field("b", Json_decode.$$int, Json.parseOrRaise(" { \"a\": 1, \"b\": 2 } "))));
              }));
        Jest.test("field string", (function () {
                return Jest.Expect[/* toEqual */12]("y")(Jest.Expect[/* expect */0](Json_decode.field("b", Json_decode.string, Json.parseOrRaise(" { \"a\": \"x\", \"b\": \"y\" } "))));
              }));
        Jest.test("field nullAs", (function () {
                var partial_arg = null;
                return Jest.Expect[/* toEqual */12](null)(Jest.Expect[/* expect */0](Json_decode.field("b", (function (param) {
                                      return Json_decode.nullAs(partial_arg, param);
                                    }), Json.parseOrRaise(" { \"a\": null, \"b\": null } "))));
              }));
        Jest.test("field null -> field string", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.field("b", Json_decode.string, param);
                                }), Json.parseOrRaise(" { \"a\": null, \"b\": null } ")));
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
                                /* [] */0
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("at", (function () {
        Jest.test("at boolean", (function () {
                return Jest.Expect[/* toEqual */12](false)(Jest.Expect[/* expect */0](Curry._1(Json_decode.at(/* :: */[
                                        "a",
                                        /* :: */[
                                          "x",
                                          /* :: */[
                                            "y",
                                            /* [] */0
                                          ]
                                        ]
                                      ], Json_decode.$$boolean), Json.parseOrRaise(" {\n        \"a\": { \"x\" : { \"y\" : false } }, \n        \"b\": false \n      } "))));
              }));
        Jest.test("field nullAs", (function () {
                var partial_arg = null;
                return Jest.Expect[/* toEqual */12](null)(Jest.Expect[/* expect */0](Curry._1(Json_decode.at(/* :: */[
                                        "a",
                                        /* :: */[
                                          "x",
                                          /* [] */0
                                        ]
                                      ], (function (param) {
                                          return Json_decode.nullAs(partial_arg, param);
                                        })), Json.parseOrRaise(" {\n        \"a\": { \"x\" : null }, \n        \"b\": null \n      } "))));
              }));
        Jest.test("missing key", (function () {
                var partial_arg = null;
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1](Json_decode.at(/* :: */[
                                    "a",
                                    /* :: */[
                                      "y",
                                      /* [] */0
                                    ]
                                  ], (function (param) {
                                      return Json_decode.nullAs(partial_arg, param);
                                    })), Json.parseOrRaise(" {\n        \"a\": { \"x\" : null }, \n        \"b\": null \n      } ")));
              }));
        Jest.test("empty list of keys should raise Invalid_argument", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
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
                                /* [] */0
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
                return Jest.Expect[/* toEqual */12](/* None */0)(Jest.Expect[/* expect */0](Json_decode.optional(Json_decode.$$int, true)));
              }));
        Jest.test("float -> int", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0)(Jest.Expect[/* expect */0](Json_decode.optional(Json_decode.$$int, 1.23)));
              }));
        Jest.test("int -> int", (function () {
                return Jest.Expect[/* toEqual */12](/* Some */[23])(Jest.Expect[/* expect */0](Json_decode.optional(Json_decode.$$int, 23)));
              }));
        Jest.test("string -> int", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0)(Jest.Expect[/* expect */0](Json_decode.optional(Json_decode.$$int, "test")));
              }));
        Jest.test("null -> int", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0)(Jest.Expect[/* expect */0](Json_decode.optional(Json_decode.$$int, null)));
              }));
        Jest.test("array -> int", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0)(Jest.Expect[/* expect */0](Json_decode.optional(Json_decode.$$int, /* array */[])));
              }));
        Jest.test("object -> int", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0)(Jest.Expect[/* expect */0](Json_decode.optional(Json_decode.$$int, Json_encode.object_(/* [] */0))));
              }));
        Jest.test("boolean -> boolean ", (function () {
                return Jest.Expect[/* toEqual */12](/* Some */[true])(Jest.Expect[/* expect */0](Json_decode.optional(Json_decode.$$boolean, true)));
              }));
        Jest.test("float -> float", (function () {
                return Jest.Expect[/* toEqual */12](/* Some */[1.23])(Jest.Expect[/* expect */0](Json_decode.optional(Json_decode.$$float, 1.23)));
              }));
        Jest.test("string -> string", (function () {
                return Jest.Expect[/* toEqual */12](/* Some */["test"])(Jest.Expect[/* expect */0](Json_decode.optional(Json_decode.string, "test")));
              }));
        Jest.test("null -> null", (function () {
                var partial_arg = null;
                return Jest.Expect[/* toEqual */12](/* Some */[null])(Jest.Expect[/* expect */0](Json_decode.optional((function (param) {
                                      return Json_decode.nullAs(partial_arg, param);
                                    }), null)));
              }));
        Jest.test("int -> boolean", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0)(Jest.Expect[/* expect */0](Json_decode.optional(Json_decode.$$boolean, 1)));
              }));
        Jest.test("optional field", (function () {
                return Jest.Expect[/* toEqual */12](/* Some */[2])(Jest.Expect[/* expect */0](Json_decode.optional((function (param) {
                                      return Json_decode.field("x", Json_decode.$$int, param);
                                    }), Json.parseOrRaise(" { \"x\": 2} "))));
              }));
        Jest.test("optional field - incorrect type", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0)(Jest.Expect[/* expect */0](Json_decode.optional((function (param) {
                                      return Json_decode.field("x", Json_decode.$$int, param);
                                    }), Json.parseOrRaise(" { \"x\": 2.3} "))));
              }));
        Jest.test("optional field - no such field", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0)(Jest.Expect[/* expect */0](Json_decode.optional((function (param) {
                                      return Json_decode.field("y", Json_decode.$$int, param);
                                    }), Json.parseOrRaise(" { \"x\": 2} "))));
              }));
        Jest.test("field optional", (function () {
                return Jest.Expect[/* toEqual */12](/* Some */[2])(Jest.Expect[/* expect */0](Json_decode.field("x", (function (param) {
                                      return Json_decode.optional(Json_decode.$$int, param);
                                    }), Json.parseOrRaise(" { \"x\": 2} "))));
              }));
        Jest.test("field optional - incorrect type", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0)(Jest.Expect[/* expect */0](Json_decode.field("x", (function (param) {
                                      return Json_decode.optional(Json_decode.$$int, param);
                                    }), Json.parseOrRaise(" { \"x\": 2.3} "))));
              }));
        Jest.test("field optional - no such field", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.field("y", (function (param) {
                                                return Json_decode.optional(Json_decode.$$int, param);
                                              }), param);
                                }), Json.parseOrRaise(" { \"x\": 2} ")));
              }));
        return Jest.test("non-DecodeError exceptions in decoder should pass through", (function () {
                      return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                        return Json_decode.optional((function () {
                                                      return Pervasives.failwith("fail");
                                                    }), param);
                                      }), null));
                    }));
      }));

describe("oneOf", (function () {
        Jest.test("object with field", (function () {
                return Jest.Expect[/* toEqual */12](2)(Jest.Expect[/* expect */0](Json_decode.oneOf(/* :: */[
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
                return Jest.Expect[/* toEqual */12](23)(Jest.Expect[/* expect */0](Json_decode.oneOf(/* :: */[
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
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
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
                              /* [] */0
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("either", (function () {
        Jest.test("object with field", (function () {
                return Jest.Expect[/* toEqual */12](2)(Jest.Expect[/* expect */0](Json_decode.either(Json_decode.$$int, (function (param) {
                                        return Json_decode.field("x", Json_decode.$$int, param);
                                      }))(Json.parseOrRaise(" { \"x\": 2} "))));
              }));
        Jest.test("int", (function () {
                return Jest.Expect[/* toEqual */12](23)(Jest.Expect[/* expect */0](Json_decode.either(Json_decode.$$int, (function (param) {
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
                              /* [] */0
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("withDefault", (function () {
        Jest.test("boolean", (function () {
                return Jest.Expect[/* toEqual */12](0)(Jest.Expect[/* expect */0](Json_decode.withDefault(0, Json_decode.$$int, true)));
              }));
        Jest.test("float", (function () {
                return Jest.Expect[/* toEqual */12](0)(Jest.Expect[/* expect */0](Json_decode.withDefault(0, Json_decode.$$int, 1.23)));
              }));
        Jest.test("int", (function () {
                return Jest.Expect[/* toEqual */12](23)(Jest.Expect[/* expect */0](Json_decode.withDefault(0, Json_decode.$$int, 23)));
              }));
        Jest.test("string", (function () {
                return Jest.Expect[/* toEqual */12](0)(Jest.Expect[/* expect */0](Json_decode.withDefault(0, Json_decode.$$int, "test")));
              }));
        Jest.test("null", (function () {
                return Jest.Expect[/* toEqual */12](0)(Jest.Expect[/* expect */0](Json_decode.withDefault(0, Json_decode.$$int, null)));
              }));
        Jest.test("array", (function () {
                return Jest.Expect[/* toEqual */12](0)(Jest.Expect[/* expect */0](Json_decode.withDefault(0, Json_decode.$$int, /* array */[])));
              }));
        Jest.test("object", (function () {
                return Jest.Expect[/* toEqual */12](0)(Jest.Expect[/* expect */0](Json_decode.withDefault(0, Json_decode.$$int, Json_encode.object_(/* [] */0))));
              }));
        return Jest.test("non-DecodeError exceptions in decoder should pass through", (function () {
                      return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                        return Json_decode.withDefault(4, (function () {
                                                      return Pervasives.failwith("fail");
                                                    }), param);
                                      }), 0));
                    }));
      }));

describe("map", (function () {
        Jest.test("int", (function () {
                return Jest.Expect[/* toEqual */12](25)(Jest.Expect[/* expect */0](Json_decode.map((function (param) {
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
                              /* [] */0
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("andThen", (function () {
        Jest.test("int -> int", (function () {
                return Jest.Expect[/* toEqual */12](23)(Jest.Expect[/* expect */0](Json_decode.andThen((function () {
                                      return Json_decode.$$int;
                                    }), Json_decode.$$int, 23)));
              }));
        Jest.test("int -> int andThen float", (function () {
                return Jest.Expect[/* toEqual */12](23)(Jest.Expect[/* expect */0](Json_decode.andThen((function () {
                                      return Json_decode.$$float;
                                    }), Json_decode.$$int, 23)));
              }));
        Jest.test("int -> float andThen int", (function () {
                return Jest.Expect[/* toEqual */12](23)(Jest.Expect[/* expect */0](Json_decode.andThen((function () {
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
                        /* [] */0
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
                            })(Jest.Expect[/* expect */0](Json_decode.dict((function (param) {
                                      return Json_decode.array((function (param) {
                                                    return Json_decode.array(Json_decode.$$int, param);
                                                  }), param);
                                    }), Json.parseOrRaise(" { \"a\": [[1, 2], [3]], \"b\": [[4], [5, 6]] } "))));
              }));
        Jest.test("dict array array int - heterogenous structure", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Json_decode.dict((function (param) {
                                                return Json_decode.array((function (param) {
                                                              return Json_decode.array(Json_decode.$$int, param);
                                                            }), param);
                                              }), param);
                                }), Json.parseOrRaise(" { \"a\": [[1, 2], [true]], \"b\": [[4], [5, 6]] } ")));
              }));
        Jest.test("dict array array int - heterogenous structure 2", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
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
                                    /* int array */[
                                      1,
                                      2,
                                      3
                                    ],
                                    "baz"
                                  ])(Jest.Expect[/* expect */0](/* tuple */[
                                      Json_decode.field("foo", (function (param) {
                                              return Json_decode.array(Json_decode.$$int, param);
                                            }), json),
                                      Json_decode.field("bar", Json_decode.string, json)
                                    ]));
                    }));
      }));

exports.Test = Test;
/*  Not a pure module */
