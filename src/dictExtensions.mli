(* external entries : 'a t -> (key * 'a) array = "Object.entries" [@@bs.val] *)
val entries : 'a Js.Dict.t -> (Js.Dict.key * 'a) array
(** [entries dict] returns the key value pairs in [dict] (ES2017) *)

(* external values : 'a t -> 'a array = "Object.values" [@@bs.val] *)
val values : 'a Js.Dict.t -> 'a array
(** [entries dict] returns the values in [dict] (ES2017) *)

val fromList : (Js.Dict.key * 'a) list -> 'a Js.Dict.t
(** [fromList entries] creates a new dictionary using with containing each
[(key, value)] pair in [entries] *)

val fromArray : (Js.Dict.key * 'a) array -> 'a Js.Dict.t
(** [fromArray entries] creates a new dictionary using with containing each
[(key, value)] pair in [entries] *)

val map : ('a -> 'b) -> 'a Js.Dict.t -> 'b Js.Dict.t
(** [map f dict] maps [dict] to a new dictionary with the same keys,
using [f] to map each value *)