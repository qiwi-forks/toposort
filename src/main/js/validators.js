import { makeNodesHash } from './helpers.js'

export const validateEdges = (nodes, edges) => {
  const nodesHash = makeNodesHash(nodes)
  edges.forEach(function(edge) {
    if (!nodesHash.has(edge[0]) || !nodesHash.has(edge[1])) {
      throw new Error('Unknown node. There is an unknown node in the supplied edges.')
    }
  })
}
