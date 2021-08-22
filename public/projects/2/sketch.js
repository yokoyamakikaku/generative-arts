var WIDTH = 512,
  HEIGHT = 512,
  radius = 128,
  xoff = 0,
  inc = 0.1,
  count = 4

var _colors = {
  pink: "#ff75a0",
  yellow: "fce38a",
  lime: "#eaffd0",
  green: "#95e1d3",
}

function setup() {
  createCanvas(WIDTH, HEIGHT)
  pixelDensity(1)
}

function gradientCircle(x, y, size, color) {
  push()
  translate(x, y)

  var r = red(color),
    g = green(color),
    b = blue(color)

  for (var i = 0; i < size; i += 1) {
    stroke(r, g, b, (i / size) * 255)
    circle(0, -i / 2, size - i)
  }

  pop()
}

function draw() {
  blendMode(BLEND)
  background(color(_colors.lime))

  noFill()

  translate(width / 2, height / 2)

  translate(0, 128)

  blendMode(MULTIPLY)
  gradientCircle(0, 0, 256, color(_colors.pink))
  rotate(PI)
  gradientCircle(0, 256 - 64, 256, color(_colors.green))

  xoff += inc
}
