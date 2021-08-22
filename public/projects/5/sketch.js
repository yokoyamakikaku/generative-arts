var WIDTH = 512,
  HEIGHT = 512,
  radius = WIDTH * 0.25,
  handleRate = 0.55228

function setup() {
  createCanvas(WIDTH, HEIGHT)
  pixelDensity(1)
}

function draw() {
  background(244)

  stroke("red")
  strokeWeight(0.5)
  line(width / 2, 0, width / 2, height)
  line(0, height / 2, width, height / 2)

  translate(width / 2, height / 2)
  rotate(PI / 4)

  stroke("red")
  noFill()

  circle(0, 0, 4)
  circle(0, 0, radius * 2)

  beginShape()
  vertex(cos(0) * radius, sin(0) * radius)
  for (var i = 0; i < 4; i++) {
    var r1 = (TWO_PI * i) / 4,
      x1 = cos(r1) * radius,
      y1 = sin(r1) * radius,
      x2 = x1 + cos(r1 + PI / 2) * radius * handleRate,
      y2 = y1 + sin(r1 + PI / 2) * radius * handleRate,
      r2 = (TWO_PI * (i + 1)) / 4,
      x4 = cos(r2) * radius,
      y4 = sin(r2) * radius,
      x3 = x4 + cos(r2 - PI / 2) * radius * handleRate,
      y3 = y4 + sin(r2 - PI / 2) * radius * handleRate

    stroke("blue")
    circle(x1, y1, 3)
    circle(x1, y1, radius * handleRate * 2)
    circle(x4, y4, 3)
    circle(x4, y4, radius * handleRate * 2)

    stroke("green")
    circle(x2, y2, 3)
    circle(x3, y3, 3)
    line(x1, y1, x2, y2)
    line(x3, y3, x4, y4)
  }

  endShape(CLOSE)

  noLoop()
}
