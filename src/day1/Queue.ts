type Node<T> = {
    value: T
    next?: Node<T>
}

export default class Queue<T> {
    public length: number;

    private head?: Node<T>
    private tail?: Node<T>

    constructor() {
        this.length = 0
        this.head = this.tail = undefined
    }

    enqueue(item: T): void {
        const newNode = { value: item } as Node<T>
        this.length++
        if (!this.tail) {
            this.head = this.tail = newNode
            return
        }
        this.tail.next = newNode
        this.tail = newNode
    }
    deque(): T | undefined {
        if (!this.head) {
            return undefined
        }
        this.length--
        const oldHead = this.head
        if (this.length !== 0) {
            this.head = this.head.next
            oldHead.next = undefined
        } else {
            this.head = this.tail = undefined
        }

        return oldHead.value
    }
    peek(): T | undefined {
        this.debug()
        return this.head?.value
    }
    private debug() {
        let out = "head"
        let curr = this.head
        for (let i = 0; i < this.length; i++) {
            out += ` -> ${curr?.value}`
        }
        out += " <- tail"
        console.log(out)
    }
}
