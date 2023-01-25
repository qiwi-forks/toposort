import { suite } from 'uvu'
import assert from 'node:assert'
import { makeIncomingEdges, groupByComponents } from '../../main/js/helpers.js'
import { oneComponentGraphWithLoop, twoComponentGraph, oneComponentGraph, twoComponentGraphWithLoop } from './graphs.js'

const test = suite('helpers')

const makeIncomingEdgesTests = [
  {
    input: [[1, 3], [1, 2], [2, 4], [2, 5], [6, 7], [6, 8], [9, 8]],
    output: new Map(
      [
        [1, new Set()],
        [2, new Set([1])],
        [3, new Set([1])],
        [4, new Set([2])],
        [5, new Set([2])],
        [6, new Set()],
        [7, new Set([6])],
        [8, new Set([6, 9])],
        [9, new Set()],
      ],
    ),
  },
]

makeIncomingEdgesTests.forEach(({ input, output }) => {
  test(`makeIncomingEdges(${input})`, () => {
    assert.deepEqual(makeIncomingEdges(input), output)
  })
})

const groupByComponentsTests = [
  {
    description: 'two component graph',
    input: twoComponentGraph,
    output: [
      [[1, 3], [1, 2], [2, 4], [2, 5]],
      [[6, 7], [6, 8], [9, 8]],
    ],
  },
  {
    description: 'the same two component graph but the order differs',
    input: [[1, 3], [2, 5], [6, 7], [2, 4], [6, 8], [9, 8], [1, 2]], // the same graph but the order differs
    output: [
      [[1, 3], [2, 5], [2, 4], [1, 2]],
      [[6, 7], [6, 8], [9, 8]],
    ],
  },
  {
    description: 'one component graph',
    input: oneComponentGraph, // one graph
    output: [
      oneComponentGraph,
    ],
  },
  {
    description: 'one component graph with loop',
    input: oneComponentGraphWithLoop,
    output: [
      oneComponentGraphWithLoop
    ]
  },
  {
    description: 'two component graph with loop',
    input: twoComponentGraphWithLoop,
    output: [
      [[1, 3], [1, 2], [2, 4], [2, 5]],
      [[6, 7], [6, 8], [9, 8], [7, 6]],
    ]
  },
  {
    description: 'empty graph',
    input: [],
    output: []
  }
]

 groupByComponentsTests.forEach(({ description, input, output }) => {
  test(`groupByComponents, ${description}`, () => {
    const res = groupByComponents(input)
    assert.deepEqual(res, output)
  })
})

test.run()
