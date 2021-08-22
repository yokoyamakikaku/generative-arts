class Balthasar extends Computer {
  constructor (options) {
    const u = options.unit
    super({
      shapeVectors: [
        createVector(u( 0), u(    0)),
        createVector(u(32), u(    0)),
        createVector(u(32), u(27.85)),
        createVector(u(22), u(   35)),
        createVector(u(10), u(   35)),
        createVector(u( 0), u(27.85))
      ],
      label: 'BALTHASAR 2',
      labelPosition: createVector(u(16), u(26)),
      ...options
    })
  }

  update() {
    const { current, next } = this.memories,
          v = Computer.getMemoryValue

    current.forEach((column, x) => {
      column.forEach((value, y) => {
        let nextValue

        if (value < 0) {
          nextValue = -1
        } else if (value === 1) {
          nextValue = 1
        } else if (value === 0) {
          if (
            v(current, x - 1, y, null) > 0.8 ||
            v(current, x + 1, y, null) > 0.8 ||
            v(current, x, y - 1, null) > 0.8 ||
            v(current, x, y + 1, null) > 0.8
          ) {
            nextValue = 0.2
          } else {
            nextValue = 0
          }
        } else {
          nextValue = min(value + 0.9, 1)
        }

        next[x][y] = nextValue
      })
    })

    this.memories.current = next
    this.memories.next = current
  }
}
