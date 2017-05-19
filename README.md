# bs-json

VERY experimental JSON encode/decode library for BuckleScript.

## Example

```ml
type address = {
  city: string;
  state: string
}

type person = {
  id: int;
  name: string;
  age: int option;
  address: address option
}

let parseAddress json: address =
  let open Json.Decode in {
    city = json |> field "city" string;
    state = json |> field "state" string
  }

let parsePerson json: person =
  let open Json.Decode in {
    id = json |> field "id" int;
    name = json |> field "name" string;
    age = json |> optional (field "age" int);
    address = json |> optional (field "address" parseAddress)
  }


let data = "{\"id\":1,\"name\":\"brad\",\"age\":27,\"address\":{\"city\":\"city1\",\"state\":\"state1\"}}"

let _ =
  Js.Json.parseExn data
  |> parsePerson
  |> Js.log
```

See [examples](https://github.com/BuckleTypes/bs-json/blob/master/examples/examples.ml) for more.
