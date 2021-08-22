var WIDTH = 512,
  HEIGHT = 512

function setup() {
  createCanvas(WIDTH, HEIGHT)
}

function step(size, depth = 0, count = 12) {
  if (depth < 1) return

  circle(0, 0, size)
  for (var i = 0; i < count; i++) {
    var radian = (TWO_PI * i) / count,
      _size = size / (count / 2),
      radius = size / 2 - _size / 2
    push()
    translate(cos(radian) * radius, sin(radian) * radius)
    rotate(radian)
    step(_size, depth - 1)
    pop()
  }
}

function gold(number, step) {
  while (step-- > 0) {
    number *= 1.618
  }
  return number
}

function draw() {
  var base = 128

  background(244)
  translate(width / 2, height / 2)

  noFill()
  stroke(255, 0, 0)

  circle(0, 0, 2)
  push()
  stroke(0, 0, 0, 64)
  circle(0, 0, base)
  pop()
  beginShape()
  for (var i = 0; i < 2; i++) {
    var radian = (TWO_PI * i) / 2
    push()
    translate((cos(radian) * base) / 2, 0)
    rotate(PI - radian)
    circle(0, 0, 4)
    push()
    stroke(0, 0, 0, 64)
    circle(0, 0, base)
    pop()
    arc(0, 0, base, base, -PI / 4, PI / 4)
    pop()
  }
  endShape()

  noLoop()
}
