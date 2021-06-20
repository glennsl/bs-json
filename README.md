# bs-json

Compositional JSON encode/decode library for BuckleScript.

[![npm](https://img.shields.io/npm/v/@glennsl/bs-json.svg)](https://npmjs.org/@glennsl/bs-json)
[![Travis](https://img.shields.io/travis/glennsl/bs-json/master.svg)](https://travis-ci.org/glennsl/bs-json)
[![Coveralls](https://img.shields.io/coveralls/glennsl/bs-json/master.svg)](https://coveralls.io/github/glennsl/bs-json?branch=master)
[![Issues](https://img.shields.io/github/issues/glennsl/bs-json.svg)](https://github.com/glennsl/bs-json/issues)
[![Last Commit](https://img.shields.io/github/last-commit/glennsl/bs-json.svg)](https://github.com/glennsl/bs-json/commits/master)

The Decode module in particular provides a basic set of decoder functions to be composed into more complex decoders. A
decoder is a function that takes a `Js.Json.t` and either returns a value of the desired type if successful or raises a
`DecodeError` exception if not. Other functions accept a decoder and produce another decoder. Like `array`, which when
given a decoder for type `t` will return a decoder that tries to produce a value of type `t array`. So to decode an
`int array` you combine `Json.Decode.int` with `Json.Decode.array` into `Json.Decode.(array int)`. An array of arrays of
ints? `Json.Decode.(array (array int))`. Dict containing arrays of ints? `Json.Decode.(dict (array int))`.

## Example

```reason
type line = {
  start: point,
  end_: point,
  thickness: option(int)
}
and point = {
  x: int,
  y: int
};

module Decode = {
  let point = json =>
    Json.Decode.{
      x: json |> field("x", int),
      y: json |> field("y", int)
    };

  let line = json =>
    Json.Decode.{
      start:     json |> field("start", point),
      end_:      json |> field("end", point),
      thickness: json |> optional(field("thickness", int))
    };
};

let data = {| {
  "start": { "x": 1, "y": -4 },
  "end":   { "x": 5, "y": 8 }
} |};

let line = data |> Json.parseOrRaise
                |> Decode.line;
```

NOTE: `Json.Decode.{ ... }` creates an ordinary record, but also opens the `Json.Decode` module locally, within the
scope delimited by the curly braces, so we don't have to qualify the functions we use from it, like `field`, `int` and
`optional` here. You can also use `Json.Decode.( ... )` to open the module locally within the parentheses, if you're not
creating a record.

See [examples](https://github.com/glennsl/bs-json/blob/master/examples/) for more.

## Installation

```sh
npm install --save @glennsl/bs-json
```

Then add `@glennsl/bs-json` to `bs-dependencies` in your `bsconfig.json`:
```js
{
  ...
  "bs-dependencies": ["@glennsl/bs-json"]
}
```

## Documentation

### API

For the moment, please see the interface files:

* [Json](https://github.com/glennsl/bs-json/blob/master/src/Json.mli)
* [Json.Encode](https://github.com/glennsl/bs-json/blob/master/src/Json_encode.mli)
* [Json.Decode](https://github.com/glennsl/bs-json/blob/master/src/Json_decode.mli)

### Writing custom decoders and encoders

If you look at the type signature of `Json.Decode.array`, for example, you'll see it takes an `'a decoder` and returns an
`'a array decoder`. `'a decoder` is just an alias for `Js.Json.t -> 'a`, so if we expand the type signature of `array`
we'll get `(Js.Json.t -> 'a) -> Js.Json.t -> 'a array`. We can now see that it is a function that takes a decoder and
returns a function, itself a decoder. Applying the `int` decoder to `array` will give us an `int array decoder`, a
function `Js.Json.t -> int array`.

If you've written a function that takes just `Js.Json.t` and returns user-defined types of your own, you've already been
writing composable decoders! Let's look at `Decode.point` from the example above:

```reason
let point = json => {
  open! Json.Decode;
  {
    x: json |> field("x", int),
    y: json |> field("y", int)
  };
};
```

This is a function `Js.Json.t -> point`, or a `point decoder`. So if we'd like to decode an array of points, we can just
pass it to `Json.Decode.array` to get a `point array decoder` in return.

#### Builders

To write a decoder _builder_ like `Json.Decode.array` we need to take another decoder as an argument, and thanks to
currying we just need to apply it where we'd otherwise use a fixed decoder. Say we want to be able to decode both
`int point`s and `float point`s. First we'd have to parameterize the type:

```reason
type point('a) = {
  x: 'a,
  y: 'a
}
```

Then we can change our `point` function from above to take and use a decoder argument:

```reason
let point = (decodeNumber, json) => {
  open! Json.Decode;
  {
    x: json |> field("x", decodeNumber),
    y: json |> field("y", decodeNumber)
  };
};
```

And if we wish we can now create aliases for each variant:

```reason
let intPoint = point(Json.Decode.int);
let floatPoint = point(Json.Decode.float);
```

#### Encoders

Encoders work exactly the same way, just in reverse. `'a encoder` is just an alias for `'a -> Js.Json.t`, and this also
transfers to composition: `'a encoder -> 'a array encoder` expands to `('a -> Js.Json.t) -> 'a array -> Js.Json.t`.

## License

This work is dual-licensed under LGPL 3.0 and MPL 2.0.
You can choose between one of them if you use this work.

Please see LICENSE.LGPL-3.0 and LICENSE.MPL-2.0 for the full text of each license.

`SPDX-License-Identifier: LGPL-3.0 OR MPL-2.0`

## Changes

### 5.0.4
* Rewrote `Encode.list` to be stack-safe and much faster.

### 5.0.2
* Added `Json.Decode.id`

### 5.0.1
* Dual licensed as LGPL-3.0 and MPL-2.0. MPL is mostly equivalent to LGPL but relaxes its restriction on linking, which works better with the JavaScript packaging and distribution model.

### 5.0.0
* Removed deprecated `arrayOf` encoder
* Renamed `dict` encoder to `jsonDict`
* Added new `dict` encoder that takes an additional encoder argument used to encode the contained values, and so it's consistent with the respective `dict` decoder.

### 4.0.0
* Bumped `bs-platform` peer dependency to 5.0.4 to stop the compiler's complaining.

### 3.0.0
* Replace usage of `Js.Date.toJSON` with `Js.Date.toJSONUsafe`, which is exactly the same, just to avoid deprecation warnings for end users (Thanks Bob!)
* Requires `bs-platform` >= 4.0.2

### 2.0.0
* Removed `Json.Decode.boolean`, `Json.Encode.boolean`, `Json.Encode.booleanArray`
* Requires `bs-platform` >= 3.0.0

### 1.3.1
* Reverted commits that broke backwards compatibility despite only affecting the implementation

### 1.3.0
* Deprecated `Json.Decode.boolean`, `Json.Encode.boolean`, `Json.Encode.booleanArray`
* Added `Json.Encode.boolArray`

### 1.2.0
* Added `Json.Encode.char` and `Json.Decode.char`

### 1.1.0
* Added "stack traces" to higher-order decoders, making it easier to find the location of an error.

### 1.0.1
* Moved repository from `reasonml-community/bs-json` to `glennsl/bs-json`
* Renamed NPM package from `bs-json` to `@glennsl/bs-json`

### 1.0.0
* Replaced `Json.Encoder.array` with `Json.Encode.arrayOf` renamed to `array`. Deprecated `arrayOf` alias.
* Added `Json.parse`, `Json.parseOrRaise`, `Json.stringify`
* Added `date` encoder and decoder
* Added `tuple2`/`tuple3`/`tuple4` encoders and decoders
* Fixed bug where js integers > 32-bit were rejected as integers by Json.Decode.int (#15)

### 0.2.4
* Added `Json.Encode.bool`
* Added `Json.Encode.pair`
* Added `Json.Encode.withDefault`
* Added `Json.Encode.nullable`
* Added `Json.Encode.arrayOf`
* Added `Json.Encode.jsonArray` as replacement for `Json.Encode.array`
* Deprecated `Json.Encode.array`

### 0.2.3
* Fixed embarrassing bug where an API was used that isn't available on IE (honestly more embarrassed on behalf of IE though)

### 0.2.2
* Added `Json.Decode.pair`

### 0.2.1
* Added `Json.Encode.list`

### 0.2.0
* Breaking: Renamed `Json.Encode.object_` to `Json.Encode.dict`
* Added `Json.Encode.object_` taking a list of properties instead of a Json.Dict.t as before
