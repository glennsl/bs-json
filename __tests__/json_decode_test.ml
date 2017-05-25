open Jest
open Expect

let () = 

describe "boolean" (fun () ->
  let open Json in
  let open Decode in

  test "boolean" (fun () ->
    expect @@ boolean (Encode.boolean Js.true_) |> toEqual Js.true_);
  test "float" (fun () ->
    expectFn boolean (Encode.float 1.23) |> toThrow);
  test "int" (fun () ->
    expectFn boolean (Encode.int 23) |> toThrow);
  test "string" (fun () ->
    expectFn boolean (Encode.string "test") |> toThrow);
  test "null" (fun () ->
    expectFn boolean Encode.null |> toThrow);
  test "array" (fun () ->
    expectFn boolean (Encode.array [||]) |> toThrow);
  test "object" (fun () ->
    expectFn boolean (Encode.object_ @@ Js.Dict.empty ()) |> toThrow);
);

describe "bool" (fun () ->
  let open Json in
  let open Decode in

  test "boolean" (fun () ->
    expect @@ bool (Encode.boolean Js.true_) |> toEqual true);
  test "float" (fun () ->
    expectFn bool (Encode.float 1.23) |> toThrow);
  test "int" (fun () ->
    expectFn bool (Encode.int 23) |> toThrow);
  test "string" (fun () ->
    expectFn bool (Encode.string "test") |> toThrow);
  test "null" (fun () ->
    expectFn bool Encode.null |> toThrow);
  test "array" (fun () ->
    expectFn bool (Encode.array [||]) |> toThrow);
  test "object" (fun () ->
    expectFn bool (Encode.object_ @@ Js.Dict.empty ()) |> toThrow);

  test "boolean - false" (fun () ->
    expect @@ bool (Encode.boolean Js.false_) |> toEqual false);
);

describe "float" (fun () ->
  let open Json in
  let open! Decode in

  test "boolean" (fun () ->
    expectFn float (Encode.boolean Js.true_) |> toThrow);
  test "float" (fun () ->
    expect @@ float (Encode.float 1.23) |> toEqual 1.23);
  test "int" (fun () ->
    expect @@ float (Encode.int 23) |> toEqual 23.);
  test "string" (fun () ->
    expectFn float (Encode.string "test") |> toThrow);
  test "null" (fun () ->
    expectFn float Encode.null |> toThrow);
  test "array" (fun () ->
    expectFn float (Encode.array [||]) |> toThrow);
  test "object" (fun () ->
    expectFn float (Encode.object_ @@ Js.Dict.empty ()) |> toThrow);
);

describe "int" (fun () ->
  let open Json in
  let open! Decode in

  test "boolean" (fun () ->
    expectFn int (Encode.boolean Js.true_) |> toThrow);
  test "float" (fun () ->
    expectFn int (Encode.float 1.23) |> toThrow);
  test "int" (fun () ->
    expect @@ int (Encode.int 23) |> toEqual 23);
  test "string" (fun () ->
    expectFn int (Encode.string "test") |> toThrow);
  test "null" (fun () ->
    expectFn int Encode.null |> toThrow);
  test "array" (fun () ->
    expectFn int (Encode.array [||]) |> toThrow);
  test "object" (fun () ->
    expectFn int (Encode.object_ @@ Js.Dict.empty ()) |> toThrow);
);

describe "string" (fun () ->
  let open Json in
  let open! Decode in

  test "boolean" (fun () ->
    expectFn string (Encode.boolean Js.true_) |> toThrow);
  test "float" (fun () ->
    expectFn string (Encode.float 1.23) |> toThrow);
  test "int" (fun () ->
    expectFn string (Encode.int 23) |> toThrow);
  test "string" (fun () ->
    expect @@ string (Encode.string "test") |> toEqual "test");
  test "null" (fun () ->
    expectFn string Encode.null |> toThrow);
  test "array" (fun () ->
    expectFn string (Encode.array [||]) |> toThrow);
  test "object" (fun () ->
    expectFn string (Encode.object_ @@ Js.Dict.empty ()) |> toThrow);
);

describe "nullable" (fun () ->
  let open Json in
  let open! Decode in

  test "boolean -> int" (fun () ->
    expectFn (nullable int) (Encode.boolean Js.true_) |> toThrow);
  test "float -> int" (fun () ->
    expectFn (nullable int) (Encode.float 1.23) |> toThrow);
  test "int -> int" (fun () ->
    expect @@ (nullable int) (Encode.int 23) |> toEqual (Js.Null.return 23));
  test "string -> int" (fun () ->
    expectFn (nullable int) (Encode.string "test") |> toThrow);
  test "null -> int" (fun () ->
    expect @@ (nullable int) Encode.null |> toEqual Js.null);
  test "array -> int" (fun () ->
    expectFn (nullable int) (Encode.array [||]) |> toThrow);
  test "object -> int" (fun () ->
    expectFn (nullable int) (Encode.object_ @@ Js.Dict.empty ()) |> toThrow);

  test "boolean -> boolean " (fun () ->
    expect @@ nullable boolean (Encode.boolean Js.true_) |> toEqual (Js.Null.return Js.true_));
  test "float -> float" (fun () ->
    expect @@ nullable float (Encode.float 1.23) |> toEqual (Js.Null.return 1.23));
  test "string -> string" (fun () ->
    expect @@ nullable string (Encode.string "test") |> toEqual (Js.Null.return "test"));
  test "null -> null" (fun () ->
    expect @@ nullable (nullAs Js.null) Encode.null |> toEqual Js.null);
  test "int -> boolean" (fun () ->
    expectFn (nullable boolean) (Encode.int 1) |> toThrow)
);

describe "nullAs" (fun () ->
  let open Json in
  let open Decode in

  test "as 0 - boolean" (fun () ->
    expectFn (nullAs 0) (Encode.boolean Js.true_) |> toThrow);
  test "as 0 - float" (fun () ->
    expectFn (nullAs 0) (Encode.float 1.23) |> toThrow);
  test "as 0 - int" (fun () ->
    expectFn (nullAs 0) (Encode.int 23) |> toThrow);
  test "as 0 - string" (fun () ->
    expectFn (nullAs 0) (Encode.string "test") |> toThrow);
  test "as 0 - null" (fun () ->
    expect @@ (nullAs 0) Encode.null |> toEqual 0);
  test "as 0 - array" (fun () ->
    expectFn (nullAs 0) (Encode.array [||]) |> toThrow);
  test "as 0 - object" (fun () ->
    expectFn (nullAs 0) (Encode.object_ @@ Js.Dict.empty ()) |> toThrow);

  test "as Js.null" (fun () ->
    expect (nullAs Js.null Encode.null) |> toEqual Js.null);
  test "as None" (fun () ->
    expect (nullAs None Encode.null) |> toEqual None);
  test "as Some _" (fun () ->
    expect (nullAs (Some "foo") Encode.null) |> toEqual (Some "foo"))
);

describe "array" (fun () ->
  let open Json in
  let open! Decode in

  test "boolean" (fun () ->
    expectFn (array int) (Encode.boolean Js.true_) |> toThrow);
  test "float" (fun () ->
    expectFn (array int) (Encode.float 1.23) |> toThrow);
  test "int" (fun () ->
    expectFn (array int) (Encode.int 23) |> toThrow);
  test "string" (fun () ->
    expectFn (array int) (Encode.string "test") |> toThrow);
  test "null" (fun () ->
    expectFn (array int) Encode.null |> toThrow);
  test "array" (fun () ->
    expect @@ (array int) (Encode.array [||]) |> toEqual [||]);
  test "object" (fun () ->
    expectFn (array int) (Encode.object_ @@ Js.Dict.empty ()) |> toThrow);

  test "array boolean" (fun () ->
    expect @@
      array boolean (Js.Json.parseExn {| [true, false, true] |})
      |> toEqual [| Js.true_; Js.false_; Js.true_ |]);
  test "array float" (fun () ->
    expect @@
      array float (Js.Json.parseExn {| [1, 2, 3] |})
      |> toEqual [| 1.; 2.; 3. |]);
  test "array int" (fun () ->
    expect @@
      array int (Js.Json.parseExn {| [1, 2, 3] |})
      |> toEqual [| 1; 2; 3 |]);
  test "array string" (fun () ->
    expect @@
      array string (Js.Json.parseExn {| ["a", "b", "c"] |})
      |> toEqual [| "a"; "b"; "c" |]);
  test "array nullAs" (fun () ->
    expect @@
      array (nullAs Js.null) (Js.Json.parseExn {| [null, null, null] |})
      |> toEqual [| Js.null; Js.null; Js.null |]);
  test "array int -> array boolean" (fun () ->
    expectFn
      (array boolean) (Js.Json.parseExn {| [1, 2, 3] |})
      |> toThrow);
);

describe "list" (fun () ->
  let open Json in
  let open! Decode in

  test "boolean" (fun () ->
    expectFn (list int) (Encode.boolean Js.true_) |> toThrow);
  test "float" (fun () ->
    expectFn (list int) (Encode.float 1.23) |> toThrow);
  test "int" (fun () ->
    expectFn (list int) (Encode.int 23) |> toThrow);
  test "string" (fun () ->
    expectFn (list int) (Encode.string "test") |> toThrow);
  test "null" (fun () ->
    expectFn (list int) Encode.null |> toThrow);
  test "array" (fun () ->
    expect @@ (list int) (Encode.array [||]) |> toEqual []);
  test "object" (fun () ->
    expectFn (list int) (Encode.object_ @@ Js.Dict.empty ()) |> toThrow);

  test "list boolean" (fun () ->
    expect @@
      list boolean (Js.Json.parseExn {| [true, false, true] |})
      |> toEqual [Js.true_; Js.false_; Js.true_]);
  test "list float" (fun () ->
    expect @@
      list float (Js.Json.parseExn {| [1, 2, 3] |})
      |> toEqual [ 1.; 2.; 3.]);
  test "list int" (fun () ->
    expect @@
      list int (Js.Json.parseExn {| [1, 2, 3] |})
      |> toEqual [1; 2; 3]);
  test "list string" (fun () ->
    expect @@
      list string (Js.Json.parseExn {| ["a", "b", "c"] |})
      |> toEqual ["a"; "b"; "c"]);
  test "list nullAs" (fun () ->
    expect @@
      list (nullAs Js.null) (Js.Json.parseExn {| [null, null, null] |})
      |> toEqual [Js.null; Js.null; Js.null]);
  test "array int -> list boolean" (fun () ->
    expectFn
      (list boolean) (Js.Json.parseExn {| [1, 2, 3] |})
      |> toThrow);
);

describe "dict" (fun () ->
  let open Json in
  let open! Decode in

  test "boolean" (fun () ->
    expectFn (dict int) (Encode.boolean Js.true_) |> toThrow);
  test "float" (fun () ->
    expectFn (dict int) (Encode.float 1.23) |> toThrow);
  test "int" (fun () ->
    expectFn (dict int) (Encode.int 23) |> toThrow);
  test "string" (fun () ->
    expectFn (dict int) (Encode.string "test") |> toThrow);
  test "null" (fun () ->
    expectFn (dict int) Encode.null |> toThrow);
  test "array" (fun () ->
    expectFn (dict int) (Encode.array [||]) |> toThrow);
  test "object" (fun () ->
    expect @@
      dict int (Encode.object_ @@ Js.Dict.empty ())
      |> toEqual (Js.Dict.empty ()));

  test "dict boolean" (fun () ->
    expect @@
      dict boolean (Js.Json.parseExn {| { "a": true, "b": false } |})
      |> toEqual (Obj.magic [%obj { a = Js.true_; b = Js.false_ }]));
  test "dict float" (fun () ->
    expect @@
      dict float (Js.Json.parseExn {| { "a": 1.2, "b": 2.3 } |})
      |> toEqual (Obj.magic [%obj { a = 1.2; b = 2.3 }]));
  test "dict int" (fun () ->
    expect @@
      dict int (Js.Json.parseExn {| { "a": 1, "b": 2 } |})
      |> toEqual (Obj.magic [%obj { a = 1; b = 2 }]));
  test "dict string" (fun () ->
    expect @@
      dict string (Js.Json.parseExn {| { "a": "x", "b": "y" } |})
      |> toEqual (Obj.magic [%obj { a = "x"; b = "y" }]));
  test "dict nullAs" (fun () ->
    expect @@
      dict (nullAs Js.null) (Js.Json.parseExn {| { "a": null, "b": null } |})
      |> toEqual (Obj.magic [%obj { a = Js.null; b = Js.null }]));
  test "dict null -> dict string" (fun () ->
    expectFn
      (dict string) (Js.Json.parseExn {| { "a": null, "b": null } |})
      |> toThrow);
);

describe "field" (fun () ->
  let open Json in
  let open! Decode in

  test "boolean" (fun () ->
    expectFn (field "foo" int) (Encode.boolean Js.true_) |> toThrow);
  test "float" (fun () ->
    expectFn (field "foo" int) (Encode.float 1.23) |> toThrow);
  test "int" (fun () ->
    expectFn (field "foo" int) (Encode.int 23) |> toThrow);
  test "string" (fun () ->
    expectFn (field "foo" int) (Encode.string "test") |> toThrow);
  test "null" (fun () ->
    expectFn (field "foo" int) Encode.null |> toThrow);
  test "array" (fun () ->
    expectFn (field "foo" int) (Encode.array [||]) |> toThrow);
  test "object" (fun () ->
    expectFn (field "foo" int) (Encode.object_ @@ Js.Dict.empty ()) |> toThrow);

  test "field boolean" (fun () ->
    expect @@
      field "b" boolean (Js.Json.parseExn {| { "a": true, "b": false } |})
      |> toEqual Js.false_);
  test "field float" (fun () ->
    expect @@
      field "b" float (Js.Json.parseExn {| { "a": 1.2, "b": 2.3 } |})
      |> toEqual 2.3);
  test "field int" (fun () ->
    expect @@
      field "b" int (Js.Json.parseExn {| { "a": 1, "b": 2 } |})
      |> toEqual 2);
  test "field string" (fun () ->
    expect @@
      field "b" string (Js.Json.parseExn {| { "a": "x", "b": "y" } |})
      |> toEqual "y");
  test "field nullAs" (fun () ->
    expect @@
      field "b" (nullAs Js.null) (Js.Json.parseExn {| { "a": null, "b": null } |})
      |> toEqual Js.null);
  test "field null -> field string" (fun () ->
    expectFn
      (field "b" string) (Js.Json.parseExn {| { "a": null, "b": null } |})
      |> toThrow);
);

describe "optional" (fun () ->
  let open Json in
  let open! Decode in

  test "boolean -> int" (fun () ->
    expect @@ (optional int) (Encode.boolean Js.true_) |> toEqual None);
  test "float -> int" (fun () ->
    expect @@ (optional int) (Encode.float 1.23) |> toEqual None);
  test "int -> int" (fun () ->
    expect @@ (optional int) (Encode.int 23) |> toEqual (Some 23));
  test "string -> int" (fun () ->
    expect @@ (optional int) (Encode.string "test") |> toEqual None);
  test "null -> int" (fun () ->
    expect @@ (optional int) Encode.null |> toEqual None);
  test "array -> int" (fun () ->
    expect @@ (optional int) (Encode.array [||]) |> toEqual None);
  test "object -> int" (fun () ->
    expect @@ (optional int) (Encode.object_ @@ Js.Dict.empty ()) |> toEqual None);

  test "boolean -> boolean " (fun () ->
    expect @@ optional boolean (Encode.boolean Js.true_) |> toEqual (Some Js.true_));
  test "float -> float" (fun () ->
    expect @@ optional float (Encode.float 1.23) |> toEqual (Some 1.23));
  test "string -> string" (fun () ->
    expect @@ optional string (Encode.string "test") |> toEqual (Some "test"));
  test "null -> null" (fun () ->
    expect @@ optional (nullAs Js.null) Encode.null |> toEqual (Some Js.null));
  test "int -> boolean" (fun () ->
    expect @@ (optional boolean) (Encode.int 1) |> toEqual None);

  test "optional field" (fun () ->
    expect @@
      (optional (field "x" int) (Js.Json.parseExn {| { "x": 2} |}))
      |> toEqual (Some 2));
  test "optional field - incorrect type" (fun () ->
    expect @@
      (optional (field "x" int) (Js.Json.parseExn {| { "x": 2.3} |}))
      |> toEqual None);
  test "optional field - no such field" (fun () ->
    expect @@
      (optional (field "y" int) (Js.Json.parseExn {| { "x": 2} |}))
      |> toEqual None);
  test "field optional" (fun () ->
    expect @@
      (field "x" (optional int) (Js.Json.parseExn {| { "x": 2} |}))
      |> toEqual (Some 2));
  test "field optional - incorrect type" (fun () ->
    expect @@
      (field "x" (optional int) (Js.Json.parseExn {| { "x": 2.3} |}))
      |> toEqual None);
  test "field optional - no such field" (fun () ->
    expectFn
      (field "y" (optional int)) (Js.Json.parseExn {| { "x": 2} |})
      |> toThrow);
);

describe "oneOf" (fun () ->
  let open Json in
  let open! Decode in

  test "boolean" (fun () ->
    expectFn (oneOf [int; field "x" int]) (Encode.boolean Js.true_) |> toThrow);
  test "float" (fun () ->
    expectFn (oneOf [int; field "x" int]) (Encode.float 1.23) |> toThrow);
  test "int" (fun () ->
    expect @@ (oneOf [int; field "x" int]) (Encode.int 23) |> toEqual 23);
  test "string" (fun () ->
    expectFn (oneOf [int; field "x" int]) (Encode.string "test") |> toThrow);
  test "null" (fun () ->
    expectFn (oneOf [int; field "x" int]) Encode.null |> toThrow);
  test "array" (fun () ->
    expectFn (oneOf [int; field "x" int]) (Encode.array [||]) |> toThrow);
  test "object" (fun () ->
    expectFn (oneOf [int; field "x" int]) (Encode.object_ @@ Js.Dict.empty ()) |> toThrow);

  test "object with field" (fun () ->
    expect @@ (oneOf [int; field "x" int]) (Js.Json.parseExn {| { "x": 2} |}) |> toEqual 2);
);

describe "either" (fun () ->
  let open Json in
  let open! Decode in

  test "boolean" (fun () ->
    expectFn (either int (field "x" int)) (Encode.boolean Js.true_) |> toThrow);
  test "float" (fun () ->
    expectFn (either int (field "x" int)) (Encode.float 1.23) |> toThrow);
  test "int" (fun () ->
    expect @@ (either int (field "x" int)) (Encode.int 23) |> toEqual 23);
  test "string" (fun () ->
    expectFn (either int (field "x" int)) (Encode.string "test") |> toThrow);
  test "null" (fun () ->
    expectFn (either int (field "x" int)) Encode.null |> toThrow);
  test "array" (fun () ->
    expectFn (either int (field "x" int)) (Encode.array [||]) |> toThrow);
  test "object" (fun () ->
    expectFn (either int (field "x" int)) (Encode.object_ @@ Js.Dict.empty ()) |> toThrow);

  test "object with field" (fun () ->
    expect @@ (either int (field "x" int)) (Js.Json.parseExn {| { "x": 2} |}) |> toEqual 2);
);

describe "withDefault" (fun () ->
  let open Json in
  let open! Decode in

  test "boolean" (fun () ->
    expect @@ (withDefault 0 int) (Encode.boolean Js.true_) |> toEqual 0);
  test "float" (fun () ->
    expect @@ (withDefault 0 int) (Encode.float 1.23) |> toEqual 0);
  test "int" (fun () ->
    expect @@ (withDefault 0 int) (Encode.int 23) |> toEqual 23);
  test "string" (fun () ->
    expect @@ (withDefault 0 int) (Encode.string "test") |> toEqual 0);
  test "null" (fun () ->
    expect @@ (withDefault 0 int) Encode.null |> toEqual 0);
  test "array" (fun () ->
    expect @@ (withDefault 0 int) (Encode.array [||]) |> toEqual 0);
  test "object" (fun () ->
    expect @@ (withDefault 0 int) (Encode.object_ @@ Js.Dict.empty ()) |> toEqual 0);
);

describe "map" (fun () ->
  let open Json in
  let open! Decode in

  test "boolean" (fun () ->
    expectFn (int |> map ((+)2)) (Encode.boolean Js.true_) |> toThrow);
  test "float" (fun () ->
    expectFn (int |> map ((+)2)) (Encode.float 1.23) |> toThrow);
  test "int" (fun () ->
    expect @@ (int |> map ((+)2)) (Encode.int 23) |> toEqual 25);
  test "string" (fun () ->
    expectFn (int |> map ((+)2)) (Encode.string "test") |> toThrow);
  test "null" (fun () ->
    expectFn (int |> map ((+)2)) (Encode.null) |> toThrow);
  test "array" (fun () ->
    expectFn (int |> map ((+)2)) (Encode.array [||]) |> toThrow);
  test "object" (fun () ->
    expectFn (int |> map ((+)2)) (Encode.object_ @@ Js.Dict.empty ()) |> toThrow);
);

describe "andThen" (fun () ->
  let open Json in
  let open! Decode in

  test "boolean -> int" (fun () ->
    expectFn (int |> andThen (fun _ -> int)) (Encode.boolean Js.true_) |> toThrow);
  test "float -> int" (fun () ->
    expectFn (int |> andThen (fun _ -> int)) (Encode.float 1.23) |> toThrow);
  test "int -> int" (fun () ->
    expect @@ (int |> andThen (fun _ -> int)) (Encode.int 23) |> toEqual 23);
  test "string -> int" (fun () ->
    expectFn (int |> andThen (fun _ -> int)) (Encode.string "test") |> toThrow);
  test "null -> int" (fun () ->
    expectFn (int |> andThen (fun _ -> int)) (Encode.null) |> toThrow);
  test "array -> int" (fun () ->
    expectFn (int |> andThen (fun _ -> int)) (Encode.array [||]) |> toThrow);
  test "object -> int" (fun () ->
    expectFn (int |> andThen (fun _ -> int)) (Encode.object_ @@ Js.Dict.empty ()) |> toThrow);

  test "int -> int andThen float" (fun () ->
    expect @@ (int |> andThen (fun _ -> float)) (Encode.int 23) |> toEqual 23.);
  test "float -> int andThen float" (fun () ->
    expectFn (int |> andThen (fun _ ->float)) (Encode.float 1.23) |> toThrow);
  test "int -> float andThen int" (fun () ->
    expect @@ (float |> andThen (fun _ -> int)) (Encode.int 23) |> toEqual 23);
  test "float -> float andThen int" (fun () ->
    expectFn (float |> andThen (fun _ -> int)) (Encode.float 1.23) |> toThrow);
);

describe "composite expressions" (fun () ->
  let open Json in
  let open! Decode in
  
  test "dict array array int" (fun () ->
    expect @@
      (dict (array (array int)) (Js.Json.parseExn {| { "a": [[1, 2], [3]], "b": [[4], [5, 6]] } |}))
      |> toEqual (Obj.magic [%obj { a = [| [|1; 2|]; [|3|] |]; b = [| [|4|]; [|5; 6|] |] }]));
  test "dict array array int - heterogenous structure" (fun () ->
    expectFn 
      (dict (array (array int))) (Js.Json.parseExn {| { "a": [[1, 2], [true]], "b": [[4], [5, 6]] } |})
      |> toThrow);
  test "dict array array int - heterogenous structure 2" (fun () ->
    expectFn
      (dict (array (array int))) (Js.Json.parseExn {| { "a": [[1, 2], "foo"], "b": [[4], [5, 6]] } |})
      |> toThrow);
  test "field" (fun () ->
    let json = Js.Json.parseExn {| { "foo": [1, 2, 3], "bar": "baz" } |} in
    expect @@
      (field "foo" (array int) json, field "bar" string json)
      |> toEqual ([| 1; 2; 3 |], "baz"));
);