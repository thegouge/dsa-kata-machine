import Queue from "./Queue"

export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
    const seen = new Array(graph.length).fill(false)
    const prev = new Array(graph.length).fill(-1)

    seen[source] = true
    const q = new Queue<number>()
    q.enqueue(source)

    do {
        const curr = q.deque() as number
        if (curr === needle) {
            break
        }

        const adjs = graph[curr]
        for (let c = 0; c < graph.length; c++) {
            if (adjs[c] === 0) {
                continue
            }

            if (seen[c]) {
                continue
            }

            seen[c] = true
            prev[c] = curr

            q.enqueue(c)
        }

    } while (q.length > 0)

    if (prev[needle] === -1) {
        return null
    }

    let curr = needle;
    const out: number[] = []

    while (prev[curr] !== -1) {
        out.push(curr)
        curr = prev[curr]
    }

    return [source].concat(out.reverse())
}
