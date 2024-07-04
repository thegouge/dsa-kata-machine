type Node<T> = {
    value: T
    previous?: Node<T>
}

export default class Stack<T> {
    public length: number;

    private head?: Node<T>

    constructor() {
        this.length = 0
        this.head = undefined
    }

    push(item: T): void {
        const newNode = { value: item } as Node<T>
        this.length++

        if (!this.head) {
            this.head = newNode
            return
        }
        
        newNode.previous = this.head
        this.head = newNode
    }
    pop(): T | undefined {
        if (!this?.head) {
            return undefined
        }
        this.length--
        const oldHead = this.head
        this.head = this.head.previous
        oldHead.previous = undefined
        return oldHead.value
    }
    peek(): T | undefined {
        return this.head?.value
    }
}
