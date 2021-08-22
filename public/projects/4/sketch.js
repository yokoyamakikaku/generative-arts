var WIDTH = 512,
  HEIGHT = 512,
  columnCount = 64,
  columnSize = WIDTH / columnCount,
  t = 0

function setup() {
  createCanvas(WIDTH, HEIGHT)
  pixelDensity(1)
}

function cell(x, y, size) {
  push()
  translate(x, y)
  fill("#E60011")
  circle(0, 0, size)

  translate(0, y + size * 0.2)
  fill("#FFFFFF")
  circle(0, 0, size * 0.4)

  translate(0, y + size * 0.1)
  fill("#0068B7")
  circle(0, 0, size * 0.2)
  pop()
}

function draw() {
  background(244)
  noStroke()
  translate(width / 2, height / 2)
  cell(0, 0, 64)
}
