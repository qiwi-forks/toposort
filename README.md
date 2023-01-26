# @qiwi/toposort

Fork of [toposort](https://github.com/marcelklehr/toposort) with updated dependencies and some new features

## Why?

Toposort is wonderful, but we also need to know which parts of graph can be handled in parallel mode.

A graph can have unconnected parts called [graph components](https://en.wikipedia.org/wiki/Component_(graph_theory)).

These parts can be handled simultaneously because they are not connected to each other.

So, toposortExtra returns a list of graph components and their [topologically ordered](https://en.wikipedia.org/wiki/Topological_sorting) nodes.

This can be useful in parallelization of handling something in topological order.

## Installation

```shell
yarn add @qiwi/toposort

npm i @qiwi/toposort
```

## Usage

### toposortExtra(nodes, edges) | toposortExtra(edges)

Returns an array of the graph components 

```js
import { toposortExtra } from '@qiwi/toposort'

const res = toposortExtra([[1, 3], [1, 2], [2, 4], [2, 5], [6, 7], [6, 8], [9, 8]])
const res2 = toposortExtra(
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [[1, 3], [1, 2], [2, 4], [2, 5], [6, 7], [6, 8], [9, 8]]
) // the same, but also checks edge nodes to be in the node list

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

### toposort(edges)

Marcelklehr's original toposort

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

### array(nodes, edges)

Marcelklehr's original toposort.array.

Checks edge nodes for presence in the nodes array

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
