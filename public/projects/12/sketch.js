var WIDTH = 128,
  HEIGHT = 128,
  dA = 1,
  dB = 0.5,
  feed = 0.04,
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

  for (var x = 100; x < 110; x++) {
    for (var y = 100; y < 110; y++) {
      current[x][y][1] = 1
    }
  }
}

function draw() {
  background(255)

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
        [a, b] = next[x][y],
        c = constrain(floor((a - b) * 255), 0, 255)
      pixels[pix + 0] = c
      pixels[pix + 1] = c
      pixels[pix + 2] = c
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
