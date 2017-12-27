open Jest
open Expect
open Json

let _ =

describe "parse" (fun () ->
  test "success" (fun () ->
    expect @@
      parse "null"
      |> toEqual (Some Encode.null));

  test "error" (fun () ->
    expect @@
      parse "{"
      |> toEqual None);
);

describe "parseOrRaise" (fun () ->
  test "success" (fun () ->
    expect @@
      parseOrRaise "null"
      |> toEqual Encode.null);

  test "error" (fun () ->
    expectFn
      parseOrRaise "{"
      |> toThrowException (ParseError "Unexpected end of JSON input"));
);

test "stringify" (fun () ->
  expect @@
    stringify Encode.null
    |> toEqual "null");