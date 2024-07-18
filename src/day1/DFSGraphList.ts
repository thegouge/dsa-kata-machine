function walk(graph: WeightedAdjacencyList, curr: number, needle: number, seen: boolean[], path: number[]): boolean {
    if (curr === needle) {
        return true
    }

    if (seen[curr]) {
        return false
    }

    path.push(curr)
    seen[curr] = true

    for (let i = 0; i < graph[curr].length; i++) {
        if(walk(graph, graph[curr][i].to, needle, seen, path)) {
            return true
        }
    }

    path.pop()

    return false
}

export default function dfs(graph: WeightedAdjacencyList, source: number, needle: number): number[] | null {
    const seen = new Array(graph.length).fill(false)
    const path: number[] = []

    walk(graph, source, needle, seen, path)

    if (path.length === 0) {
        return null
    }

    return [ ...path, needle ]
}
