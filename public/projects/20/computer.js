
class Computer {
  constructor (x, y, width, height, xCount, yCount) {
    this.bornedAt = frameCount
    this.position = createVector(x, y)
    this.width = width
    this.height = height
    this.xCount = xCount
    this.yCount = yCount
    this.data = []

    for(let x = 0; x < xCount; x++) {
      this.data[x] = []
      for(let y = 0; y < yCount; y++) {
        this.data[x][y] = 0
      }
    }
  }

  get cellWidth () {
    return this.width / this.xCount
  }

  get cellHeight () {
    return this.height / this.yCount
  }

  exists(x,y) {
    if (!this.data.hasOwnProperty(x)) return false
    if (!this.data[x].hasOwnProperty(y)) return false
    return true
  }

  set (x, y, value) {
    if(!this.exists(x, y)) return

    this.data[x][y] = constrain(
      (typeof value === "function") ? value(this.data[x][y]) : value,
      0, 1
    )
  }

  get (x, y) {
    return this.data[x][y]
  }

  equalTo (x, y, value) {
    if(!this.exists(x, y)) return false
    if (typeof value === "function") return value(this.data[x][y])
    return this.data[x][y] === value
  }

  every (callback, x1 = 0, y1 = 0, x2 = this.xCount, y2 = this.yCount) {
    for (let x = x1; x < x2; x++) {
      for (let y = y1; y < y2; y++) {
        if (!callback(this.data[x][y], x, y)) {
          return false
        }
      }
    }
    return true
  }

  some (callback, x1 = 0, y1 = 0, x2 = this.xCount, y2 = this.yCount) {
    for (let x = x1; x < x2; x++) {
      for (let y = y1; y < y2; y++) {
        if (callback(this.data[x][y], x, y)) {
          return true
        }
      }
    }
    return false
  }

  forEach (callback, x1 = 0, y1 = 0, x2 = this.xCount, y2 = this.yCount) {
    for (let x = x1; x < x2; x++) {
      for (let y = y1; y < y2; y++) {
        callback(this.data[x][y], x, y)
      }
    }
    return false
  }

  show () {
    const {
      width, height,
      position: { x, y },
      cellWidth: w,
      cellHeight: h
    } = this

    push()

    translate(x, y)

    this.forEach((value, x, y) => {
      push()

      translate(x * w, y * h)
      stroke(244, 0)
      fill(Computer.valueToColor(value))
      rect(0, 0, w, h)

      stroke('black')
      strokeWeight(2)
      noFill()
      if (this.equalTo(x-1, y, v => v !== value)) line(0, 0, 0, h)
      if (this.equalTo(x, y-1, v => v !== value)) line(0, 0, w, 0)

      pop()
    })

    stroke(color("#F2A20C"))
    noFill()
    strokeWeight(2)
    rect(-2, -2, width + 4, height + 4)

    pop()
  }
}

Computer.valueToColor = function (value) {
  if (value < 0) return color(0,0,0,0)
  if (value < 0.4) return color('#9EF5FF')
  if (value > 0.6) return color('#C70C00')
  return color('black')
}
