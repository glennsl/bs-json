type line = {
  start: point;
  end_: point;
  thickness: int option
}
and point = {
  x: int;
  y: int
}

module Decode = struct
  let point json =
    Json.Decode.{
      x = json |> field "x" int;
      y = json |> field "y" int
    }

  let line json =
    Json.Decode.{
      start     = json |> field "start" point;
      end_      = json |> field "end" point;
      thickness = json |> optional (field "thickness" int)
    }
end

let data = {| {
  "start": { "x": 1, "y": -4 },
  "end":   { "x": 5, "y": 8 }
} |}

let _ =
  data |> Json.parseOrRaise
       |> Decode.line
       |> Js.log