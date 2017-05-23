(* Parsing a JSON string using Js.Json.parse *)

let arrayOfInts str =
  let json = Js.Json.parseExn str in
  Json.Decode.(array int json)

(* prints `[3, 2, 1]` *)
let _ = Js.log (arrayOfInts "[1, 2, 3]" |> Js.Array.reverseInPlace)