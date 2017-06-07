# bs-json

Experimental JSON encode/decode library for BuckleScript.

The Decode module in particular provides a basic set of decoder functions to be composed into more complex decoders. A decoder is a function that takes a `Js.Json.t` and either returns a value of the desired type if successful or raises a `Decode_error` exception if not. Other functions accept a decoder and produce another decoder. Like `array`, which when given a decoder for type `t` will return a decoder that tries to produce a value of type `t array`. So to decode an `int array` you combine `Json.Decode.int` with `Json.Decode.array` into `Json.Decode.(array int)`. An array of arrays of ints? `Json.Deocde.(array (array int))`. Dict containing arrays of ints? `Json.Decode.(dict (array int))`.

## Example

```ml
(* OCaml *)
type line = {
  start: point;
  end_: point;
  thickness: int option
}
and point = {
  x: float;
  y: float
}

module Decode = struct
  let point json =
    let open! Json.Decode in {
      x = json |> field "x" float;
      y = json |> field "y" float
    }

  let line json =
    Json.Decode.{
      start     = json |> field "start" point;
      end_      = json |> field "end" point;
      thickness = json |> optional (field "thickness" int)
    }
end

let data = {| {
  "start": { "x": 1.1, "y": -0.4 },
  "end":   { "x": 5.3, "y": 3.8 }
} |}

let line = data |> Js.Json.parseExn
                |> Decode.line
```

```reason
/* Reason */
type line = {
  start: point,
  end_: point,
  thickness: option int
}
and point = {
  x: float,
  y: float
};

module Decode = {
  let point json =>
    Json.Decode.{
      x: json |> field "x" float,
      y: json |> field "y" float
    };
  
  let line json =>
    Json.Decode.{
      start:     json |> field "start" point,
      end_:      json |> field "end" point,
      thickness: json |> optional (field "thickness" int)
    };
};

let data = {| {
  "start": { "x": 1.1, "y": -0.4 },
  "end":   { "x": 5.3, "y": 3.8 }
} |};

let line = data |> Js.Json.parseExn
                |> Decode.line;
```

See [examples](https://github.com/BuckleTypes/bs-json/blob/master/examples/) for more.

## Installation

```sh
npm install --save buckletypes/bs-json
```

Then add `bs-json` to `bs-dependencies` in your `bsconfig.json`:
```js
{
  ...
  "bs-dependencies": ["bs-json"]
}
```
