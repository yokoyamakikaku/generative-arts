const WIDTH = 512
const HEIGHT = 512

function setup () {
  createCanvas(WIDTH, HEIGHT)
  pixelDensity(2)
}

function drawBody () {
  push()

  noFill()
  stroke(32)

  const radius = 172
  const fontSize = 12
  const labelWidth = 18

  rotate(TWO_PI * frameCount / 1000)

  strokeWeight(2)
  circle(0, 0, radius * 2)
  circle(0, 0, (radius - labelWidth) * 2)

  const lineCount = 24
  const allLineCount = lineCount * 4

  for (let i = 0; i < allLineCount; i++) {
    if (i % lineCount < 3) continue

    push()
    rotate(TWO_PI * (i - 1) / allLineCount)
    strokeCap(SQUARE)
    strokeWeight(8)
    line(radius - labelWidth, 0, radius, 0)
    pop()
  }

  for (let i = 0; i < 4; i++) {
    push()
    rotate(HALF_PI * i)
    translate(0, -radius)
    textAlign(CENTER, CENTER)
    textSize(fontSize)
    noStroke()
    fill(32)
    text('皮膚', 0, labelWidth / 2)
    pop()
  }

  pop()
}

function draw () {
  background(244)

  translate(width / 2, height / 2)
  drawBody()

  fill(255, 0, 0)
  stroke(200, 0, 0)
  circle(0, 0, 32)
  fill(255)
  noStroke()
  textAlign(CENTER, CENTER)
  text('障害', 0, 0)
  fill(0)
  text('impairment', 0, 24)

  translate(200, 200)
  fill(255, 0, 0)
  stroke(200, 0, 0)
  circle(0, 0, 32)
  fill(255)
  noStroke()
  textAlign(CENTER, CENTER)
  text('障害', 0, 0)
  fill(0)
  text('disability', 0, 24)

  // noLoop()
}
