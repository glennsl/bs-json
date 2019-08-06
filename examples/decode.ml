(* Decoding a fixed JSON data structure using Json.Decode *)
let mapJsonObjectString f decoder (encoder: int -> Js.Json.t) str =
  let json = Json.parseOrRaise str in
  Json.Decode.(dict decoder json)
    |> Js.Dict.map ((fun v -> f v) [@bs])
    |> Json.Encode.dict encoder
    |> Json.stringify

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

(* Error handling *)
let _ =
  let json = {|{ "y": 42 } |} |> Json.parseOrRaise in
  match Json.Decode.(field "x" int json) with
  | x ->
    Js.log x
  | exception Json.Decode.DecodeError msg ->
    Js.log ("Error:" ^ msg)