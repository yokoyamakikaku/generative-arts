const WIDTH = 512,
  HEIGHT = 512

function setup() {
  createCanvas(WIDTH, HEIGHT)
  pixelDensity(1)
}

function stripedCircle(x, y, radius, count = 12, offset = 0) {
  push()

  translate(x, y)

  const _x = r => cos(r) * radius
  const _y = r => sin(r) * radius
  for (var i = offset; i <= count; i += 2) {

    const r1 = acos(-1 + (i + 0) / count * 2)
    const r2 = acos(-1 + (i + 1) / count * 2)
    const r3 = PI + PI - r2
    const r4 = PI + PI - r1

    arc(0, 0, radius * 2, radius * 2, r2, r1, OPEN)
    arc(0, 0, radius * 2, radius * 2, r4, r3, OPEN)

    beginShape()
    vertex(_x(r1), _y(r1))
    vertex(_x(r2), _y(r2))
    vertex(_x(r3), _y(r3))
    vertex(_x(r4), _y(r4))
    endShape(CLOSE)
  }

  pop()
}


function draw() {
  const radius = 32
  const count = 6
  const progress = frameCount % width / width
  background(244)

  translate(0, height / 2)
  scale(1.2, 1.2)
  scale(1, -1)

  fill('red')
  noStroke()

  for(var i = 0; i < 8; i++) {
    const p = i / 8
    push()
    translate(p * width, 0)
    rotate(p * -TWO_PI)
    stripedCircle(0, 0, radius, count, 1)
    pop()
  }

  fill('blue')
  push()
  translate(progress * width, 0)
  rotate(progress * -TWO_PI)
  stripedCircle(0, 0, radius, count, 0)
  pop()
}
