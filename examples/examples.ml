open Result

(* Parsing a JSON string using Js.Json.parse *)
let arrayOfInts str =
  let json = Js.Json.parseExn str in
  Json.Decode.(array int json)

(* prints `[3, 2, 1]` *)
let _ = Js.log (arrayOfInts "[1, 2, 3]" |> Js.Array.reverseInPlace)


(* Encoding a JSON data structure using Json.Encode *)

(* prints ["foo", "bar"] *)
let _ =
  [| "foo"; "bar" |]
  |> Json.Encode.stringArray
  |> Js.Json.stringify
  |> Js.log

(* prints ["foo", "bar"] *)
let _ =
  [| "foo"; "bar" |]
  |> Js.Array.map Json.Encode.string
  |> Json.Encode.array
  |> Js.Json.stringify
  |> Js.log


(* Decoding a fixed JSON data structure using Json.Decode *)
let mapJsonObjectString f decoder (encoder: int -> Js.Json.t) str =
  let json = Js.Json.parseExn str in
  Json.Decode.(dict decoder json)
    |> DictExtensions.map f
    |> DictExtensions.map encoder
    |> Json.Encode.object_
    |> Js.Json.stringify

let sum =
  Array.fold_left (+) 0

(* prints `{ "foo": 6, "bar": 24 }` *)
let _ =
  Js.log @@
    (mapJsonObjectString sum Json.Decode.(array int) Json.Encode.int {|
      {
        "foo": [1, 2, 3],
        "bar": [9, 8, 7]
      }
    |})

