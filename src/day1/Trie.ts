type TrieNode = {
    value: string;
    children: (TrieNode | undefined)[]
    isWord: boolean;
}

const ZERO_CHAR = "a".charCodeAt(0)

export default class Trie {

    private head: TrieNode


    constructor() {
        this.head = this.createNode("")
    }

    insert(item: string): void {
        let i = 0;
        let curr = this.head

        do {
            const currentChar = item[i]
            const currentCharIndex = this.getCharIndex(currentChar)
            const nextChild = curr.children[currentCharIndex]
            if (nextChild === undefined) {
                const newNode = this.createNode(currentChar)
                curr.children[currentCharIndex] = newNode
                curr = newNode
            } else {
                curr = nextChild
            }
            i++;
        } while (i < item.length)

        curr.isWord = true
    }

    delete(item: string): void {
        this.deleteStep(this.head, undefined, item, 0)
    }

    find(partial: string): string[] {
        let curr = this.head
        for (let char of partial) {
            const currCharIndex = this.getCharIndex(char)
            const nextChild = curr.children[currCharIndex]
            if (nextChild === undefined) {
                return []
            }
            curr = nextChild
        }
        const finalList: string[] = []

        for (let currChild of curr.children) { this.findStep(currChild, partial, finalList) }

        return finalList
    }

    private getCharIndex(character: string): number {
        return (character?.charCodeAt(0) - ZERO_CHAR)
    }

    private createNode(character: string): TrieNode {
        return {
            value: character,
            children: [],
            isWord: false
        }
    }

    private findStep(node: TrieNode | undefined, runningWord: string, runningList: string[]) {
        if (node === undefined) {
            return
        }

        runningWord += node.value

        if (node.isWord) {
            runningList.push(runningWord)
        }

        if (node.children.length === 0) {
            return
        }

        for (let currChild of node.children) {
            this.findStep(currChild, runningWord, runningList)
        }
    }

    private deleteStep(node: TrieNode | undefined, parent: TrieNode | undefined, item: string, index: number) {
        if (node === undefined || index > item.length) {
            return
        }

        const charIndex = this.getCharIndex(item[index])
        this.deleteStep(node.children[charIndex], node, item, index + 1)

        if (parent === undefined) {
            return
        }

        if (node.children.every((item) => item === undefined)) {
            const valueIndex = this.getCharIndex(node.value)
            parent.children[valueIndex] = undefined
        } else if (node.isWord && index === item.length) {
            node.isWord = false
        }
    }
}
