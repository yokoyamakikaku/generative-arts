const COUNT = 32; const MAX_STEP = 128

function setup () {
  createCanvas(512, 512)
}

function getStepedNoise (x, y, step) {
  const n = noise(x, y)
  return floor(n * step) / step
}

function draw () {
  background(41)

  noStroke()

  const cw = width / COUNT
  const ch = height / COUNT
  const step = (sin(frameCount / 100) * MAX_STEP / 2) + MAX_STEP / 2

  for (let x = 0; x < COUNT; x++) {
    for (let y = 0; y < COUNT; y++) {
      push()
      translate(x * cw, y * ch)
      const n = getStepedNoise(x, y, step)
      const c = n * 255
      fill(c, c / 2, 0)
      noStroke()
      rect(0, 0, cw, ch)

      noFill()
      stroke(0)
      if (getStepedNoise(x, y, step) !== getStepedNoise(x + 0, y - 1, step)) line(0, 0, cw, 0)
      if (getStepedNoise(x, y, step) !== getStepedNoise(x + 0, y + 1, step)) line(0, ch, cw, ch)
      if (getStepedNoise(x, y, step) !== getStepedNoise(x - 1, y + 0, step)) line(0, 0, 0, ch)
      if (getStepedNoise(x, y, step) !== getStepedNoise(x + 1, y + 0, step)) line(cw, 0, cw, cw)
      pop()
    }
  }
}
