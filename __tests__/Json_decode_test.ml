open Jest
open Expect

module Test = struct
  type default_case = 
    | Float
    | Int
    | String
    | Null
    | Array
    | Object
    | Bool

  let valueFor = 
    let open! Json.Encode in function
    | Float   -> float 1.23
    | Int     -> int 23
    | String  -> string "test"
    | Null    -> null
    | Array   -> jsonArray [||]
    | Object  -> object_ []
    | Bool    -> boolean Js.true_

  let throws ?(name = "throws") decoder kinds =
    testAll name (List.map valueFor kinds)  (fun value ->
        expectFn decoder value |> toThrowException (Json.Decode.DecodeError ""))

end

let () = 

describe "boolean" (fun () ->
  let open Json in
  let open Decode in

  test "boolean" (fun () ->
    expect @@ boolean (Encode.boolean Js.true_) |> toEqual Js.true_);

  Test.throws boolean [Float; Int; String; Null; Array; Object];
);

describe "bool" (fun () ->
  let open Json in
  let open Decode in

  test "bool" (fun () ->
    expect @@ bool (Encode.boolean Js.true_) |> toEqual true);
  test "bool - false" (fun () ->
    expect @@ bool (Encode.boolean Js.false_) |> toEqual false);
    
  Test.throws bool [Float; Int; String; Null; Array; Object];
);

describe "float" (fun () ->
  let open Json in
  let open! Decode in

  test "float" (fun () ->
    expect @@ float (Encode.float 1.23) |> toEqual 1.23);
  test "int" (fun () ->
    expect @@ float (Encode.int 23) |> toEqual 23.);
  
  Test.throws float [Bool; String; Null; Array; Object;];
);

describe "int" (fun () ->
  let open Json in
  let open! Decode in

  test "int" (fun () ->
    expect @@ int (Encode.int 23) |> toEqual 23);

  test "int > 32-bit" (fun () ->
    (* Use %raw since integer literals > Int32.max_int overflow without warning *)
    let big_int = [%raw "2147483648"] in
    expect @@ int (Encode.int big_int) |> toEqual big_int);
  test "infinity" (fun () ->
    let inf = [%raw "Infinity"] in
    expectFn
      int (Encode.int inf)
      |> toThrowException(Decode.DecodeError "Expected integer, got null"));
  
  Test.throws int [Bool; Float; String; Null; Array; Object];
);

describe "string" (fun () ->
  let open Json in
  let open! Decode in

  test "string" (fun () ->
    expect @@ string (Encode.string "test") |> toEqual "test");

  Test.throws string [Bool; Float; Int; Null; Array; Object];
);

describe "date" (fun () ->
  let open Json in
  let open! Decode in

  test "ISO8601-formatted string" (fun () ->
    expect @@
      date (Encode.string "2012-04-23T18:25:43.511Z")
      |> toEqual (Js.Date.fromString "2012-04-23T18:25:43.511Z"));

  Test.throws date [Bool; Float; Int; Null; Array; Object];
);

describe "nullable" (fun () ->
  let open Json in
  let open! Decode in

  test "int -> int" (fun () ->
    expect @@ (nullable int) (Encode.int 23) |> toEqual (Js.Null.return 23));
  test "null -> int" (fun () ->
    expect @@ (nullable int) Encode.null |> toEqual Js.null);

  test "boolean -> boolean " (fun () ->
    expect @@ nullable boolean (Encode.boolean Js.true_) |> toEqual (Js.Null.return Js.true_));
  test "float -> float" (fun () ->
    expect @@ nullable float (Encode.float 1.23) |> toEqual (Js.Null.return 1.23));
  test "string -> string" (fun () ->
    expect @@ nullable string (Encode.string "test") |> toEqual (Js.Null.return "test"));
  test "null -> null" (fun () ->
    expect @@ nullable (nullAs Js.null) Encode.null |> toEqual Js.null);

  Test.throws (nullable int) [Bool; Float; String; Array; Object];
  Test.throws (nullable boolean) [Int];
);

describe "nullAs" (fun () ->
  let open Json in
  let open Decode in

  test "as 0 - null" (fun () ->
    expect @@ (nullAs 0) Encode.null |> toEqual 0);

  test "as Js.null" (fun () ->
    expect (nullAs Js.null Encode.null) |> toEqual Js.null);
  test "as None" (fun () ->
    expect (nullAs None Encode.null) |> toEqual None);
  test "as Some _" (fun () ->
    expect (nullAs (Some "foo") Encode.null) |> toEqual (Some "foo"));

  Test.throws (nullAs 0) [Bool; Float; Int; String; Array; Object];
);

describe "array" (fun () ->
  let open Json in
  let open! Decode in

  test "array" (fun () ->
    expect @@ (array int) (Encode.jsonArray [||]) |> toEqual [||]);

  test "boolean" (fun () ->
    expect @@
      array boolean (parseOrRaise {| [true, false, true] |})
      |> toEqual [| Js.true_; Js.false_; Js.true_ |]);
  test "float" (fun () ->
    expect @@
      array float (parseOrRaise {| [1, 2, 3] |})
      |> toEqual [| 1.; 2.; 3. |]);
  test "int" (fun () ->
    expect @@
      array int (parseOrRaise {| [1, 2, 3] |})
      |> toEqual [| 1; 2; 3 |]);
  test "string" (fun () ->
    expect @@
      array string (parseOrRaise {| ["a", "b", "c"] |})
      |> toEqual [| "a"; "b"; "c" |]);
  test "nullAs" (fun () ->
    expect @@
      array (nullAs Js.null) (parseOrRaise {| [null, null, null] |})
      |> toEqual [| Js.null; Js.null; Js.null |]);

  test "array int -> array boolean" (fun () ->
    expectFn
      (array boolean) (parseOrRaise {| [1, 2, 3] |})
      |> toThrowException(DecodeError "Expected boolean, got 1\n\tin array"));
  test "non-DecodeError exceptions in decoder should pass through" (fun () ->
    expectFn
      (array (fun _ -> failwith "fail")) (Encode.array Encode.int [|1|])
      |> toThrowException(Failure "fail"));

  Test.throws (array int) [Bool; Float; Int; String; Null; Object];
);

describe "list" (fun () ->
  let open Json in
  let open! Decode in

  test "array" (fun () ->
    expect @@ (list int) (Encode.jsonArray [||]) |> toEqual []);

  test "boolean" (fun () ->
    expect @@
      list boolean (parseOrRaise {| [true, false, true] |})
      |> toEqual [Js.true_; Js.false_; Js.true_]);
  test "float" (fun () ->
    expect @@
      list float (parseOrRaise {| [1, 2, 3] |})
      |> toEqual [ 1.; 2.; 3.]);
  test "int" (fun () ->
    expect @@
      list int (parseOrRaise {| [1, 2, 3] |})
      |> toEqual [1; 2; 3]);
  test "string" (fun () ->
    expect @@
      list string (parseOrRaise {| ["a", "b", "c"] |})
      |> toEqual ["a"; "b"; "c"]);
  test "nullAs" (fun () ->
    expect @@
      list (nullAs Js.null) (parseOrRaise {| [null, null, null] |})
      |> toEqual [Js.null; Js.null; Js.null]);

  test "array int -> list boolean" (fun () ->
    expectFn
      (list boolean) (parseOrRaise {| [1, 2, 3] |})
      |> toThrowException(DecodeError "Expected boolean, got 1\n\tin array"));
  test "non-DecodeError exceptions in decoder should pass through" (fun () ->
    expectFn
      (list (fun _ -> failwith "fail")) (Encode.list Encode.int [1])
      |> toThrowException(Failure "fail"));

  Test.throws (list int) [Bool; Float; Int; String; Null; Object];
);

describe "pair" (fun () ->
  let open Json in
  let open! Decode in

  test "heterogenous" (fun () ->
    expect @@ pair string int (parseOrRaise {| ["a", 3] |})
    |> toEqual ("a", 3));
  test "int int" (fun () ->
    expect @@ pair int int (parseOrRaise {| [4, 3] |})
    |> toEqual (4, 3));
  test "too small" (fun () ->
    expectFn (pair int int) (parseOrRaise {| [4] |})
    |> toThrowException(DecodeError "Expected array of length 2, got array of length 1"));
  test "too large" (fun () ->
    expectFn (pair int int) (parseOrRaise {| [3, 4, 5] |})
    |> toThrowException(DecodeError "Expected array of length 2, got array of length 3"));
  test "bad type a" (fun () ->
    expectFn (pair int int) (parseOrRaise {| ["3", 4] |})
    |> toThrowException(DecodeError "Expected number, got \"3\"\n\tin pair/tuple2"));
  test "bad type b" (fun () ->
    expectFn (pair string string) (parseOrRaise {| ["3", 4] |})
    |> toThrowException(DecodeError "Expected string, got 4\n\tin pair/tuple2"));
  test "not array" (fun () ->
    expectFn (pair int int) (parseOrRaise {| 4 |})
    |> toThrowException(DecodeError "Expected array, got 4"));
  test "non-DecodeError exceptions in decoder should pass through" (fun () ->
    expectFn
      (pair (fun _ -> failwith "fail") int) (parseOrRaise {| [4, 3] |})
      |> toThrowException(Failure "fail"));
);

describe "tuple2" (fun () ->
  let open Json in
  let open! Decode in

  test "heterogenous" (fun () ->
    expect @@ tuple2 string int (parseOrRaise {| ["a", 3] |})
    |> toEqual ("a", 3));
  test "too small" (fun () ->
    expectFn (tuple2 int int) (parseOrRaise {| [4] |})
    |> toThrowException(DecodeError "Expected array of length 2, got array of length 1"));
  test "too large" (fun () ->
    expectFn (tuple2 int int) (parseOrRaise {| [3, 4, 5] |})
    |> toThrowException(DecodeError "Expected array of length 2, got array of length 3"));
  test "bad type a" (fun () ->
    expectFn (tuple2 int int) (parseOrRaise {| ["3", 4] |})
    |> toThrowException(DecodeError "Expected number, got \"3\"\n\tin pair/tuple2"));
  test "bad type b" (fun () ->
    expectFn (tuple2 string string) (parseOrRaise {| ["3", 4] |})
    |> toThrowException(DecodeError "Expected string, got 4\n\tin pair/tuple2"));
  test "not array" (fun () ->
    expectFn (tuple2 int int) (parseOrRaise {| 4 |})
    |> toThrowException(DecodeError "Expected array, got 4"));
  test "non-DecodeError exceptions in decoder should pass through" (fun () ->
    expectFn
      (tuple2 (fun _ -> failwith "fail") int) (parseOrRaise {| [4, 3] |})
      |> toThrowException(Failure "fail"));
);

describe "tuple3" (fun () ->
  let open Json in
  let open! Decode in

  test "heterogenous" (fun () ->
    expect @@ tuple3 string int float (parseOrRaise {| ["a", 3, 4.5] |})
    |> toEqual ("a", 3, 4.5));
  test "too small" (fun () ->
    expectFn (tuple3 int int int) (parseOrRaise {| [4] |})
    |> toThrowException(DecodeError "Expected array of length 3, got array of length 1"));
  test "too large" (fun () ->
    expectFn (tuple3 int int int) (parseOrRaise {| [3, 4, 5, 6, 7] |})
    |> toThrowException(DecodeError "Expected array of length 3, got array of length 5"));
  test "bad type a" (fun () ->
    expectFn (tuple3 int int int) (parseOrRaise {| ["3", 4, 5] |})
    |> toThrowException(DecodeError "Expected number, got \"3\"\n\tin tuple3"));
  test "bad type b" (fun () ->
    expectFn (tuple3 string string string) (parseOrRaise {| ["3", 4, "5"] |})
    |> toThrowException(DecodeError "Expected string, got 4\n\tin tuple3"));
  test "not array" (fun () ->
    expectFn (tuple3 int int int) (parseOrRaise {| 4 |})
    |> toThrowException(DecodeError "Expected array, got 4"));
  test "non-DecodeError exceptions in decoder should pass through" (fun () ->
    expectFn
      (tuple3 (fun _ -> failwith "fail") int int) (parseOrRaise {| [4, 3, 5] |})
      |> toThrowException(Failure "fail"));
);

describe "tuple4" (fun () ->
  let open Json in
  let open! Decode in

  test "heterogenous" (fun () ->
    expect @@ tuple4 string int float bool (parseOrRaise {| ["a", 3, 4.5, true] |})
    |> toEqual ("a", 3, 4.5, true));
  test "too small" (fun () ->
    expectFn (tuple4 int int int int) (parseOrRaise {| [4] |})
    |> toThrowException(DecodeError "Expected array of length 4, got array of length 1"));
  test "too large" (fun () ->
    expectFn (tuple4 int int int int) (parseOrRaise {| [3, 4, 5, 6, 7, 8] |})
    |> toThrowException(DecodeError "Expected array of length 4, got array of length 6"));
  test "bad type a" (fun () ->
    expectFn (tuple4 int int int int) (parseOrRaise {| ["3", 4, 5, 6] |})
    |> toThrowException(DecodeError "Expected number, got \"3\"\n\tin tuple4"));
  test "bad type b" (fun () ->
    expectFn (tuple4 string string string string) (parseOrRaise {| ["3", 4, "5", "6"] |})
    |> toThrowException(DecodeError "Expected string, got 4\n\tin tuple4"));
  test "not array" (fun () ->
    expectFn (tuple4 int int int int) (parseOrRaise {| 4 |})
    |> toThrowException(DecodeError "Expected array, got 4"));
  test "non-DecodeError exceptions in decoder should pass through" (fun () ->
    expectFn
      (tuple4 (fun _ -> failwith "fail") int int int) (parseOrRaise {| [4, 3, 5, 6] |})
      |> toThrowException(Failure "fail"));
);

describe "dict" (fun () ->
  let open Json in
  let open! Decode in

  test "object" (fun () ->
    expect @@
      dict int (Encode.object_ [])
      |> toEqual (Js.Dict.empty ()));

  test "boolean" (fun () ->
    expect @@
      dict boolean (parseOrRaise {| { "a": true, "b": false } |})
      |> toEqual (Obj.magic [%obj { a = Js.true_; b = Js.false_ }]));
  test "float" (fun () ->
    expect @@
      dict float (parseOrRaise {| { "a": 1.2, "b": 2.3 } |})
      |> toEqual (Obj.magic [%obj { a = 1.2; b = 2.3 }]));
  test "int" (fun () ->
    expect @@
      dict int (parseOrRaise {| { "a": 1, "b": 2 } |})
      |> toEqual (Obj.magic [%obj { a = 1; b = 2 }]));
  test "string" (fun () ->
    expect @@
      dict string (parseOrRaise {| { "a": "x", "b": "y" } |})
      |> toEqual (Obj.magic [%obj { a = "x"; b = "y" }]));
  test "nullAs" (fun () ->
    expect @@
      dict (nullAs Js.null) (parseOrRaise {| { "a": null, "b": null } |})
      |> toEqual (Obj.magic [%obj { a = Js.null; b = Js.null }]));
  test "null -> dict string" (fun () ->
    expectFn
      (dict string) (parseOrRaise {| { "a": null, "b": null } |})
      |> toThrowException(DecodeError "Expected string, got null\n\tin dict"));
  test "non-DecodeError exceptions in decoder should pass through" (fun () ->
    expectFn
      (dict (fun _ -> failwith "fail")) (parseOrRaise {| { "a": 0 } |})
      |> toThrowException(Failure "fail"));

  Test.throws (dict int) [Bool; Float; Int; String; Null; Array];
);

describe "field" (fun () ->
  let open Json in
  let open! Decode in

  test "boolean" (fun () ->
    expect @@
      field "b" boolean (parseOrRaise {| { "a": true, "b": false } |})
      |> toEqual Js.false_);
  test "float" (fun () ->
    expect @@
      field "b" float (parseOrRaise {| { "a": 1.2, "b": 2.3 } |})
      |> toEqual 2.3);
  test "int" (fun () ->
    expect @@
      field "b" int (parseOrRaise {| { "a": 1, "b": 2 } |})
      |> toEqual 2);
  test "string" (fun () ->
    expect @@
      field "b" string (parseOrRaise {| { "a": "x", "b": "y" } |})
      |> toEqual "y");
  test "nullAs" (fun () ->
    expect @@
      field "b" (nullAs Js.null) (parseOrRaise {| { "a": null, "b": null } |})
      |> toEqual Js.null);
  test "missing key" (fun () ->
    expectFn
      (field "c" string) (parseOrRaise {| { "a": null, "b": null } |})
      |> toThrowException(DecodeError "Expected field 'c'"));
  test "decoder error" (fun () ->
    expectFn
      (field "b" string) (parseOrRaise {| { "a": null, "b": null } |})
      |> toThrowException(DecodeError "Expected string, got null\n\tat field 'b'"));
  test "non-DecodeError exceptions in decoder should pass through" (fun () ->
    expectFn
      (field "a" (fun _ -> failwith "fail")) (parseOrRaise {| { "a": 0 } |})
      |> toThrowException(Failure "fail"));

  Test.throws (field "foo" int) [Bool; Float; Int; String; Null; Array; Object];
);

describe "at" (fun () ->
  let open Json in
  let open! Decode in

  test "boolean" (fun () ->
    expect @@
      at ["a"; "x"; "y"] boolean (parseOrRaise {| {
        "a": { "x" : { "y" : false } }, 
        "b": false 
      } |})
      |> toEqual Js.false_);
  test "nullAs" (fun () ->
    expect @@
      at ["a"; "x"] (nullAs Js.null) (parseOrRaise {| {
        "a": { "x" : null }, 
        "b": null 
      } |})
      |> toEqual Js.null);

  test "missing key" (fun () ->
    expectFn 
      (at ["a"; "y"] (nullAs Js.null)) (parseOrRaise {| {
        "a": { "x" : null }, 
        "b": null 
      } |})
      |> toThrowException(DecodeError "Expected field 'y'\n\tat field 'a'"));
  test "decoder error" (fun () ->
    expectFn 
      (at ["a"; "x"; "y"] (nullAs Js.null)) (parseOrRaise {| {
        "a": { "x" : { "y": "foo" } }, 
        "b": null 
      } |})
      |> toThrowException(DecodeError "Expected null, got \"foo\"\n\tat field 'y'\n\tat field 'x'\n\tat field 'a'"));
  test "empty list of keys should raise Invalid_argument" (fun () ->
    expectFn
      (at []) int
      |> toThrowException(Invalid_argument "Expected key_path to contain at least one element"));

  Test.throws (at ["foo"; "bar"] int) [Bool; Float; Int; String; Null; Array; Object];
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
    expect @@ (optional int) (Encode.jsonArray [||]) |> toEqual None);
  test "object -> int" (fun () ->
    expect @@ (optional int) (Encode.object_ []) |> toEqual None);

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
      (optional (field "x" int) (parseOrRaise {| { "x": 2} |}))
      |> toEqual (Some 2));
  test "optional field - incorrect type" (fun () ->
    expect @@
      (optional (field "x" int) (parseOrRaise {| { "x": 2.3} |}))
      |> toEqual None);
  test "optional field - no such field" (fun () ->
    expect @@
      (optional (field "y" int) (parseOrRaise {| { "x": 2} |}))
      |> toEqual None);
  test "field optional" (fun () ->
    expect @@
      (field "x" (optional int) (parseOrRaise {| { "x": 2} |}))
      |> toEqual (Some 2));
  test "field optional - incorrect type" (fun () ->
    expect @@
      (field "x" (optional int) (parseOrRaise {| { "x": 2.3} |}))
      |> toEqual None);
  test "field optional - no such field" (fun () ->
    expectFn
      (field "y" (optional int)) (parseOrRaise {| { "x": 2} |})
      |> toThrowException(DecodeError "Expected field 'y'"));

  test "non-DecodeError exceptions in decoder should pass through" (fun () ->
    expectFn
      (optional (fun _ -> failwith "fail")) (Encode.null)
      |> toThrowException(Failure "fail"));
);

describe "oneOf" (fun () ->
  let open Json in
  let open! Decode in

  test "object with field" (fun () ->
    expect @@ (oneOf [int; field "x" int]) (parseOrRaise {| { "x": 2} |}) |> toEqual 2);
  test "int" (fun () ->
    expect @@ (oneOf [int; field "x" int]) (Encode.int 23) |> toEqual 23);

  test "non-DecodeError exceptions in decoder should pass through" (fun () ->
    expectFn
      (oneOf [(fun _ -> failwith "fail")]) (Encode.null)
      |> toThrowException(Failure "fail"));
  

  Test.throws (oneOf [int; field "x" int]) [Bool; Float; String; Null; Array; Object];
);

describe "either" (fun () ->
  let open Json in
  let open! Decode in

  test "object with field" (fun () ->
    expect @@ (either int (field "x" int)) (parseOrRaise {| { "x": 2} |}) |> toEqual 2);
  test "int" (fun () ->
    expect @@ (either int (field "x" int)) (Encode.int 23) |> toEqual 23);

  Test.throws (either int (field "x" int)) [Bool; Float; String; Null; Array; Object];
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
    expect @@ (withDefault 0 int) (Encode.jsonArray [||]) |> toEqual 0);
  test "object" (fun () ->
    expect @@ (withDefault 0 int) (Encode.object_ []) |> toEqual 0);

  test "non-DecodeError exceptions in decoder should pass through" (fun () ->
    expectFn
      (withDefault 4 (fun _ -> failwith "fail")) (Encode.int 0)
      |> toThrowException(Failure "fail"));
);

describe "map" (fun () ->
  let open Json in
  let open! Decode in

  test "int" (fun () ->
    expect @@ (int |> map ((+)2)) (Encode.int 23) |> toEqual 25);

  Test.throws (int |> map ((+)2)) [Bool; Float; String; Null; Array; Object];
);

describe "andThen" (fun () ->
  let open Json in
  let open! Decode in

  test "int -> int" (fun () ->
    expect @@ (int |> andThen (fun _ -> int)) (Encode.int 23) |> toEqual 23);

  test "int -> int andThen float" (fun () ->
    expect @@ (int |> andThen (fun _ -> float)) (Encode.int 23) |> toEqual 23.);
  test "int -> float andThen int" (fun () ->
    expect @@ (float |> andThen (fun _ -> int)) (Encode.int 23) |> toEqual 23);

  Test.throws ~name:"int andThen int " (int |> andThen (fun _ -> int)) [Bool; Float; String; Null; Array; Object];
  Test.throws ~name:"float andThen int " (float |> andThen (fun _ -> int)) [Float];
  Test.throws ~name:"int to " (int |> andThen (fun _ -> float)) [Float];
);

describe "composite expressions" (fun () ->
  let open Json in
  let open! Decode in
  
  test "dict array array int" (fun () ->
    expect @@
      (dict (array (array int)) (parseOrRaise {| { "a": [[1, 2], [3]], "b": [[4], [5, 6]] } |}))
      |> toEqual (Obj.magic [%obj { a = [| [|1; 2|]; [|3|] |]; b = [| [|4|]; [|5; 6|] |] }]));
  test "dict array array int - heterogenous structure" (fun () ->
    expectFn 
      (dict (array (array int))) (parseOrRaise {| { "a": [[1, 2], [true]], "b": [[4], [5, 6]] } |})
      |> toThrowException(DecodeError "Expected number, got true\n\tin array\n\tin array\n\tin dict"));
  test "dict array array int - heterogenous structure 2" (fun () ->
    expectFn
      (dict (array (array int))) (parseOrRaise {| { "a": [[1, 2], "foo"], "b": [[4], [5, 6]] } |})
      |> toThrowException(DecodeError "Expected array, got \"foo\"\n\tin array\n\tin dict"));
  test "field" (fun () ->
    let json = parseOrRaise {| { "foo": [1, 2, 3], "bar": "baz" } |} in
    expect @@
      (field "foo" (array int) json, field "bar" string json)
      |> toEqual ([| 1; 2; 3 |], "baz"));
);
