const WIDTH = 512
const HEIGHT = 512

function setup () {
  createCanvas(WIDTH, HEIGHT)
  pixelDensity(1)
}

function draw () {
  background(41)

  translate(width / 2, height / 2)

  stroke(244)
  noFill()

  for (let r = 8; r < 384; r += 4) {
    push()
    translate(
      cos((r + frameCount) / 1000 * TWO_PI) * r / 2,
      sin((r + frameCount) / 1000 * TWO_PI) * r / 2
    )
    circle(0, 0, r)
    pop()
  }

  // noLoop()
}
