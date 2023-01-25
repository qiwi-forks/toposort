import { suite } from 'uvu'
import { validateArgs, validateEdges } from '../../main/js/validators.js'
import assert from 'node:assert'

const test = suite('validators')

const validateArgsTestCases = [
  {
    description: 'it throws when there are no arguments',
    input: [],
    throws: true
  },
  {
    description: 'it does not throw when edges are given ',
    input: [[[1, 2], [2, 3]]],
    throws: false
  },
  {
    description: 'it does not throw when edges and nodes are given',
    input: [[1, 2, 3], [[1, 2], [2, 3]]],
    throws: false
  },
  {
    description: 'throws when the first arg is undefined',
    input: [undefined, [[1, 2], [2, 3]]],
    throws: true
  },
  {
    description: 'throws when the second arg is undefined',
    input: [[1, 2, 3], undefined],
    throws: true
  },
]

validateArgsTestCases.forEach(({ description, input, throws }) => test(description, () => {
  if (throws) {
    assert.throws(() => validateArgs(...input))
  } else {
    validateArgs(...input)
  }
}))

const validateEdgesTestCases = [
  {
    description: 'it does not throw without unknown nodes',
    input: [[1, 2, 3], [[1, 2], [2, 3]]],
    throws: false
  },
  {
    description: 'it throws when there are unknown nodes',
    input: [[1, 2, 3], [[1, 2], [2, 4]]],
    throws: true
  }
]

validateEdgesTestCases.forEach(({ description, input, throws }) => test(description, () => {
  if (throws) {
    assert.throws(() => validateEdges(...input))
  } else {
    validateArgs(...input)
  }
}))

test.run()
