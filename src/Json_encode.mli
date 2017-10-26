(** Provides functions for encoding a JSON data structure *)

type 'a encoder = 'a -> Js.Json.t
(** The type of a encoder combinator *)

external null : Js.Json.t = "" [@@bs.val]
(** [null] is the singleton null JSON value *)

external string : string -> Js.Json.t = "%identity"
(** [string s] makes a JSON string of the [string] [s] *)

external float : float -> Js.Json.t = "%identity"
(** [float n] makes a JSON number of the [float] [n] *)

external int : int -> Js.Json.t = "%identity"
(** [int n] makes a JSON number of the [int] [n] *)

val boolean : bool -> Js.Json.t
(** [boolean b] makes a JSON boolean of the [boolean] [b] *)

external dict : Js.Json.t Js_dict.t -> Js.Json.t = "%identity"
(** [dict d] makes a JSON objet of the [Js.Dict.t] [d] *)

val object_ : (string * Js.Json.t) list -> Js.Json.t
(** [object_ props] makes a JSON objet of the [props] list of properties *)

external array : Js.Json.t array -> Js.Json.t = "%identity"
(** [array a] makes a JSON array of the [Js.Json.t array] [a] *)

val list : 'a encoder -> 'a list encoder
(** [list encoder l] makes a JSON array of the [list] [l] using the given [encoder] *)

(** The functions below are specialized for specific array type which 
    happened to be already JSON object in the BuckleScript runtime. Therefore
    they are more efficient (constant time rather than linear conversion). *) 

external stringArray : string array -> Js.Json.t = "%identity"
(** [stringArray a] makes a JSON array of the [string array] [a] *) 

external numberArray : float array -> Js.Json.t = "%identity"
(** [numberArray a] makes a JSON array of the [float array] [a] *)

external jsbooleanArray : Js.boolean array -> Js.Json.t = "%identity"

val booleanArray : bool array -> Js.Json.t

(** [booleanArray] makes a JSON array of the [Js.boolean array] [a] *)