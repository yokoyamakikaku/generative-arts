const CELL_SIZE_UNIT = 0.5

class Computer {
  constructor({ x, y, unit, colors, shapeVectors, label, labelPosition, labelScale }) {
    const u = unit
    this.unit = unit
    this.colors = colors
    this.font = 'Roboto'
    this.fontStyle = BOLD
    this.fontSize = u(4.5)
    this.labelScale =labelScale || createVector(1, 1)

    this.position =  createVector(x, y)
    this.shapeVectors = shapeVectors
    this.label = label
    this.labelPosition = labelPosition

    this.memories = Computer.createMemories(shapeVectors, u(CELL_SIZE_UNIT))

    const {
      TRANSPARENT,
      BLACK,
      ORANGE,
      BLUE,
    } = this.colors

    this.shapeOptions = [
      [TRANSPARENT, ORANGE, u(0.8)],
      [TRANSPARENT, BLACK, u(0.4)],
      // [BLACK, TRANSPARENT, 0],
    ]
  }

  isAll(value) {
    return this.memories.current.every(column =>
      column.every(
        v => {
          const s = Computer.valueToStatus(v)
          return s === Computer.UNKNOWN || s === value
        }
      )
    )
  }

  get isPositive () {
    return this.isAll(Computer.POSITIVE)
  }

  get isNegative () {
    return this.isAll(Computer.NEGATIVE)
  }

  show () {
    push()
    translate(this.position)
    this.showMemories()
    this.showShape()
    this.showLabel()
    pop()
  }

  showMemories() {
    const u = this.unit,
          {
            BLACK,
            BLUE,
            RED,
            TRANSPARENT
          } = this.colors,
          {
            current
          } = this.memories,
          cellSize = u(CELL_SIZE_UNIT)

    noStroke()

    const s = Computer.valueToStatus,
          v = Computer.getMemoryValue

    current.forEach((column,x) => {
      column.forEach((value, y) => {
        push()

        const status = s(value),
              eStatus = s(v(current, x - 1, y, -1)),
              nStatus = s(v(current, x, y - 1, -1))

        translate(x * cellSize, y * cellSize)

        noStroke()
        switch (status) {
          case Computer.POSITIVE:
            fill(BLUE)
            break
          case Computer.NEGATIVE:
            fill(RED)
            break
          case Computer.UNCERTAIN:
            fill(BLACK)
            break
          default:
            fill(TRANSPARENT)
        }
        rect(0, 0, cellSize, cellSize)

        noFill()
        stroke(BLACK)
        strokeWeight(u(0.3))

        if(status !== Computer.UNKNOWN) {
          if (eStatus !== status) line(0, 0, 0, cellSize)
          if (nStatus !== status) line(0, 0, cellSize, 0)
        }

        pop()
      })
    })
  }

  showShape() {
    this.shapeOptions.forEach(([fillColor, strokeColor, weight]) => {
      fill(fillColor)
      stroke(strokeColor)
      strokeWeight(weight)
      beginShape()
      this.shapeVectors.forEach(({x,y}) => vertex(x,y))
      endShape(CLOSE)
    })
  }

  showLabel() {
    const { BLACK } = this.colors,
          { x, y } = this.labelPosition

    push()
    translate(x, y)
    scale(this.labelScale.x, this.labelScale.y)
    fill(BLACK)
    noStroke()
    textFont(this.font)
    textStyle(this.fontStyle)
    textSize(this.fontSize)
    textAlign(CENTER, BOTTOM)
    text(this.label, 0, 0)
    pop()
  }

  update () { }
}

Computer.POSITIVE = 'POSITIVE'
Computer.UNCERTAIN = 'UNCERTAIN'
Computer.NEGATIVE = 'NEGATIVE'
Computer.UNKNOWN = 'UNKNOWN'

Computer.createMemories = function (vectors, cellSize) {
  const { x: baseX, y: baseY, width, height } = getBoundingBox(vectors)

  const xCount = floor(width / cellSize),
        yCount = floor(height / cellSize)

  const current = [],
        next = []

  for (let x = 0; x < xCount; x++) {
    current[x] = []
    next[x] = []
    for (let y = 0; y < yCount; y++) {
      const vector = createVector(
        baseX + x * cellSize + cellSize / 2,
        baseY + y * cellSize + cellSize / 2
      )
      const isInside = isInsideOfShape(vector, vectors)
      current[x][y] = isInside ? 0 : -1
      next[x][y] = isInside ? 0 : -1
    }
  }

  return {
    x: baseX,
    y: baseY,
    xCount,
    yCount,
    current,
    next
  }
}

Computer.getMemoryValue = function (memory, x, y, defaultValue) {
  return (memory[x] === undefined || memory[x][y] === undefined) ? defaultValue : memory[x][y]
}

Computer.valueToStatus = function (value) {
  if (value < 0) {
    return Computer.UNKNOWN
  } else if (value === 1) {
    return Computer.NEGATIVE
  } else if (value === 0) {
    return Computer.POSITIVE
  } else {
    return Computer.UNCERTAIN
  }
}

function getBoundingBox (vectors) {
  let minX, maxX, minY, maxY

  vectors.forEach(({x, y}) => {
    if (minX === undefined || x < minX) minX = x
    if (maxX === undefined || x > maxX) maxX = x
    if (minY === undefined || y < minY) minY = y
    if (maxY === undefined || y > maxY) maxY = y
  })

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  }
}

function isInsideOfShape(vector, vectors) {
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
