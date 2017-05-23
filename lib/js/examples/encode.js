'use strict';


console.log(JSON.stringify(/* array */[
          "foo",
          "bar"
        ]));

console.log(JSON.stringify(/* array */[
            "foo",
            "bar"
          ].map(function (prim) {
              return prim;
            })));

/*  Not a pure module */
