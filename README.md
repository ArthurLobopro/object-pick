# object-pick

Easy Pick object properties or clone objects.

## How to use

```ts
import { pick, pickAllExcept, pickAll } from "@arthur-lobo/object-pick"

const obj = { foo: 11, bar: 22, foobar: 33 }

const onlyBar = pick(obj, ["bar"]) // Returns { bar: 22 }
const exceptBar = pickAllExcept(obj, ["bar"]) // Returns { foo: 11, foobar: 33 }
const clonedObj = pickAll(obj) // Returns a deep clone of obj.
```