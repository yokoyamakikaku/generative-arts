var WIDTH = 512,
  HEIGHT = 512

function setup() {
  createCanvas(WIDTH, HEIGHT)
}

function step(radius, deps = 0) {
  if (deps < 1) return 0

  var half = radius / 2

  triangle(
    cos((TWO_PI * 0) / 3) * radius,
    sin((TWO_PI * 0) / 3) * radius,
    cos((TWO_PI * 1) / 3) * radius,
    sin((TWO_PI * 1) / 3) * radius,
    cos((TWO_PI * 2) / 3) * radius,
    sin((TWO_PI * 2) / 3) * radius
  )

  for (var i = 0; i < 3; i++) {
    var radian = (TWO_PI * i) / 3
    push()
    translate(cos(radian) * half, sin(radian) * half)
    rotate(radian)
    step(half, deps - 1)
    pop()
  }
}

function draw() {
  background(244)

  noFill()

  var radius = width * 0.35
  stroke(128)
  fill(240, 240, 240, 64)
  translate(width / 2, height / 2)
  rotate(TWO_PI / 12)
  step(radius, 6)

  noLoop()
}
