export function makeOutgoingEdges(arr){
  return arr.reduce((edges, [from, to]) => {
    edges.has(from) || edges.set(from, new Set())
    edges.has(to) || edges.set(to, new Set())
    edges.get(from).add(to)
    return edges
  }, new Map())
}

export function makeIncomingEdges(arr) {
  return arr.reduce((edges, [from, to]) => {
    edges.has(from) || edges.set(from, new Set())
    edges.has(to) || edges.set(to, new Set())
    edges.get(to).add(from)
    return edges
  }, new Map())
}

export function getStartNodes(edges) {
  const incomingEdges = makeIncomingEdges(edges)
  const startNodes = []
  incomingEdges.forEach((value, key) => (value.size === 0) && startNodes.push(key))

  return startNodes
}

export function makeNodesHash(arr){
  return new Map(arr.map((item, i) => [item, i]))
}

export function uniqueNodes(arr){
  const res = new Set()
  for (let i = 0, len = arr.length; i < len; i++) {
    const edge = arr[i]
    res.add(edge[0])
    res.add(edge[1])
  }
  return Array.from(res)
}

export function performDepthFirstFactory({ adjacencyMap, visited }) {
  function performDepthFirst (node) {
    if (!visited.has(node)) {
      visited.add(node)
    }

    adjacencyMap.get(node).forEach(neighbor => {
      if (!visited.has(neighbor)) {
        performDepthFirst(neighbor)
      }
    })
  }

  return performDepthFirst
}

export function getAdjacencyMapOfIndirectedGraph (edges) {
  return edges.reduce((acc, [from, to]) => {
    [
      [from, to],
      [to, from]
    ].forEach(([node, neighbor]) => {
      const neighbors = acc.get(node)
      if (neighbors) {
        neighbors.add(neighbor)
      } else {
        acc.set(node, new Set([neighbor]))
      }
    })
    return acc
  }, new Map())
}

export function groupByComponents(edges) {
  const adjacencyMap = getAdjacencyMapOfIndirectedGraph(edges)
  const nodes = uniqueNodes(edges)
  const components = []
  const visitedNodes = new Set()
  let node = nodes[0]

  while(visitedNodes.size < nodes.length) {
    const visited = new Set()
    performDepthFirstFactory({ adjacencyMap, visited })(node)
    components.push(Array.from(visited))
    visited.forEach(node => visitedNodes.add(node))
    node = nodes.find(node => !visitedNodes.has(node))
  }

  return components.reduce(
    (acc, cur, i) => {
      const set = new Set(cur)
      acc[i].push(...edges.filter(edge => set.has(edge[0]) || set.has(edge[1])))
      return acc
    },
    Array.from({ length: components.length }, () => [])
  )
}
