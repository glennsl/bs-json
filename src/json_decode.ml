external isInteger : float -> bool = "Number.isInteger" [@@bs.val]

type 'a decoder = Js.Json.t -> 'a

exception Decode_error of string

let boolean json = 
  if Js.typeof json = "boolean" then
    (Obj.magic (json : Js.Json.t) : Js.boolean)
  else
    raise @@ Decode_error ("Expected boolean, got " ^ Js.Json.stringify json)

let float json = 
  if Js.typeof json = "number" then
    (Obj.magic (json : Js.Json.t) : float)
  else
    raise @@ Decode_error ("Expected number, got " ^ Js.Json.stringify json)

let int json = 
  let f = float json in
  if isInteger f then
    (Obj.magic (f : float) : int)
  else
    raise @@ Decode_error ("Expected integer, got " ^ Js.Json.stringify json)

let string json = 
  if Js.typeof json = "string" then
    (Obj.magic (json : Js.Json.t) : string)
  else
    raise @@ Decode_error ("Expected string, got " ^ Js.Json.stringify json)

let nullable decode json =
  if (Obj.magic json : 'a Js.null) == Js.null then
    Js.null
  else
    let value = decode json in
    Js.Null.return value

(* TODO: remove this? *)
let nullAs value json = 
  if (Obj.magic json : 'a Js.null) == Js.null then
    value
  else 
    raise @@ Decode_error ("Expected null, got " ^ Js.Json.stringify json)

let array decode json = 
  if Js.Array.isArray json then begin
    let source = (Obj.magic (json : Js.Json.t) : Js.Json.t array) in
    let l = Js.Array.length source in
    let target = Array.make l (Obj.magic 0) in
    for i = 0 to l do
      let value = decode (Array.unsafe_get source i) in
      Array.set target i value;
    done;
    target
  end
  else
    raise @@ Decode_error ("Expected array, got " ^ Js.Json.stringify json)

let dict decode json = 
  if Js.typeof json = "object" && 
      not (Js.Array.isArray json) && 
      not ((Obj.magic json : 'a Js.null) == Js.null)
  then begin
    let source = (Obj.magic (json : Js.Json.t) : Js.Json.t Js.Dict.t) in
    let keys = Js.Dict.keys source in
    let l = Js.Array.length keys in
    let target = Js.Dict.empty () in
    for i = 0 to l do
        let key = (Array.unsafe_get keys i) in
        let value = decode (Js.Dict.unsafeGet source key) in
        Js.Dict.set target key value;
    done;
    target
  end
  else
    raise @@ Decode_error ("Expected object, got " ^ Js.Json.stringify json)

let field key decode json =
  if Js.typeof json = "object" && 
      not (Js.Array.isArray json) && 
      not ((Obj.magic json : 'a Js.null) == Js.null)
  then begin
    let dict = (Obj.magic (json : Js.Json.t) : Js.Json.t Js.Dict.t) in
    match Js.Dict.get dict key with
    | Some value -> decode value
    | None -> raise @@ Decode_error ("Expected field '" ^ key ^ "'")
  end
  else
    raise @@ Decode_error ("Expected object, got " ^ Js.Json.stringify json)

let optional decode json =
  try
    Some (decode json)
  with
  | Decode_error _ -> None