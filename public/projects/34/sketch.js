let current, direction, points

function setup () {
  createCanvas(512, 512)

  points = [
    { x: 0, y: 0 }
  ]
  current = {
    x: 0,
    y: 0
  }
  direction = HALF_PI
}

function draw () {
  background(244)

  current.x += cos(direction) * 4
  current.y += sin(direction) * 4

  if (frameCount % (height / 64) === 0) {
    points.push({ ...current })
    if (current.x > 64 / 2) {
      direction = PI
    } else if (current.x < -64 / 2) {
      direction = 0
    } else if (direction === HALF_PI) {
      direction = random([0, HALF_PI, PI])
    } else {
      direction = HALF_PI
    }
  }

  if (current.y > height) {
    points = [{ x: 0, y: 0 }]
    current = { x: 0, y: 0 }
    direction = HALF_PI
  }

  push()
  translate(width / 2, height / 2)
  fill(41)
  noStroke()
  rect(-32, -128, 64, 256)
  pop()

  push()
  translate(width / 2, 0)

  noFill()

  stroke(244)
  strokeWeight(8)
  strokeCap(SQUARE)

  beginShape()
  points.forEach(({ x, y }) => {
    vertex(x, y)
  })
  vertex(current.x, current.y)
  endShape()

  fill(41)
  noStroke()
  circle(current.x, current.y, 4)

  pop()
}
