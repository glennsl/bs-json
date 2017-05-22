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
    |> Js.Dict.map ((fun v -> f v) [@bs])
    |> Js.Dict.map ((fun v -> encoder v) [@bs])
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


(* complex example *)

type address = {
  city: string;
  state: string
}

type person = {
  id: int;
  name: string;
  age: int option;
  address: address option
}

let parseAddress json: address =
  let open Json.Decode in {
    city = json |> field "city" string;
    state = json |> field "state" string
  }

let parsePerson json: person =
  let open Json.Decode in {
    id = json |> field "id" int;
    name = json |> field "name" string;
    age = json |> optional (field "age" int);
    address = json |> optional (field "address" parseAddress)
  }


let data = "{\"id\":1,\"name\":\"brad\",\"age\":27,\"address\":{\"city\":\"city1\",\"state\":\"state1\"}}"

let _ =
  Js.Json.parseExn data
  |> parsePerson
  |> Js.log