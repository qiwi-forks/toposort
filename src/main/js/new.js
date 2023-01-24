import { uniqueNodes, groupByComponents, getStartNodes, makeOutgoingEdges } from './helpers.js'
import { validateEdges } from './validators.js'

import { toposortCore } from './toposort.js'

export function toposort2 (nodes, edges) {
  validateEdges(nodes, edges)

  return groupByComponents(edges)
    .map(componentEdges => {
      const outgoing = makeOutgoingEdges(componentEdges)
      return {
        startNodes: getStartNodes(componentEdges),
        array: toposortCore(uniqueNodes(componentEdges), componentEdges)
          .map(node => [node, Array.from(outgoing.get(node))])
      }
    })
}

export function toposort2default (edges) {
  return toposort2(uniqueNodes(edges), edges)
}
