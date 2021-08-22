class Melchior extends Computer {
  constructor (options) {
    const u = options.unit
    super({
      shapeVectors: [
        createVector(u(17), u( 0)),
        createVector(u(37), u( 0)),
        createVector(u(37), u(25)),
        createVector(u( 0), u(25)),
        createVector(u( 0), u(12)),
      ],
      label: 'MELCHIOR 1',
      labelPosition: createVector(u(20), u(17.5)),
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
