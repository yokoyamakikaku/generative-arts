
class Computer {
  constructor (x, y, width, height, column, row) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.column = column
    this.row = row
    this.data = []

    this.init(1)
  }

  init (value = 0) {
    for (var i = 0; i < this.size; i++) {
      this.data[i] = value
    }
  }

  get size () {
    return this.column * this.row
  }

  get cell () {
    return {
      width: this.width / this.column,
      height: this.height / this.row
    }
  }

  index (x, y) {
    return x + y * this.column
  }

  position (index) {
    return { x: index % this.column, y: floor(index / this.row) }
  }

  exists(x, y) {
    if (
      x < 0 || this.column < x
      || y < 0 || this.row < y
    )  return false
    return true
  }

  set (x, y, value) {
    this.data[this.index(x, y)] = constrain(value, 0, 1)
  }

  get (x1, y1, x2, y2) {
    if (arguments.length == 2) return this.data[this.index(x1, y1)]

    const data = []
    for (let x = x1; x < x2; x++) {
      for (let y = y1; y < y2; y++) {
        data.push(this.get(x,y))
      }
    }
    return data
  }

  equalTo (x, y, value) {
    if(!this.exists(x, y)) return false
    return (typeof value === "function") ? value(this.get(x, y)) : this.get(x, y) === value
  }

  every (callback, x1 = 0, y1 = 0, x2 = this.column, y2 = this.row) {
    return this.get(x1, y1, x2, y2).every((value, index) => callback(value, this.position(index)))
  }

  some (callback, x1 = 0, y1 = 0, x2 = this.column, y2 = this.row) {
    return this.get(x1, y1, x2, y2).some((value, index) => callback(value, this.position(index)))
  }

  forEach (callback, x1 = 0, y1 = 0, x2 = this.column, y2 = this.row) {
    const c = x2 - x1,
          r = y2 - y1
    return this.get(x1, y1, x2, y2).forEach((value, index) => {
      callback(value, {
        x: x1 + index % c,
        y: y1 + floor(index / r),
      })
    })
  }

  show () {
    const {
      x, y, width, height,
      data,
      cell: {
        width: w,
        height: h
      }
    } = this

    push()

    translate(x, y)

    data.forEach((value, index) => {
      push()
      const { x, y } = this.position(index)

      translate(x * w, y * h)
      stroke(244, 0)
      strokeWeight(1)
      fill(Computer.valueToColor(value))
      rect(0, 0, w, h)

      stroke('black')
      strokeWeight(2)
      noFill()
      if (this.equalTo(x - 1, y, v => v !== value)) line(0, 0, 0, h)
      if (this.equalTo(x, y - 1, v => v !== value)) line(0, 0, w, 0)

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
