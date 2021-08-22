class Board {
  constructor(vectors) {
    const [ minX, minY, maxX, maxY ] = vectors.reduce(([minX,minY,maxX,maxY], { x, y }) => ([
      floor(minX === null || x < minX ? x : minX),
      floor(minY === null || y < minY ? y : minY),
      floor(maxX === null || x > maxX ? x : maxX),
      floor(maxY === null || y > maxY ? y : maxY)
    ]), [null, null, null, null])

    this.vectors = vectors
    this.x = minX
    this.y = minY
    this.column = floor((maxX - minX) / Board.CELL_SIZE)
    this.row = floor((maxY - minY) / Board.CELL_SIZE)
    this.data = Board.createData(this.x, this.y, this.column, this.row, this.vectors, Board.READY)
  }

  position(index) {
    if (!this.exists(index)) throw `Out of length, ${index}`
    return {
      x: index % this.column,
      y: floor(index / this.column)
    }
  }

  index(x, y) {
    if (!this.exists(x, y)) throw `Out of area, (${x}, ${y}) column:${this.column}, row:${this.row}`
    return x + y * this.column
  }

  get(x, y) {
    return this.data[this.index(x,y)]
  }

  set() {
    if (arguments.length === 3) {
      const [x, y, value] = arguments
      this.data[this.index(x,y)] = value
    }

    if (arguments.length === 5) {
      const [baseX, baseY, width, height, value] = arguments
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          this.set(baseX + x, baseY + y, value)
        }
      }
    }
  }

  setAll(value) {
    this.data = this.data.map(v => v < 0 ? -1 : value)
  }

  every(value) {
    return this.data.every(v => v < 0 || v === value)
  }

  forEach() {
    if (arguments.length === 1) {
      const [callback] = arguments
      this.data.forEach((value, index) =>
        callback(value, this.position(index))
      )
      return
    }

    if (arguments.length === 5) {
      const [baseX, baseY, width, height, callback] = arguments
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          callback(
            this.get(baseX + x, baseY + y),
            {
              x: baseX + x,
              y: baseY + y
            }
          )
        }
      }
      return
    }
  }

  exists() {
    if (arguments.length === 1) {
      const [index] = arguments
      return !!(0 <= index && index <= this.data.length)
    }
    if (arguments.length === 2) {
      const [x, y] = arguments
      return !!(0 <= x && x < this.column && 0 <= y && y < this.row)
    }
  }

  equal(x, y, callback) {
    return this.exists(x, y) && callback(this.get(x, y))
  }

  show() {
    this.forEach((current, {x, y}) => {
      if (current < 0) return

      const c = Board.valueToColor(current)

      push()

      translate(this.x + x * Board.CELL_SIZE, this.y + y * Board.CELL_SIZE)
      fill(c)
      noStroke()
      rect(0, 0, Board.CELL_SIZE, Board.CELL_SIZE)

      stroke(BLACK)
      strokeWeight(2)

      const callback = neighbor => neighbor >= 0 && neighbor !== current
      if(this.equal(x - 1, y, callback)) line(0, 0, 0, Board.CELL_SIZE)
      if(this.equal(x, y - 1, callback)) line(0, 0, Board.CELL_SIZE, 0)

      pop()
    })
  }
}

Board.CELL_SIZE = 8

Board.BLANK = -1
Board.NEGATIVE = 0
Board.NUTRAL = 1
Board.POSITIVE = 1
Board.READY = 2

Board.valueToColor = function(value) {
  if (value < 0) {
    return null
  } else if (value < 0.2) {
    return BLUE
  } else if (value < 0.8) {
    return BLACK
  } else if (value <= 1) {
    return RED
  } else {
    return GREEN
  }
}

Board.createData = function (baseX, baseY, column, row, vectors, initialValue = Board.READY) {
  const data = []

  function isInclude(vector) {
    const count = vectors.reduce((count, corner, index, vectors) => {
      const { length } = vectors,
            current    = corner,
            next       = vectors[(length + index + 1) % length]

      if (
        (vector.y　<= current.y && vector.y < next.y)
        || (vector.y >= current.y && vector.y > next.y)
      ) return count

      const m = (next.y - current.y) / (next.x - current.x)
      const crossedX = abs(m) === Infinity ? current.x : (
        current.x + (vector.y - current.y) / m
      )
      if (crossedX < vector.x) return count

      return  count + 1
    }, 0)

    return !(count % 2 === 0)
  }

  for (let y = 0; y < row; y++) {
    for (let x = 0; x < column; x++) {
      const vector = createVector(baseX + (x + 0.5) * Board.CELL_SIZE, baseY + (y + 0.5) * Board.CELL_SIZE)
      data.push(isInclude(vector) ? initialValue : Board.BLANK)
    }
  }

  return data
}
