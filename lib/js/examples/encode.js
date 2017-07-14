'use strict';

var Json_encode = require("../src/json_encode.js");

console.log(JSON.stringify(/* array */[
          "foo",
          "bar"
        ]));

console.log(JSON.stringify(/* array */[
            "foo",
            "bar"
          ].map((function (prim) {
                return prim;
              }))));

console.log(Json_encode.object_(/* :: */[
          /* tuple */[
            "x",
            42
          ],
          /* :: */[
            /* tuple */[
              "foo",
              "bar"
            ],
            /* [] */0
          ]
        ]));

/*  Not a pure module */
