export default function dfs(
    head: BinaryNode<number> | null,
    needle: number,
): boolean {
    // base case
    if (!head) {
        return false;
    }

    if (head.value === needle) {
        return true;
    }

    // recurse
    if (head.value < needle) {
        return dfs(head?.right, needle);
    } else if (head.value > needle) {
        return dfs(head?.left, needle);
    }

    return false;
}
