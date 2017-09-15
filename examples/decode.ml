(* Decoding a fixed JSON data structure using Json.Decode *)

let mapJsonObjectString f decoder (encoder: int -> Js.Json.t) str =
  let json = Js.Json.parseExn str in
  Json.Decode.(dict decoder json)
    |> Js.Dict.map ((fun v -> f v) [@bs])
    |> Js.Dict.map ((fun v -> encoder v) [@bs])
    |> Json.Encode.dict
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
