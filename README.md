# @qiwi/toposort

Fork of [toposort](https://github.com/marcelklehr/toposort) with updated dependencies and some new features

## Usage

### toposortExtra

Returns an array of the graph components 

```js
import { toposortExtra } from '@qiwi/toposort'

const res = toposortExtra([1, 2, 3, 4, 5, 6, 7, 8, 9], [[1, 3], [1, 2], [2, 4], [2, 5], [6, 7], [6, 8], [9, 8]])
const res2 = toposortExtra([[1, 3], [1, 2], [2, 4], [2, 5], [6, 7], [6, 8], [9, 8]]) // the same result

console.log(res)
/*
[
  {
    startNodes: [1], // nodes without incoming edges
    array: [ // list of nodes in topological order with accessible neighbors
      [1, [3, 2]],
      [3, []],
      [2, [4, 5]],
      [4, []],
      [5, []],
    ],
  },
    {
      startNodes: [6, 9],
      array: [
        [6, [7, 8]],
        [7, []],
        [9, [8]],
        [8, []],
      ],
    },
  ],
]
 */
```

### toposort

The library also exports marcelklehr's original toposort

```js
import toposort from '@qiwi/toposort' 

console.log(toposort([
    [ '3', '2' ],
    [ '2', '1' ],
    [ '6', '5' ],
    [ '5', '2' ],
    [ '5', '4' ]
  ]
)) // [ '3', '6', '5', '2', '1', '4' ]
```

### array

The library also exports marcelklehr's original toposort.array

```js
import { array } from '@qiwi/toposort' 

console.log(array(
  ['1', '2', '3', '4', '5', '6'],
  [
    [ '3', '2' ],
    [ '2', '1' ],
    [ '6', '5' ],
    [ '5', '2' ],
    [ '5', '4' ]
  ]
)) // [ '3', '6', '5', '2', '1', '4' ]
```
