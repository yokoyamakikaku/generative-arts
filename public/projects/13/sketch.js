var WIDTH = 512,
  HEIGHT = 512,
  cells

class Cell {
  constructor(size, x, y) {
    this.size = size
    this.position = createVector(x, y)
    this.reset()
  }

  reset() {
    this.life = 0
    this.speed = random(0.0005, 0.005)
    this.angle = floor(random(0, 4))
  }

  show() {
    push()
    var {
      position: { x, y },
      size,
      angle,
      life,
    } = this
    translate(x, y)

    {
      push()
      switch (angle) {
        case 0:
          translate(0, 0)
          break
        case 1:
          translate(size, 0)
          break
        case 2:
          translate(size, size)
          break
        case 3:
          translate(0, size)
          break
      }

      noStroke()
      fill(212, 175, 55, sin(PI * life) * 255)
      beginShape()
      vertex(0, 0)
      arc(0, 0, size * 2, size * 2, angle * HALF_PI, angle * HALF_PI + HALF_PI)
      endShape(CLOSE)
      pop()
    }

    pop()
  }

  update() {
    this.life += this.speed
    if (this.life >= 1) {
      this.reset()
    }
  }
}

function setup() {
  createCanvas(WIDTH, HEIGHT)
  cells = []

  var size = 128
  for (var x = 0; x < width; x += size) {
    for (var y = 0; y < height; y += size) {
      cells.push(new Cell(size, x, y))
    }
  }
}

function draw() {
  background(41)
  cells.forEach((cell) => {
    cell.update()
    cell.show()
  })
}
