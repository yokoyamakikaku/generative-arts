class Computer {
  constructor(inner, outer) {
    this.inner = inner
    this.outer = outer

    this.board = new Board(outer)
  }

  show () {
    this.board.show()
    this.showFrame()
    this.showLabel()
  }

  showLabel(label, x = 0, y = 0) {

    fill("BLACK")
    noStroke()
    textAlign(CENTER, CENTER)
    textSize(32)
    textFont(FONT_SANS_SERIF)
    textStyle(NORMAL)
    push()
    translate(x, y)
    scale(1.1, 1)
    text(label, 0, 0)
    pop()
  }

  showFrame() {
    noFill()

    strokeWeight(8)
    stroke(BLACK)
    beginShape()
    this.outer.forEach(({ x, y }) => vertex(x, y))
    endShape(CLOSE)

    strokeWeight(4)
    stroke(ORANGE)
    beginShape()
    this.inner.forEach(({ x, y }) => vertex(x, y))
    endShape(CLOSE)
  }
}

Computer.pointsToVectors = function(points) {
  const numbers = points.split(" ")
  const vectors = []

  for (var i = 0; i < numbers.length; i += 2) {
    vectors.push(
      createVector(+numbers[i], +numbers[i + 1])
    )
  }

  return vectors
}
