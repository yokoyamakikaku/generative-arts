function setup () {
  createCanvas(512, 512)
  pixelDensity(1)
}

function draw () {
  background(41)

  fill(41)
  stroke(255)
  for (let y = 64; y < height - 64; y += 8) {
    beginShape()
    for (let x = 16; x < width; x += 16) {
      const h = noise(x + frameCount * 0.05, y) * -sin(x / width * PI) * 32
      vertex(
        x,
        y + h
      )
    }
    endShape()
  }
}
