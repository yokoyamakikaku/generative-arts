var WIDTH = 512,
  HEIGHT = 512,
  COL_COUNT = 8,
  ROW_COUNT = 8,
  CELL_WIDTH = WIDTH / COL_COUNT,
  CELL_HEIGHT = HEIGHT / ROW_COUNT,
  t

function setup() {
  createCanvas(WIDTH, HEIGHT)
  t = 0
}

function draw() {
  background(0)
  noFill()
  stroke(255, 255, 255, 255)
  strokeWeight(8)
  for (var r = 0; r < ROW_COUNT; r++) {
    for (var c = 0; c < COL_COUNT; c++) {
      var radian = TWO_PI * ((t + c * 20 + r * 30) / 500)
      push()
      translate(c * CELL_WIDTH, r * CELL_HEIGHT)
      {
        push()
        stroke(255, 0, 0, 0)
        strokeWeight(1)
        rect(0, 0, CELL_WIDTH, CELL_HEIGHT)
        circle(CELL_WIDTH / 2, CELL_HEIGHT / 2, 2)
        pop()
      }
      rotate(radian)
      translate(-cos(radian) * CELL_WIDTH, -sin(radian) * CELL_HEIGHT)
      arc(
        0, // cos(radian) * CELL_WIDTH,
        0, // sin(radian) * CELL_HEIGHT,
        CELL_WIDTH * 2,
        CELL_HEIGHT * 2,
        0,
        PI / 2
      )
      pop()
    }
  }
  t++
}
