import { uniqueNodes, groupByComponents, getStartNodes, makeOutgoingEdges } from './helpers.js'
import { validateEdges, validateArgs } from './validators.js'

import { toposortCore } from './toposort.js'

export function toposortExtra (...args) {
  validateArgs(...args)
  const [arg1, arg2] = args

  const nodes = arg2 ? arg1 : uniqueNodes(arg1)
  const edges = arg2 ? arg2 : arg1 // eslint-disable-line unicorn/prefer-logical-operator-over-ternary

  validateEdges(nodes, edges)

  return groupByComponents(edges)
    .map(componentEdges => {
      const outgoing = makeOutgoingEdges(componentEdges)
      return {
        startNodes: getStartNodes(componentEdges),
        array: toposortCore(uniqueNodes(componentEdges), componentEdges)
          .map(node => [node, [...outgoing.get(node)]])
      }
    })
}

