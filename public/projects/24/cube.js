class Cube {
  constructor(x, y, width, height, size = 1) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.size = size
    this.maxSize = random(16, 32)
  }

  update() {
    this.size = constrain(this.size + 0.2, 0, this.maxSize)
  }

  showBody() {
    const { x, y, width: w, height: h, size: s } = this
    stroke(144)
    fill(244)
    strokeWeight(1)
    beginShape()
    vertex(x, y)
    vertex(x + cos(TWO_PI * 7 / 8) * s, y + sin(TWO_PI * 7 / 8) * s)
    vertex(x + cos(TWO_PI * 7 / 8) * s + w, y + sin(TWO_PI * 7 / 8) * s)
    vertex(x + cos(TWO_PI * 7 / 8) * s + w, y + sin(TWO_PI * 7 / 8) * s + h)
    vertex(x + w, y + h)
    vertex(x, y + h)
    endShape(CLOSE)

    noStroke()
    fill(0, 24)
    beginShape()
    vertex(x, y)
    vertex(x + cos(TWO_PI * 7 / 8) * s, y + sin(TWO_PI * 7 / 8) * s)
    vertex(x + cos(TWO_PI * 7 / 8) * s, y + sin(TWO_PI * 7 / 8) * s + h)
    vertex(x + cos(TWO_PI * 7 / 8) * s + w, y + sin(TWO_PI * 7 / 8) * s + h)
    vertex(x + w, y + h)
    vertex(x, y + h)
    endShape(CLOSE)
  }

  showShadow() {
    const { x, y, width: w, height: h, size: s } = this

    noStroke()
    fill(0, 128)
    beginShape()
    vertex(x + cos(TWO_PI * 3 / 8) * s, y + sin(TWO_PI * 3 / 8) * s)
    vertex(x + cos(TWO_PI * 7 / 8) * s, y + sin(TWO_PI * 7 / 8) * s)
    vertex(x + cos(TWO_PI * 7 / 8) * s, y + h + sin(TWO_PI * 7 / 8) * s)
    vertex(x + w + cos(TWO_PI * 7 / 8) * s, y + h + sin(TWO_PI * 7 / 8) * s)
    vertex(x + w + cos(TWO_PI * 3 / 8) * s, y + h + sin(TWO_PI * 3 / 8) * s)
    vertex(x + w + cos(TWO_PI * 3 / 8) * s, y + h + sin(TWO_PI * 3 / 8) * s)
    vertex(x + cos(TWO_PI * 3 / 8) * s, y + h + sin(TWO_PI * 3 / 8) * s)
    endShape(CLOSE)
  }
}
