(** Provides a set of low level combinator primitives to decode Js.Json.t data
structures
A decoder combinator will return an [('a, string) result] where [Ok of 'a]
indicates that the decoding succeeded and should contain the decoded value.
[Error of string] indicates the decoding failed and should contain a [string]
message explaining why.
Decoders are designed to be combined to produce more complex decoders that can
decode arbitrary data structures, though the emphasis for this library is for
it to be {i possible} to decode any given data structure, not necessarily for
it to be {i convenient}. For convenience you should look towards opinionated
third-party libraries.
*)

type 'a decoder = Js.Json.t -> 'a
(** The type of a decoder combinator *)

val boolean : Js.boolean decoder
(** Decodes a JSON value into a [Js.boolean]
    
{b Returns} [Ok of Js.boolean] if the JSON value is a boolean, [Error of string] otherwise.
@example {[
  open Json
  let _ =
  (* prints [Ok Js.true_] *)
  Js.log \@\@ Js.Json.parseExn "true" |> Decode.boolean
  (* prints [Ok Js.false_] *)
  Js.log \@\@ Js.Json.parseExn "true" |> Decode.boolean
  (* prints [Error ...] *)
  Js.log \@\@ Js.Json.parseExn "123" |> Decode.boolean
  (* prints [Error ...] *)
  Js.log \@\@ Js.Json.parseExn "null" |> Decode.boolean
]}
*)

val bool : bool decoder
(** Decodes a JSON value into a [bool]
    
{b Returns} [Ok of bool] if the JSON value is a boolean, [Error of string] otherwise.
@example {[
  open Json
  let _ =
  (* prints [Ok true] *)
  Js.log \@\@ Js.Json.parseExn "true" |> Decode.bool
  (* prints [Ok false] *)
  Js.log \@\@ Js.Json.parseExn "true" |> Decode.bool
  (* prints [Error ...] *)
  Js.log \@\@ Js.Json.parseExn "123" |> Decode.bool
  (* prints [Error ...] *)
  Js.log \@\@ Js.Json.parseExn "null" |> Decode.bool
]}
*)

val float : float decoder
(** Decodes a JSON value into a [float]
    
{b Returns} [Ok of float] if the JSON value is a number, [Error of string] otherwise.
@example {[
  open Json
  let _ =
  (* prints [Ok 1.23] *)
  Js.log \@\@ Js.Json.parseExn "1.23" |> Decode.float
  (* prints [Ok 23.] *)
  Js.log \@\@ Js.Json.parseExn "23" |> Decode.float
  (* prints [Error ...] *)
  Js.log \@\@ Js.Json.parseExn "true" |> Decode.float
  (* prints [Error ...] *)
  Js.log \@\@ Js.Json.parseExn "null" |> Decode.float
]}
*)

val int : int decoder
(** Decodes a JSON value into an [int]
    
{b Returns} [Ok of int] if the JSON value is an integer, [Error of string] otherwise.
@example {[
  open Json
  let _ =
  (* prints [Ok 23] *)
  Js.log \@\@ Js.Json.parseExn "23" |> Decode.int
  (* prints [Error ...] *)
  Js.log \@\@ Js.Json.parseExn "1.23" |> Decode.int
  (* prints [Error ...] *)
  Js.log \@\@ Js.Json.parseExn "true" |> Decode.int
  (* prints [Error ...] *)
  Js.log \@\@ Js.Json.parseExn "null" |> Decode.int
]}
*)

val string : string decoder
(** Decodes a JSON value into a [string]
    
{b Returns} [Ok of string] if the JSON value is a string, [Error of string] otherwise.
@example {[
  open Json
  let _ =
  (* prints [Ok "foo"] *)
  Js.log \@\@ Js.Json.parseExn "\"foo\"" |> Decode.string
  (* prints [Error ...] *)
  Js.log \@\@ Js.Json.parseExn "1.23" |> Decode.string
  (* prints [Error ...] *)
  Js.log \@\@ Js.Json.parseExn "null" |> Decode.string
]}
*)

val nullable : 'a decoder -> 'a Js.null decoder
(** Decodes a JSON value into an ['a Js.null]
    
{b Returns} [Ok Js.null] if the JSON value is [null], [Ok of 'a Js.null] if the
given decoder succeeds, [Error of string] otherwise.
@example {[
  open Json
  let _ =
  (* prints [Ok (Js.Null.return 23)] *)
  Js.log \@\@ Js.Json.parseExn "23" |> Decode.(nullable int)
  (* prints [Error ...] *)
  Js.log \@\@ Js.Json.parseExn "1.23" |> Decode.(nullable int)
  (* prints [Ok Js.null] *)
  Js.log \@\@ Js.Json.parseExn "null" |> Decode.(nullable int)
]}
*)

val nullAs : 'a -> 'a decoder
(** Returns the given value if the JSON value is [null]
    
{b Returns} [Ok of 'a] if the JSON value is [null], [Error of string] otherwise.
@example {[
  open Json
  let _ =
  (* prints [Error ...] *)
  Js.log \@\@ Js.Json.parseExn "\"x\"" |> Decode.nullAs "x"
  (* prints [Ok "x"] *)
  Js.log \@\@ Js.Json.parseExn "null" |> Decode.nullAs "x"
  (* prints [Ok None] *)
  Js.log \@\@ Js.Json.parseExn "null" |> Decode.nullAs None
]}
*)

val array : 'a decoder -> 'a array decoder
(** Decodes a JSON array into an ['a array] using the given decoder on each array element
    
{b Returns} [Ok of 'a array] if the JSON value is a JSON array and all its
elements are successfully decoded, [Error of string] otherwise.
@example {[
  open Json
  let _ =
  (* prints [Ok [| 1; 2; 3 |]] *)
  Js.log \@\@ Js.Json.parseExn "[1, 2, 3]" |> Decode.(array int)
  (* prints [Error ...] *)
  Js.log \@\@ Js.Json.parseExn "[1, 2, "c"]" |> Decode.(array int)
  (* prints [Error ...] *)
  Js.log \@\@ Js.Json.parseExn "123" |> Decode.(array int)
  (* prints [Ok None] *)
  Js.log \@\@ Js.Json.parseExn "null" |> Decode.(array int)
]}
*)

val dict : 'a decoder -> 'a Js.Dict.t decoder
(** Decodes a JSON object into a dict using the given decoder on each of its values
    
{b Returns} [Ok of 'a Js.Dict.t] if the JSON value is a JSON object and all its
values are successfully decoded, [Error of string] otherwise.
@example {[
  open Json
  let _ =
  (* prints [Ok (Js.Dict.fromList [("x", 23); ("y", 42)])] *)
  Js.log \@\@ Js.Json.parseExn {| { "x": 23, "y": 42 } |} |> Decode.(dict int)
  (* prints [Error ...] *)
  Js.log \@\@ Js.Json.parseExn {| { "x": 23, "y": "b" } |} |> Decode.(dict int)
  (* prints [Error ...] *)
  Js.log \@\@ Js.Json.parseExn "123" |> Decode.(dict int)
  (* prints [Ok None] *)
  Js.log \@\@ Js.Json.parseExn "null" |> Decode.(dict int)
]}
*)

val field : string -> 'a decoder -> 'a decoder
(** Decodes a JSON object with a specific field into the value of that field
    
{b Returns} [Ok of 'a] if the JSON value is a JSON object with the given field
and a value that is successfully decoded with the given decoder, [Error of string] otherwise.
@example {[
  open Json
  let _ =
  (* prints [Ok 23] *)
  Js.log \@\@ Js.Json.parseExn {| { "x": 23, "y": 42 } |} |> Decode.(field "x" int)
  (* prints [Ok 23] *)
  Js.log \@\@ Js.Json.parseExn {| { "x": 23, "y": "b" } |} |> Decode.(field "x" int)
  (* prints [Error ...] *)
  Js.log \@\@ Js.Json.parseExn {| { "x": 23, "y": "b" } |} |> Decode.(field "y" int)
  (* prints [Error ...] *)
  Js.log \@\@ Js.Json.parseExn "123" |> Decode.(field "x" int)
  (* prints [Ok None] *)
  Js.log \@\@ Js.Json.parseExn "null" |> Decode.(field "x" int)
]}
*)

val optional : 'a decoder -> 'a option decoder
(** Maps a decoder [result] to an option wrapped in an [Ok] result
    
{b Returns} [Ok (Some of 'a)] if the given decoder is successful, [Ok None] if
it is not.
This decoder will never return an [Error]. Its purpose is to transform [Error]s
of a given decoder into [Ok]s by mapping its [result] into an [option] and then
returning that wrapped in an [Ok]. This prevents a decoder error from terminating
a composite decoder, and is useful to decode optional JSON object fields.
@example {[
  open Json
  let _ =
  (* prints [Ok (Some 23)] *)
  Js.log \@\@ Js.Json.parseExn "23" |> Decode.(optional int)
  (* prints [Ok None] *)
  Js.log \@\@ Js.Json.parseExn 1.23 |> Decode.(optional int)
  (* prints [Ok None] *)
  Js.log \@\@ Js.Json.parseExn "null" |> Decode.(optional int)
  (* prints [Ok (Some 23)] *)
  Js.log \@\@ Js.Json.parseExn {| { "x": 23, "y": "b" } |} |> Decode.(optional (field "x" int))
  (* prints [Ok None] *)
  Js.log \@\@ Js.Json.parseExn {| { "x": 23, "y": "b" } |} |> Decode.(optional (field "y" int))
  (* prints [Ok None] *)
  Js.log \@\@ Js.Json.parseExn {| { "x": 23, "y": "b" } |} |> Decode.(optional (field "z" int))
  (* prints [Ok (Some 23)] *)
  Js.log \@\@ Js.Json.parseExn {| { "x": 23, "y": "b" } |} |> Decode.(field "x" (optional int))
  (* prints [Ok None] *)
  Js.log \@\@ Js.Json.parseExn {| { "x": 23, "y": "b" } |} |> Decode.(field "y" (optional int))
  (* prints [Error ...] *)
  Js.log \@\@ Js.Json.parseExn {| { "x": 23, "y": "b" } |} |> Decode.(field "z" (optional int))
]}
*)

val oneOf : 'a decoder list -> 'a decoder
(** Tries each [decoder] in order, retunring the result of the first that succeeds

{b Returns} [Ok of 'a] if one of the decoders succeed, [Error of string] otherwise.
@example {[
  open Json
  let _ =
  (* prints [Ok 23] *)
  Js.log \@\@ Js.Json.parseExn "23" |> Decode.(oneOf [int; field "x" int])
  (* prints [Ok 42] *)
  Js.log \@\@ Js.Json.parseExn {| { "x": 42 } |}  |> Decode.(oneOf [int; field "x" int])
  (* prints [Error _] *)
  Js.log \@\@ Js.Json.parseExn "null" |> Decode.(oneOf [int; field "x" int]
]}
*)

val either : 'a decoder -> 'a decoder -> 'a decoder
(** Tries each [decoder] in order, retunring the result of the first that succeeds

{b Returns} [Ok of 'a] if one of the decoders succeed, [Error of string] otherwise.
@example {[
  open Json
  let _ =
  (* prints [Ok 23] *)
  Js.log \@\@ Js.Json.parseExn "23" |> Decode.(either int (field "x" int))
  (* prints [Ok 42] *)
  Js.log \@\@ Js.Json.parseExn {| { "x": 42 } |}  |> Decode.(either int (field "x" int))
  (* prints [Error _] *)
  Js.log \@\@ Js.Json.parseExn "null" |> Decode.(either int (field "x" int))
]}
*)

val withDefault : 'a -> 'a decoder -> 'a decoder
(** Tries each [decoder] in order, retunring the result of the first that succeeds

{b Returns} [Ok of 'a] if one of the decoders succeed, [Error of string] otherwise.
@example {[
  open Json
  let _ =
  (* prints [Ok 23] *)
  Js.log \@\@ Js.Json.parseExn "23"" |> Decode.withDefault 0 int
  (* prints [Ok 0] *)
  Js.log \@\@ Js.Json.parseExn "\"x\"" |> Decode.withDefault 0 int
  (* prints [Ok 0] *)
  Js.log \@\@ Js.Json.parseExn "null" |> Decode.withDefault 0 int
]}
*)