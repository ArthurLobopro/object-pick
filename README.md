# object-pick

Easy Pick object properties or clone objects.

## How to use

```ts
import { pick, pickAllExcept, pickAll } from "object-pick"

const obj = { foo: 11, bar: 22, foobar: 33 }

const onlyBar = pick(obj, ["bar"]) //Returns { bar: 22 }
const exceptBar = pickAllExcept(obj, ["bar"]) //Returns { foo: 11, foobar: 33 }
const clonedObj = pickAll(obj) // Retorns a deep clone of obj. If clone has object properties, changing these properties on cloneObj will not change obj properties.

```