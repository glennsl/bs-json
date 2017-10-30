type 'a encoder = 'a -> Js.Json.t

external null : Js.Json.t = "" [@@bs.val]
external string : string -> Js.Json.t = "%identity"
external float : float -> Js.Json.t = "%identity"
external int : int -> Js.Json.t = "%identity"
external jsboolean : Js.boolean -> Js.Json.t = "%identity" 
external dict : Js.Json.t Js_dict.t -> Js.Json.t = "%identity"

let object_ props: Js.Json.t =
  props |> Js.Dict.fromList
        |> dict

let boolean b = b |> Js.Boolean.to_js_boolean |> jsboolean

external array : Js.Json.t array -> Js.Json.t = "%identity"
let list encode l =
  l |> List.map encode
    |> Array.of_list
    |> array

external stringArray : string array -> Js.Json.t = "%identity"
external numberArray : float array -> Js.Json.t = "%identity"

external jsbooleanArray : Js.boolean array -> Js.Json.t = "%identity"

let booleanArray arr = arr |> Array.map Js.Boolean.to_js_boolean |> jsbooleanArray