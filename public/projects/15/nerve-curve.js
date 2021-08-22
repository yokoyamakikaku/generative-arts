class NerveCurve {
  constructor ({ speed, position, color }) {
    this.length = width
    this.size = this.length / 8
    this.weight = this.size / 4
    this.term = floor(this.length / 12)
    this.speed = speed || 2
    this.position = position || 0
    this.color = color || 'white'
  }

  update() {
    this.position += this.speed
  }

  getEllipceWidth (radian) {
    return (sin(radian * 2 - PI / 2) / 2 + 0.5) * (this.weight - 6) + 1
  }

  getEllipceRotateRadian(radian) {
    return HALF_PI + sin(radian + PI / 2) * PI / 4
  }

  show () {
    push()

    const { length, size, weight, position, term } = this
    translate(0, height / 2)

    stroke(this.color)
    strokeWeight(2)
    noFill()

    for(var i = 0; i < length; i += 2) {
      const r = (position + i) / length * PI * 3,
            x = i,
            y = sin(r) * size,
            d = abs(cos(r)) * weight / 4,
            y1 = y + weight * 1 / 4 + d,
            y2 = y + weight * 2 / 4 + d,
            y3 = y - weight * 2 / 4 - d,
            y4 = y - weight * 1 / 4 - d

      point(x, y)
      point(x, y1)
      point(x, y2)
      point(x, y3)
      point(x, y4)

      if (i % term === 0) {
        const eW = this.getEllipceWidth(r)
        const rR = this.getEllipceRotateRadian(r)
        push()
        translate(x, y)
        rotate(rR)
        ellipse(0, 0, weight, eW)
        pop()
      }
    }

    pop()
  }
}
