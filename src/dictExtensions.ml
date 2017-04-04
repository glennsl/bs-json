open Js.Dict

(* external entries : 'a t -> (key * 'a) array = "Object.entries" [@@bs.val] (* ES2017 *) *)
let entries dict =
  let keys = keys dict in
  let l = Js.Array.length keys in
  let values = Obj.magic (Array.make l 0) in
  for i = 0 to l - 1 do
    let key = Array.unsafe_get keys i in
    Array.set values i (key, unsafeGet dict key)
  done;
  values

(* external values : 'a t -> 'a array = "Object.values" [@@bs.val] (* ES2017 *) *)
let values dict =
  let keys = keys dict in
  let l = Js.Array.length keys in
  let values = Obj.magic (Array.make l 0) in
  for i = 0 to l - 1 do
    Array.set values i (unsafeGet dict (Array.unsafe_get keys i))
  done;
  values

let fromList entries =
  let dict = empty () in
  let rec loop = function
  | [] -> dict
  | (key, value) :: rest ->
    set dict key value;
    loop rest
  in
  loop entries

let fromArray entries =
  let dict = empty () in
  let l = Js_array.length entries in
  for i = 0 to l - 1 do
    let (key, value) = Array.unsafe_get entries i in
    set dict key value
  done;
  dict

let map f source =
  let target = empty () in
  let keys = keys source in
  let l = Js.Array.length keys in
  for i = 0 to l - 1 do
    let key = Array.unsafe_get keys i in
    set target key (f @@ unsafeGet source key)
  done;
  target