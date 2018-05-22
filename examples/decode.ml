(* Decoding a fixed JSON data structure using Json.Decode *)
let mapJsonObjectString f decoder (encoder: int -> Js.Json.t) str =
  let json = Json.parseOrRaise str in
  match Json.Decode.(dict decoder json) with
  | Ok dict ->
    Js.Result.Ok (
      dict |> Js.Dict.map ((fun v -> f v) [@bs])
           |> Js.Dict.map ((fun v -> encoder v) [@bs])
           |> Json.Encode.dict
           |> Json.stringify
    )
  | Error msg -> Error msg

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
  match Json.Decode.(obj (fun ~field -> field.required "x" int) json) with
  | Ok x ->
    Js.log x
  | Error msg ->
    Js.log ("Error:" ^ msg)