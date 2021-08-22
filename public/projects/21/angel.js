class Angel {
  constructor(computer) {
    this.computer = computer
    this.bornedAt = frameCount

    this.x = computer.column - 1
    this.y = computer.row - 1
    this.direction = TWO_PI * 5 / 8
  }

  get age () {
    return frameCount - this.bornedAt
  }

  get power() {
    const { column, row } = this.computer
    return constrain(floor(this.age / 2), 1, max(column, row) * sqrt(2))
  }

  show() {
    // const {
    //   x, y,
    //   power, direction,
    //   computer: {
    //     x: cx,
    //     y: cy,
    //     cell: {
    //       width: w,
    //       height: h
    //     }
    //   }
    // } = this

    // push()

    // noFill()
    // stroke('lightblue')
    // strokeWeight(1)

    // translate(cx, cy)

    // {
    //   push()
    //   translate(x * w, y * h)
    //   translate(w / 2,  h / 2)
    //   circle(0, 0, 4)
    //   circle(cos(TWO_PI * 2 / 4) * power * w, 0, 4)
    //   circle(0, sin(TWO_PI * 3 / 4) * power * h, 4)
    //   line(0, 0, cos(direction) * power * w, sin(direction) * power * h)
    //   rect(
    //     cos(TWO_PI * 2 / 4) * power * w,
    //     sin(TWO_PI * 3 / 4) * power * h,
    //     power * w * 2,
    //     power * h * 2,
    //   )
    //   ellipse(
    //     0,
    //     0,
    //     power * w * 2,
    //     power * h * 2,
    //   )
    //   pop()
    // }

    // pop()
  }

  update() {
    const { computer, power, x, y } = this,
          { row, column } = computer,
          x1 = constrain(x + power * floor(cos(TWO_PI * 2 / 4)), 0, column - 1),
          y1 = constrain(y + power * floor(sin(TWO_PI * 3 / 4)), 0, row - 1),
          x2 = constrain(x1 + power * 2, 0, column),
          y2 = constrain(y1 + power * 2, 0, row)

    computer.forEach((value, { x: px, y: py}) => {
      if (sqrt(pow(px - x, 2) + pow(py - x, 2)) >= power) return

      computer.set(px, py, value - random(0.05, 0.1))
    }, x1, y1, x2, y2)
  }
}
