(* Parsing a JSON string using Json.parseOrRaise *)

let arrayOfInts str =
  let json = Json.parseOrRaise str in
  Json.Decode.(array int json)

(* prints `[3, 2, 1]` *)
let _ =
  match arrayOfInts "[1, 2, 3]" with
  | Ok arr ->
    arr |> Js.Array.reverseInPlace
        |> Js.log
  | Error msg ->
    Js.log msg