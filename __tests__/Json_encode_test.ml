open Jest
open Expect
open! Json.Encode


let _ =

test "null" (fun () ->
  expect
    null
    |> toEqual @@ Obj.magic Js.null);

test "string" (fun () ->
  expect @@
    string "foo"
    |> toEqual @@ Obj.magic "foo");

test "float" (fun () ->
  expect @@
    float 1.23
    |> toEqual @@ Obj.magic 1.23);

test "int" (fun () ->
  expect @@
    int 23
    |> toEqual @@ Obj.magic 23);

test "boolean" (fun () ->
  expect @@
    boolean true
    |> toEqual @@ Obj.magic true);

test "bool" (fun () ->
  expect @@
    bool true
    |> toEqual @@ Obj.magic true);

test "date" (fun () ->
  expect @@
    date (Js.Date.fromString "2012-04-23T18:25:43.511Z")
    |> toEqual @@ Obj.magic "2012-04-23T18:25:43.511Z");

test "char" (fun () ->
  expect @@
    char 'a'
    |> toEqual @@ Obj.magic "a");

test "dict - empty" (fun () ->
  expect @@
    dict @@ Js.Dict.empty ()
    |> toEqual @@ Obj.magic @@ Js.Dict.empty ());

test "dict - simple" (fun () ->
  let o = Js.Dict.empty () in
  Js.Dict.set o "x" (int 42);

  expect @@
    dict o
    |> toEqual @@ Obj.magic o);

test "object_ - empty" (fun () ->
  expect @@
    object_ @@ []
    |> toEqual @@ Obj.magic @@ Js.Dict.empty ());

test "object_ - simple" (fun () ->
  expect @@
    object_ [("x", int 42)]
    |> toEqual @@ Obj.magic (Js.Dict.fromList [("x", 42)]));

test "array int" (fun () ->
  expect @@
    array int [|1;2;3|]
    |> toEqual @@ Obj.magic [|1;2;3|]);

test "list int" (fun () ->
  expect @@
    list int [1;2;3]
    |> toEqual @@ Obj.magic [|1;2;3|]);

test "jsonArray int" (fun () ->
  expect @@
    jsonArray ([|1;2;3|] |> Array.map int)
    |> toEqual @@ Obj.magic [|1;2;3|]);

test "stringArray" (fun () ->
  expect @@
    stringArray [|"a";"b"|] 
    |> toEqual @@ Obj.magic [|"a";"b"|]);

test "numberArray" (fun () ->
  expect @@
    numberArray [|0.;4.|]
    |> toEqual @@ Obj.magic [|0;4|]);

test "booleanArray" (fun () ->
  expect @@
    booleanArray [|true;false|]
    |> toEqual @@ Obj.magic [|true;false|]);


test "nullable (None)" (fun () -> 
  expect @@
    nullable string None
    |> toEqual @@ null
);

test "nullable (Some)" (fun () -> 
  expect @@
    nullable string (Some "success")
    |> toEqual @@ string "success"
);

test "withDefault (None)" (fun () ->
  expect @@
    withDefault (string "default") string None
    |> toEqual @@ string "default"
);

test "withDefault (Some)" (fun () ->
  expect @@
    withDefault (string "default") string (Some "success")
    |> toEqual @@ string "success"
);

test "pair" (fun () -> 
  expect @@
    pair string float ("hello", 1.2)
    |> toEqual @@ jsonArray [|string "hello"; float 1.2|]
);

test "tuple2" (fun () -> 
  expect @@
    tuple2 string float ("hello", 1.2)
    |> toEqual @@ jsonArray [|string "hello"; float 1.2|]
);

test "tuple3" (fun () -> 
  expect @@
    tuple3 string float int ("hello", 1.2, 4)
    |> toEqual @@ jsonArray [|string "hello"; float 1.2; int 4|]
);

test "tuple4" (fun () -> 
  expect @@
    tuple4 string float int bool ("hello", 1.2, 4, true)
    |> toEqual @@ jsonArray [|string "hello"; float 1.2; int 4; bool true|]
);
