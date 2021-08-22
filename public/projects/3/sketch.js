var WIDTH = 512,
  HEIGHT = 512,
  columnCount = 64,
  columnSize = WIDTH / columnCount,
  t = 0

function setup() {
  createCanvas(WIDTH, HEIGHT)
  pixelDensity(1)
}

function column(size = 32, count = 24, gap = 8) {
  fill(64)
  noStroke()
  circle(0, 0, size)
  for (var i = 1; i < count; i++) {
    var s = max(0, size * cos(((PI / 2) * i) / (count + 1)))
    fill(64)
    circle(0, i * gap, s)
    circle(0, i * -gap, s)
  }
}

function draw() {
  background(244)
  noStroke()

  stroke(255, 0, 0)
  noFill()
  for (var i = 0; i < columnCount; i++) {
    push()
    {
      translate(i * columnSize, 0)
      stroke(255, 0, 0, 0)
      noFill()
      rect(0, 0, columnSize, height)
      line(columnSize / 2, 0, columnSize / 2, height)
      line(0, height / 2, columnSize, height / 2)

      var size = 12 * noise((t + i) / 100)
      translate(columnSize / 2, height / 2)
      column(size, i % 2 == 1 ? 24 : 25, i % 2 == 1 ? 8 : 16)
    }
    pop()
  }
  t++
}
