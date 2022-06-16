const COUNT = 32

let xOffset, yOffset

function setup () {
  createCanvas(512, 512)
  pixelDensity(1)

  xOffset = 0
  yOffset = 0
}

function draw () {
  background(255)
  const size = width / COUNT
  stroke(0, 0, 0, 0)
  for (let x = 0; x <= COUNT; x++) {
    for (let y = 0; y <= COUNT; y++) {
      push()
      translate(size * x, y * size)
      const n = noise(x + xOffset, y + yOffset)
      const c = n * 255

      fill(c, c, c, 128)
      strokeWeight(0)
      rect(0, 0, size, size)

      translate(size / 2, size / 2)
      rotate(TWO_PI * n)
      scale(0.8)
      stroke(0)
      strokeWeight(1)
      strokeCap(SQUARE)
      line(-size / 2, 0, size / 2, 0)

      pop()
    }
  }

  xOffset += random(0, 1 / 100)
  yOffset += random(0, 1 / 100)

  // noLoop()
}
