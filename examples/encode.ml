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

(* prints { x: 42, foo: 'bar' } *)
let _ =
  Json.Encode.(
    object_ [
      ("x", int 42);
      ("foo", string "bar")
    ]
    |> Js.log
  )