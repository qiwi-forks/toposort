import { suite } from 'uvu'
import assert from 'node:assert'
import { toposortExtra } from '../../main/js/extra.js'
import {
  oneComponentGraph,
  oneComponentGraphWithComplexLoop,
  twoComponentGraph,
  twoComponentGraphWithLoop,
  generateSquareDenseGraph,
} from './graphs.js'

const test = suite('array')


test('toposortExtra returns separate arrays for separate graphs', () => {
  const res = toposortExtra(twoComponentGraph)

  assert.deepEqual(
    res,
    [
      {
        startNodes: [1],
        array: [
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
  )
})

test('toposortExtra returns one array for one graph', () => {
  const res = toposortExtra(oneComponentGraph)

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

test('toposortExtra works with giant one-component graph with in 100 ms', () => {
  const width = 50
  const height = 50
  const nodesCount = width * height
  const graph = generateSquareDenseGraph({ width, height, prefix: 'a' })
  graph.sort(() => Math.random() > 0.5 ? 1 : -1)

  const start = Date.now()
  const res = toposortExtra(graph)
  const diff = Date.now() - start

  assert.ok(diff < 100)
  assert.equal(res.length, 1)
  assert.deepEqual(
    res[0].startNodes,
    ['a0_0'],
  )
  assert.equal(res[0].array.length, nodesCount)
})

test('toposortExtra works with giant four-component graph with in 100 ms', () => {
  const width = 50
  const height = 50
  const nodesCount = width * height * 4
  const graph = [
    ...generateSquareDenseGraph({ width, height, prefix: 'a' }),
    ...generateSquareDenseGraph({ width, height, prefix: 'b' }),
    ...generateSquareDenseGraph({ width, height, prefix: 'c' }),
    ...generateSquareDenseGraph({ width, height, prefix: 'd' })
  ]
  graph.sort(() => Math.random() > 0.5 ? 1 : -1)

  const start = Date.now()
  const res = toposortExtra(graph)
  const diff = Date.now() - start

  assert.ok(diff < 100)
  assert.equal(res.length, 4)
  assert.deepEqual(
    res.reduce((acc, component) => [...acc, ...component.startNodes], []).sort(),
    ['a0_0', 'b0_0', 'c0_0', 'd0_0'].sort(),
  )
  assert.equal(res.reduce((acc, component) => acc + component.array.length, 0), nodesCount)
})

test('toposortExtra throws an error for cyclic graph', () => {
  assert.throws(
    () => toposortExtra(twoComponentGraphWithLoop),
    {
      message: 'Cyclic dependency, node was:7',
    },
  )
})

test('toposortExtra throws an error for a graph with a complex cycle', () => {
  assert.throws(
    () => toposortExtra(oneComponentGraphWithComplexLoop),
    {
      message: 'Cyclic dependency, node was:7',
    },
  )
})

test('toposortExtra throws an error when there are unknown nodes', () => {
  assert.throws(
    () => toposortExtra([1, 2, 4, 5, 6, 7, 8, 9], [[1, 3], [1, 2], [2, 4], [2, 5], [6, 7], [6, 8], [9, 8], [7, 6]]),
    {
      message: 'Unknown node. There is an unknown node in the supplied edges.',
    },
  )
})

test.run()
