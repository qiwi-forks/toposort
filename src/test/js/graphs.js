// src/test/resources/graphs/two-component.svg
export const twoComponentGraph = [[1, 3], [1, 2], [2, 4], [2, 5], [6, 7], [6, 8], [9, 8]]

// src/test/resources/graphs/one-component.svg
export const oneComponentGraph = [[1, 3], [1, 2], [2, 4], [2, 5], [3, 2], [5, 6], [4, 9], [6, 7], [6, 8], [9, 8]]

// src/test/resources/graphs/two-component-graph-with-loop.svg
export const twoComponentGraphWithLoop = [[1, 3], [1, 2], [2, 4], [2, 5], [6, 7], [6, 8], [9, 8], [7, 6]]


// src/test/resources/graphs/one-component-with-loop.svg
export const oneComponentGraphWithLoop = [[6, 7], [6, 8], [9, 8], [7, 6]]

// src/test/resources/graphs/one-component-with-complex-loop.svg
export const oneComponentGraphWithComplexLoop = [[1, 3], [1, 2], [2, 4], [2, 5], [3, 2], [5, 6], [4, 9], [6, 7], [6, 8], [9, 8], [7, 1]]
