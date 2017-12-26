(** Efficient JSON handling
This module has four aspects to it:
- Parsing, which turns a JSON string into an encoded JSON data structure
- Stringificaiton, which produces a JSON string from an encoded JSON data structure
- Encoding, which is the process of construction a JSON data strcture
- Decoding, which is the process of deconstructing a JSON data structure
{3 Parsing}
{! parse} and {! exnParse} will both (try to) parse a JSON string into a JSON
data structure ({! Js.Json.t}), but behhaves differently when encountering a
parse error. [exnParse] will raise a [SyntaxError], while [parse] will return
a [Js.Json.t result] indicating whether or not the parsing succeeded. There's
not much more to it: [string] in, [Js.Json.t] out.
The parsed result, and encoded JSON data structure, then needs to be decoded to
avtually be usable. See {!section:Decoding} below.
{3 Stringification}
Stringificaiton is the exact reverse of parsing. {! stringify} and {! stringifyAny}
both technically do the same thing, but where [stringifyAny] will take any value
and try to do its best with it, retuning a [string option], [stringify] on the
other handuses the type system to guarantee success, but requires that the data
has been encoded in a JSON data structure first. See {!section:Encoding} below.
{3 Encoding}
Encoding creates a JSON data structure which can stringified directly with
{! stringify} or passed to other APIs requiring a typed JSON data structure. Or
you could just go straight to decoding it again, if that's your thing. ENcoding
functions are in the {! Encode} module.
{3 Decoding}
Decoding is a more complex process, due to the highly dynamic nature of JSON
data structures. There are several ways to decode a JSON data structure,
depending on your needs. This module provides two fairly low level methods
of decoding, the assertive, more convenient but also more rigid {! Decode}
module and the more flexible but cumbersome {! reifyType} and {! test} functions.
The third way is to use a opinionated third-party APIs that makes other tradeoffs.
@example {[
(* Parsing a JSON string using Js.Json.parse *)
open Js.Json
let arrayOfInts str
  match parse str with
  | Ok value ->
    match Decode.(array int value)
    | Ok arr -> arr
    | Error _ -> []
  | Error message -> failWith message
(* prints `[3, 2, 1]` *)
let _ = Js.log \@\@ arrayOfInts "[1, 2, 3]" |> Js.Array.reverse
]}
@example {[
(* Stringifying a value using Js.Json.stringifyAny *)
open Js.Json
(* prints `null` *)
let _ =
  match stringifyAny Js.null with
  | Some str -> Js.log str
  | None -> Js.log "Unable to stringify value"
]}
@example {[
(* Encoding a JSON data structure using Js.Json.Encode *)
open Js.Json
(* prints ["foo", "bar"] *)
let _ =
  [| "foo", "bar" |]
  |> Encode.stringArray
  |> stringify
  |> Js.log
(* prints ["foo", "bar"] *)
let _ =
  [| "foo", "bar" |]
  |> Js.Array.map Encode.int
  |> Encode.jsonArray
  |> stringify
  |> Js.log
]}
@example {[
(* Decoding a fixed JSON data structure using Js.Json.Decode *)
open Js.Json
let mapJsonObjectString f decoder encoder str =
  match parse str with
  | Ok json ->
    match Decode.(dict decoder json) with
    | Ok dict ->
      dict |> Js.Dict.map f
           |> Js.Dict.map encoder
           |> Encode.dict
           |> Js.stringify
    | Error _ -> []
  | Error _ -> []
let sum ns =
  Array.fold_left (+) 0
(* prints `{ "foo": 6, "bar": 24 }` *)
let _ =
  Js.log \@\@
    mapJsonObjectString sun Decode.(array int) Encode.int {|
      {
        "foo": [1, 2, 3],
        "bar": [9, 8, 7]
      }
    |} 
]}
@example {[
(* Decoding a highly dynamic JSON data structure using reifyType *)
open Js.Json
let getIds s =
  let json = 
    try parse s with
    | _ -> failwith "Error parsing JSON string"
  in 
  match reifyType json with
  | (Object, value) ->
    (* In this branch, compiler infer value : t Js.Dict.t *)
    begin match Js.Dict.get value "ids" with
    | Some ids -> 
      begin match reifyType ids with
      | (Array, ids) -> 
        (* In this branch compiler infer ids : t array *)
        ids
      | _ -> failWith "Expected an array"
      end 
    | None -> failWith "Expected an `ids` property"
    end 
  | _ -> failWith "Expected an object"
(* prints `1, 2, 3` *)
let _ =
  Js.log \@\@ getIds {| { "ids" : [1, 2, 3 ] } |} 
]}
@see <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON> MDN
*) 

module Decode = Json_decode
module Encode = Json_encode

exception ParseError of string

val parse: string -> Js.Json.t option
(** [parse s] returns [Some json] if s is a valid json string, [None] otherwise *)

val parseOrRaise: string -> Js.Json.t
(** [parse s] returns a [Js.Json.t] if s is a valid json string, raises [ParseError] otherwise *)

val stringify: Js.Json.t -> string
(** [stringify json] returns the [string] representation of the given [Js.Json.t] value *)