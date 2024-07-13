export default class MinHeap {
    public length: number;

    private data: number[]

    constructor() {
        this.length = 0
        this.data = []
    }

    insert(value: number): void {
        this.length++
        this.data[this.length - 1] = value
        this.heapifyUp(this.length - 1)
    }

    delete(): number {
        if (this.length === 0) {
            return -1
        }

        const deletedValue = this.data[0]
        this.length--

        if (this.length === 0) {
            this.data = []
            return deletedValue
        }

        this.data[0] = this.data[this.length]
        this.heapifyDown(0)
        return deletedValue
    }

    private getLeftChild(idx: number): number {
        return (idx * 2) + 1
    }

    private getRightChild(idx: number): number {
        return (idx * 2) + 2
    }

    private getParent(idx: number): number {
        return Math.floor((idx - 1) / 2)
    }

    private heapifyUp(idx: number) {
        if (idx <= 0) {
            return
        }

        const parent = this.getParent(idx)
        if (this.data[idx] < this.data[parent]) {
            this.swap(idx, parent)
            this.heapifyUp(parent)
        }
    }

    private heapifyDown(idx: number) {
        const left = this.getLeftChild(idx)
        const right = this.getRightChild(idx)

        if (idx >= this.length || left >= this.length) {
            return
        }

        const rVal = this.data[right]
        const lVal = this.data[left]
        const currVal = this.data[idx]

        if (lVal < rVal && currVal > lVal) {
            this.swap(idx, left)
            this.heapifyDown(left)
        }
        else if (rVal < lVal && currVal > rVal) {
            this.swap(idx, right)
            this.heapifyDown(right)
        }
    }

    private swap(a: number, b: number) {
        const tmp = this.data[a]
        this.data[a] = this.data[b]
        this.data[b] = tmp
    }
}
