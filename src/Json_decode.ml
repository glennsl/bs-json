open Js.Result

external _unsafeCreateUninitializedArray : int -> 'a array = "Array" [@@bs.new]

external _stringify : Js.Json.t -> string = "JSON.stringify" [@@bs.val]

let _isInteger value =
  Js.Float.isFinite value && Js.Math.floor_float value == value
(*
type errorKind =
| MissingField
| IncorrectType
type error = {
  message: string;
  kind: errorKind
}*)
type 'a result = ('a, string) Js.Result.t

type 'a decoder = Js.Json.t -> 'a result

let bool json = 
  if Js.typeof json = "boolean" then
    Ok (Obj.magic (json : Js.Json.t) : bool)
  else
   Error ("Expected boolean, got " ^ _stringify json)

let float json = 
  if Js.typeof json = "number" then
    Ok (Obj.magic (json : Js.Json.t) : float)
  else
    Error ("Expected number, got " ^ _stringify json)

let int json = 
  match float json with
  | Ok f -> if _isInteger f then
      Ok (Obj.magic (f : float) : int)
    else
      Error ("Expected integer, got " ^ _stringify json)
  | Error msg -> Error msg

let string json = 
  if Js.typeof json = "string" then
    Ok (Obj.magic (json : Js.Json.t) : string)
  else
    Error ("Expected string, got " ^ _stringify json)

let char json =
  match string json with
  | Ok s ->
    if String.length s = 1 then
      Ok (String.get s 0)
    else
      Error ("Expected single-character string, got " ^ _stringify json)
  | Error msg -> Error msg

let date json =
  match string json with
  | Ok s      -> Ok (Js.Date.fromString s)
  | Error msg -> Error msg

let nullable decode json =
  if (Obj.magic json : 'a Js.null) == Js.null then
    Ok Js.null
  else
    match decode json with
    | Ok v      -> Ok (Js.Null.return v)
    | Error msg -> Error msg

(* TODO: remove this? *)
let nullAs value json = 
  if (Obj.magic json : 'a Js.null) == Js.null then
    Ok value
  else 
    Error ("Expected null, got " ^ _stringify json)

exception Fail of string

let array decode json = 
  if Js.Array.isArray json then begin
    let source = (Obj.magic (json : Js.Json.t) : Js.Json.t array) in
    let length = Js.Array.length source in
    let target = _unsafeCreateUninitializedArray length in
    try
      for i = 0 to length - 1 do
        match
          decode (Array.unsafe_get source i)
        with
        | Ok value  -> Array.unsafe_set target i value;
        | Error msg -> raise @@ Fail (msg ^ "\n\tin array at index " ^ string_of_int i)
      done;
      Ok target
    with
    | Fail msg -> Error msg
  end
  else
    Error ("Expected array, got " ^ _stringify json)

let list decode json =
  match array decode json with
  | Ok x      -> Ok (Array.to_list x)
  | Error msg -> Error msg

let pair decodeA decodeB json =
  if Js.Array.isArray json then begin
    let source = (Obj.magic (json : Js.Json.t) : Js.Json.t array) in
    let length = Js.Array.length source in
    if length = 2 then
      match
        decodeA (Array.unsafe_get source 0),
        decodeB (Array.unsafe_get source 1)
      with
      | Ok a, Ok b   -> Ok (a, b)
      | Error msg, _
      | _, Error msg -> Error (msg ^ "\n\tin pair/tuple2")
    else
      Error ({j|Expected array of length 2, got array of length $length|j})
  end
  else
    Error ("Expected array, got " ^ _stringify json)

let tuple2 = pair

let tuple3 decodeA decodeB decodeC json =
  if Js.Array.isArray json then begin
    let source = (Obj.magic (json : Js.Json.t) : Js.Json.t array) in
    let length = Js.Array.length source in
    if length = 3 then
      match
        decodeA (Array.unsafe_get source 0),
        decodeB (Array.unsafe_get source 1),
        decodeC (Array.unsafe_get source 2)
      with
      | Ok a, Ok b, Ok c -> Ok (a, b, c)
      | Error msg, _, _
      | _, Error msg, _
      | _, _, Error msg -> Error (msg ^ "\n\tin tuple3")
    else
      Error ({j|Expected array of length 3, got array of length $length|j})
  end
  else
    Error ("Expected array, got " ^ _stringify json)

let tuple4 decodeA decodeB decodeC decodeD json =
  if Js.Array.isArray json then begin
    let source = (Obj.magic (json : Js.Json.t) : Js.Json.t array) in
    let length = Js.Array.length source in
    if length = 4 then
      match
        decodeA (Array.unsafe_get source 0),
        decodeB (Array.unsafe_get source 1),
        decodeC (Array.unsafe_get source 2),
        decodeD (Array.unsafe_get source 3)
      with
      | Ok a, Ok b, Ok c, Ok d -> Ok (a, b, c, d)
      | Error msg, _, _, _
      | _, Error msg, _, _
      | _, _, Error msg, _
      | _, _, _, Error msg -> Error (msg ^ "\n\tin tuple4")
    else
      Error ({j|Expected array of length 4, got array of length $length|j})
  end
  else
    Error ("Expected array, got " ^ _stringify json)

let dict decode json = 
  if Js.typeof json = "object" && 
      not (Js.Array.isArray json) && 
      not ((Obj.magic json : 'a Js.null) == Js.null)
  then begin
    let source = (Obj.magic (json : Js.Json.t) : Js.Json.t Js.Dict.t) in
    let keys = Js.Dict.keys source in
    let l = Js.Array.length keys in
    let target = Js.Dict.empty () in
    try
      for i = 0 to l - 1 do
          let key = (Array.unsafe_get keys i) in
          match
            decode (Js.Dict.unsafeGet source key)
          with
          | Ok value  -> Js.Dict.set target key value
          | Error msg -> raise @@ Fail (msg ^ "\n\tin dict")
      done;
      Ok target
    with
    | Fail msg -> Error msg
  end
  else
    Error ("Expected object, got " ^ _stringify json)

(*
let rec at key_path decoder =
    match key_path with 
      | [key] -> field key decoder
      | first::rest -> field first (at rest decoder) 
      | [] -> raise @@ Invalid_argument ("Expected key_path to contain at least one element")
*)

let optional decode json =
  match decode json with
  | Ok value -> Ok (Some value)
  | Error _  -> Ok None

let oneOf decoders json =
  let rec inner decoders errors =
    match decoders with
    | [] ->
        let revErrors = List.rev errors in
        Error ({j|All decoders given to oneOf failed. Here are all the errors: $revErrors. And the JSON being decoded: |j} ^ _stringify json)
    | decode::rest ->
        match decode json with
        | Ok x    -> Ok x
        | Error e -> inner rest (e :: errors) in
  inner decoders []

let either a b =
  oneOf [a;b]

let withDefault default decode json =
  match decode json with
  | Ok value -> Ok value
  | Error _  -> Ok default

let map f decode json =
  match decode json with
  | Ok value -> Ok (f value)
  | Error msg -> Error msg

let andThen b a json =
  match a json with
  | Ok value -> b value json
  | Error msg -> Error msg

exception FieldDecodeError of string

type field_decoder = {
  optional : 'a. string -> 'a decoder -> 'a option;
  required : 'a. string -> 'a decoder -> 'a
}

let obj builder json =
  if 
    Js.typeof json = "object" && 
    not (Js.Array.isArray json) && 
    not ((Obj.magic json : 'a Js.null) == Js.null)
  then
    begin
      let dict =
        (Obj.magic (json : Js.Json.t) : Js.Json.t Js.Dict.t)
      in

      let optional key decode =
        match Js.Dict.get dict key with
        | Some value -> begin
          match
            decode value
          with
          | Ok v      -> Some v
          | Error msg -> raise (FieldDecodeError (msg ^ "\n\tat field '" ^ key ^ "'"))
          end
        | None -> None
      in

      let required key decode =
        match optional key decode with
        | Some x -> x
        | None -> raise (FieldDecodeError (key ^ " required"))
      in 

      try
        Ok (builder ~field:{ optional; required })
      with
      | FieldDecodeError msg -> Error msg
    end
  else
    Error ("Expected object, got " ^ _stringify json)
