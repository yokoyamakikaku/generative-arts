var WIDTH = 512,
  HEIGHT = 512

var radius = 128,
  xoff = 0,
  inc = 0.05,
  colors = []

function setup() {
  createCanvas(WIDTH, HEIGHT)

  colors = [
    color(0x4d, 0x37, 0x5d, 200),
    color(0xff, 0xe2, 0x27, 200),
    color(0xeb, 0x59, 0x6e, 200),
    color(0xff, 0xe2, 0x27, 200),
    color(0xee, 0xee, 0xee, 200),
  ]
}

function draw() {
  blendMode(BLEND)
  background(244)
  translate(width / 2, height / 2)
  blendMode(MULTIPLY)
  for (var j = 0; j < colors.length; j++) {
    beginShape()
    var r = radius + sin((PI * j) / colors.length) * 16 * j,
      c = colors[j],
      handle = r * 0.55228,
      h = map(noise(xoff + 100 + j), 0, 1, handle * 0.8, handle * 1.2),
      x = map(noise(xoff + 200 + j), 0, 1, 0, 16),
      y = map(noise(xoff + 300 + j), 0, 1, 0, 16)
    vertex(r + x, 0 + y)
    for (var i = 0; i < 4; i++) {
      var r1 = TWO_PI * ((i + 0) / 4),
        x1 = cos(r1) * r + x,
        y1 = sin(r1) * r + y,
        x2 = x1 + cos(r1 + (TWO_PI * 1) / 4) * h,
        y2 = y1 + sin(r1 + (TWO_PI * 1) / 4) * h,
        r2 = TWO_PI * ((i + 1) / 4),
        x4 = cos(r2) * r + x,
        y4 = sin(r2) * r + y,
        x3 = x4 + cos(r2 + (TWO_PI * 3) / 4) * h,
        y3 = y4 + sin(r2 + (TWO_PI * 3) / 4) * h
      bezierVertex(x2, y2, x3, y3, x4, y4)
    }
    noStroke()
    fill(c)
    endShape()
  }

  loadPixels()
  for (var i = 0; i < pixels.length; i += 4) {
    pixels[i + 0] = min(
      255,
      max(0, random(pixels[i + 0] * 0.95, pixels[i + 0] * 1.05))
    )
    pixels[i + 1] = min(
      255,
      max(0, random(pixels[i + 1] * 0.95, pixels[i + 1] * 1.05))
    )
    pixels[i + 2] = min(
      255,
      max(0, random(pixels[i + 2] * 0.95, pixels[i + 2] * 1.05))
    )
    pixels[i + 3] = min(
      255,
      max(0, random(pixels[i + 3] * 0.95, pixels[i + 3] * 1.05))
    )
  }
  updatePixels()

  xoff += inc
}
