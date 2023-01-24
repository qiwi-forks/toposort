import { suite } from 'uvu'
import assert from 'node:assert'
import { toposort2default, toposort2 } from '../../main/js/new.js'
import { oneComponentGraph, oneComponentGraphWithComplexLoop, twoComponentGraph } from './graphs.js'

const test = suite('array')


test('toposort2default returns separate arrays for separate graphs', () => {
  const res = toposort2default(twoComponentGraph)

  assert.deepEqual(
    res,
    [
      {
        startNodes: [1], // Array<number|string>
        array: [
          [1, [3, 2]], // [name: number|string, children: Array<number|string>]
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
  )
})

test('toposort2default returns one array for one graph', () => {
  const res = toposort2default(oneComponentGraph)

  assert.deepEqual(
    res,
    [
      {
        startNodes: [1], // Array<number|string>
        array: [
          [1, [3, 2]], // [name: number|string, children: Array<number|string>]
          [3, [2]],
          [2, [4, 5]],
          [4, [9]],
          [5, [6]],
          [6, [7, 8]],
          [9, [8]],
          [7, []],
          [8, []],
        ],
      },
    ],
  )
})

test('toposort2default throws an error for cyclic graph', () => {
  assert.throws(
    () => toposort2default([[1, 3], [1, 2], [2,4], [2,5], [6, 7], [6, 8], [9, 8], [7, 6]]),
    {
      message: 'Cyclic dependency, node was:7'
    }
  )
})

test('toposort2default throws an error for a graph with a complex cycle', () => {
  assert.throws(
    () => toposort2default(oneComponentGraphWithComplexLoop),
    {
      message: 'Cyclic dependency, node was:7'
    }
  )
})


test('toposort2 throws an error when there are unknown nodes', () => {
  assert.throws(
    () => toposort2([1, 2, 4, 5, 6, 7, 8, 9], [[1, 3], [1, 2], [2, 4], [2, 5], [6, 7], [6, 8], [9, 8], [7, 6]]),
    {
      message: 'Unknown node. There is an unknown node in the supplied edges.',
    },
  )
})

test.run()
