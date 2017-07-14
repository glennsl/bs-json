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

(* Advanced example: encode a record *)
type line = {
  start: point;
  end_: point;
  thickness: int option
}
and point = {
  x: float;
  y: float
}

module Encode = struct
  let point r =
    let open! Json.Encode in (
      object_ [
        ("x", float r.x);
        ("y", float r.y)
      ]
    )
  let line r =
    Json.Encode.(
      object_ [
        ("start", point r.start);
        ("end", point r.end_);
        ("thickness", match r.thickness with Some x -> int x | None -> null)
      ]
    )
end

let data = {
  start = { x = 1.1; y = -0.4 };
  end_ = { x = 5.3; y = 3.8 };
  thickness = Some 2
}

let _ =
  data
  |> Encode.line
  |> Js.log