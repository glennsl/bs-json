type line = {
  start: point;
  end_: point;
  thickness: int option
}
and point = {
  x: float;
  y: float
}

module Decode = struct
  let point =
    let open! Json.Decode in obj (fun {field} -> {
      x = field.required "x" float;
      y = field.required "y" float
    })

  let line =
    Json.Decode.(
      obj (fun {field} -> {
        start     = field.required "start" point;
        end_      = field.required "end" point;
        thickness = field.optional "thickness" int
      })
    )
end

let data = {| {
  "start": { "x": 1.1, "y": -0.4 },
  "end":   { "x": 5.3, "y": 3.8 }
} |}

let _ =
  data |> Json.parseOrRaise
       |> Decode.line
       |> Js.log