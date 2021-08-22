var WIDTH = 256,
  HEIGHT = 256,
  dA = 1,
  dB = 0.5,
  feed = 0.05,
  k = 0.062,
  current = [],
  next = []

function newGrid() {
  var grid = []
  for (var x = 0; x < width; x++) {
    grid[x] = []
    for (var y = 0; y < height; y++) {
      grid[x][y] = [1, 0]
    }
  }
  return grid
}

function setup() {
  createCanvas(WIDTH, HEIGHT)
  pixelDensity(1)

  current = newGrid()
  next = newGrid()

  for (var i = 0; i < 4; i++) {
    var x1 = floor(random(width * 0.2, width * 0.8))
    var y1 = floor(random(height * 0.2, height * 0.8))
    var x2 = x1 + width * 0.1
    var y2 = y1 + height * 0.1
    for (var x = x1; x < x2; x++) {
      for (var y = y1; y < y2; y++) {
        current[x][y][1] = 1
      }
    }
  }
}

function draw() {
  background("#fbe6c2")

  for (var x = 1; x < width - 1; x++) {
    for (var y = 1; y < height - 1; y++) {
      var [a, b] = current[x][y]
      next[x][y] = [
        constrain(a + dA * laplaceA(x, y) - a * b * b + feed * (1 - a), 0, 1),
        constrain(b + dB * laplaceB(x, y) + a * b * b - (k + feed) * b, 0, 1),
      ]
    }
  }

  loadPixels()
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var pix = (x + y * width) * 4,
        [a, b] = next[x][y]
      // c = constrain(floor((a - b) * 255), 0, 255)
      pixels[pix + 0] = constrain(0xac * b + 0xfb * a, 0, 255)
      pixels[pix + 1] = constrain(0x0d * b + 0xe6 * a, 0, 255)
      pixels[pix + 2] = constrain(0x0d * b + 0xc2 * a, 0, 255)
      pixels[pix + 3] = 255
    }
  }
  updatePixels()

  swap()
}

function laplaceA(x, y) {
  return [
    current[x][y][0] * -1,
    current[x - 1][y][0] * 0.2,
    current[x + 1][y][0] * 0.2,
    current[x][y + 1][0] * 0.2,
    current[x][y - 1][0] * 0.2,
    current[x - 1][y - 1][0] * 0.05,
    current[x + 1][y - 1][0] * 0.05,
    current[x + 1][y + 1][0] * 0.05,
    current[x - 1][y + 1][0] * 0.05,
  ].reduce((s, a) => s + a, 0)
}

function laplaceB(x, y) {
  return [
    current[x][y][1] * -1,
    current[x - 1][y][1] * 0.2,
    current[x + 1][y][1] * 0.2,
    current[x][y + 1][1] * 0.2,
    current[x][y - 1][1] * 0.2,
    current[x - 1][y - 1][1] * 0.05,
    current[x + 1][y - 1][1] * 0.05,
    current[x + 1][y + 1][1] * 0.05,
    current[x - 1][y + 1][1] * 0.05,
  ].reduce((s, a) => s + a, 0)
}

function swap() {
  current = next
  next = newGrid()
}
