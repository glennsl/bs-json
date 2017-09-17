external isInteger : float -> bool = "Number.isInteger" [@@bs.val]
external unsafeCreateUninitializedArray : int -> 'a array = "Array" [@@bs.new]

type 'a decoder = Js.Json.t -> 'a

exception DecodeError of string

let boolean json = 
  if Js.typeof json = "boolean" then
    (Obj.magic (json : Js.Json.t) : Js.boolean)
  else
    raise @@ DecodeError ("Expected boolean, got " ^ Js.Json.stringify json)

let bool json = 
  boolean json |> Js.to_bool

let float json = 
  if Js.typeof json = "number" then
    (Obj.magic (json : Js.Json.t) : float)
  else
    raise @@ DecodeError ("Expected number, got " ^ Js.Json.stringify json)

let int json = 
  let f = float json in
  if isInteger f then
    (Obj.magic (f : float) : int)
  else
    raise @@ DecodeError ("Expected integer, got " ^ Js.Json.stringify json)

let string json = 
  if Js.typeof json = "string" then
    (Obj.magic (json : Js.Json.t) : string)
  else
    raise @@ DecodeError ("Expected string, got " ^ Js.Json.stringify json)

let nullable decode json =
  if (Obj.magic json : 'a Js.null) == Js.null then
    Js.null
  else
    Js.Null.return (decode json)

(* TODO: remove this? *)
let nullAs value json = 
  if (Obj.magic json : 'a Js.null) == Js.null then
    value
  else 
    raise @@ DecodeError ("Expected null, got " ^ Js.Json.stringify json)

let array decode json = 
  if Js.Array.isArray json then begin
    let source = (Obj.magic (json : Js.Json.t) : Js.Json.t array) in
    let l = Js.Array.length source in
    let target = unsafeCreateUninitializedArray l in
    for i = 0 to l - 1 do
      let value = decode (Array.unsafe_get source i) in
      Array.unsafe_set target i value;
    done;
    target
  end
  else
    raise @@ DecodeError ("Expected array, got " ^ Js.Json.stringify json)

let list decode json =
  json |> array decode |> Array.to_list

let pair left right json =
  if Js.Array.isArray json then begin
    let source = (Obj.magic (json : Js.Json.t) : Js.Json.t array) in
    let l = Js.Array.length source in
    if l = 2 then
      (left (Array.unsafe_get source 0), right (Array.unsafe_get source 1))
    else
      raise @@ DecodeError ("Expected array of length 2, got array of length " ^ string_of_int l)
  end
  else
    raise @@ DecodeError ("Expected array, got " ^ Js.Json.stringify json)

let dict decode json = 
  if Js.typeof json = "object" && 
      not (Js.Array.isArray json) && 
      not ((Obj.magic json : 'a Js.null) == Js.null)
  then begin
    let source = (Obj.magic (json : Js.Json.t) : Js.Json.t Js.Dict.t) in
    let keys = Js.Dict.keys source in
    let l = Js.Array.length keys in
    let target = Js.Dict.empty () in
    for i = 0 to l - 1 do
        let key = (Array.unsafe_get keys i) in
        let value = decode (Js.Dict.unsafeGet source key) in
        Js.Dict.set target key value;
    done;
    target
  end
  else
    raise @@ DecodeError ("Expected object, got " ^ Js.Json.stringify json)

let field key decode json =
  if Js.typeof json = "object" && 
      not (Js.Array.isArray json) && 
      not ((Obj.magic json : 'a Js.null) == Js.null)
  then begin
    let dict = (Obj.magic (json : Js.Json.t) : Js.Json.t Js.Dict.t) in
    match Js.Dict.get dict key with
    | Some value -> decode value
    | None -> raise @@ DecodeError ("Expected field '" ^ key ^ "'")
  end
  else
    raise @@ DecodeError ("Expected object, got " ^ Js.Json.stringify json)

let rec at key_path decoder =
    match key_path with 
      | [key] -> field key decoder
      | first::rest -> field first (at rest decoder) 
      | [] -> raise @@ Invalid_argument ("Expected key_path to contain at least one element")

let optional decode json =
  match decode json with
  | exception DecodeError _ -> None
  | v -> Some v

let rec oneOf decoders json =
  match decoders with
  | [] -> raise @@ DecodeError ("Expected oneOf " ^ string_of_int (List.length decoders) ^ ", got " ^ Js.Json.stringify json)
  | decode :: rest ->
    match decode json with
    | v -> v
    | exception _ -> oneOf rest json

let either a b =
  oneOf [a;b]

let withDefault default decode json =
  match decode json with
  | v -> v
  | exception _ -> default

let map f decode json =
  f (decode json)

let andThen b a json=
  b (a json) json
