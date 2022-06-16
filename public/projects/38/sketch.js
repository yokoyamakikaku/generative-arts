const WIDTH = 512
const HEIGHT = 512

function setup () {
  createCanvas(WIDTH, HEIGHT)
  pixelDensity(1)
}

function draw () {
  background(244)
  const COL_COUNT = 64
  const ROW_COUNT = 64

  const w = width / COL_COUNT
  const h = height / ROW_COUNT
  stroke(255)
  for (let y = 0; y < ROW_COUNT; y++) {
    for (let x = 0; x < COL_COUNT; x++) {
      push()
      translate(x * w, y * h)
      const d = noise(x + frameCount * 0.1, y)
      if (d < 0.5) {
        fill(0)
        rect(0, 0, w, h * d * 4)
      }
      pop()
    }
  }

  // noLoop()
}
