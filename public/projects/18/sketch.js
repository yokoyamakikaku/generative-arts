const WIDTH = 512,
  HEIGHT = 512,
  CELL_SIZE = 8

let tables, vectors

function setup() {
  createCanvas(WIDTH, HEIGHT)

  vectors = [
    createVector( 100 + random(-100, 100), 100 + random(-100, 100)),
    createVector( 300 + random(-100, 100), 100 + random(-100, 100)),
    createVector( 400 + random(-100, 100), 200 + random(-100, 100)),
    createVector( 400 + random(-100, 100), 400 + random(-100, 100)),
    createVector( 200 + random(-100, 100), 400 + random(-100, 100)),
    createVector( 100 + random(-100, 100), 300 + random(-100, 100)),
  ]

  tables = createTables(vectors)

  let count = 10
  tables.current.forEach((column, x) => {
    if (count < 1) return
    column.forEach((value, y) => {
      if (count < 1) return
      if (value === 0 && random(0, 1) > 0.9) {
        tables.current[x][y] = 1
        count--
      }
    })
  })
}

function draw() {
  show()
  update()
}

function show() {
  background(240)

  push()
  {
    const { x, y, current } = tables
    translate(x, y)
    strokeWeight(0.5)
    current.forEach((column, x) => {
      column.forEach((value, y) => {
        const c = valueToColor(value)
        fill(c)
        noStroke()
        rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE)

        if (value < 0) return

        noFill()
        stroke('black')
        if (equalTableValue(current, x - 1, y, v => valueToColor(v) !== c)) {
          let x1 = x * CELL_SIZE,
              y1 = y * CELL_SIZE,
              x2 = x1,
              y2 = y1 + CELL_SIZE
          line(x1, y1, x2, y2)
        }
        if (equalTableValue(current, x, y - 1, v => valueToColor(v) !== c)) {
          let x1 = x * CELL_SIZE,
              y1 = y * CELL_SIZE,
              x2 = x1 + CELL_SIZE,
              y2 = y1
          line(x1, y1, x2, y2)
        }
      })
    })
  }
  pop()

  stroke('gray')
  strokeWeight(1)
  noFill()
  beginShape()
  vectors.map(({x, y}) => vertex(x, y))
  endShape(CLOSE)

  update()
  // noLoop()
}

function update() {
  const { current, next } = tables

  current.forEach((column, x) => {
    column.forEach((value, y) => {
      if (value < 0) return

      if (value === 1) return

      if (value === 0) {
        if (
          equalTableValue(current, x - 1, y, (value) => value > 0.9)
          || equalTableValue(current, x + 1, y, (value) => value > 0.9)
          || equalTableValue(current, x, y - 1, (value) => value > 0.9)
          || equalTableValue(current, x, y + 1, (value) => value > 0.9)
        ) {
          next[x][y] = 0.1
        }
        return
      }

      next[x][y] = min(value + 0.2,  1)
    })
  })

  tables.current = next
  tables.next = current
}

function equalTableValue(table, x, y, callback) {
  if(!table[x]) return false
  if(!table[x][y]) return false
  return callback(table[x][y])
}

function valueToColor (value) {
  if (value < 0) return 'transparent'
  if (value === 1) return 'pink'
  if (value === 0) return 'skyblue'
  return 'black'
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

function createTables (vectors) {
  const { x: baseX, y: baseY, width, height } = getBoundingBox(vectors)

  const xCount = floor(width / CELL_SIZE),
        yCount = floor(height / CELL_SIZE)

  const current = [],
        next = []

  for (let x = 0; x < xCount; x++) {
    current[x] = []
    next[x] = []
    for (let y = 0; y < yCount; y++) {
      const vector = createVector(
        baseX + x * CELL_SIZE + CELL_SIZE / 2,
        baseY + y * CELL_SIZE + CELL_SIZE / 2
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
