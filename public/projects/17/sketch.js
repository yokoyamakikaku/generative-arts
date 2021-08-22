const WIDTH = 512, HEIGHT = 512

let current, next

function valueToStatus (value) {
  if (value >= 1) return 1
  if (value <= 0) return 0
  return 0.5
}

function setup() {
  createCanvas(WIDTH, HEIGHT)

  frameRate(30)

  current = []
  next = []

  for (var x = 0; x < 64; x++) {
    current[x] = []
    next[x] = []
    for (var y = 0; y < 64; y++) {
      current[x][y] = random(0, 1) > 0.99 ? 1 : 0
      next[x][y] = 0
    }
  }
}

function draw() {
  for (var x = 0; x < 64; x++) {
    for (var y = 0; y < 64; y++) {
      push()
      translate(x * 8, y * 8)

      noStroke()
      if (current[x][y] >= 0.8) {
        fill(0, 0, 144)
      } else if (current[x][y] <= 0.2) {
        fill(144, 0, 0)
      } else {
        fill(24, 24, 24)
      }

      rect(0, 0, 8, 8)

      stroke(0)
      strokeWeight(1)

      if (y > 0 && valueToStatus(current[x][y]) !== valueToStatus(current[x][y-1])) line(0, 0, 8, 0)
      if (x > 0 && valueToStatus(current[x][y]) !== valueToStatus(current[x - 1][y])) line(0, 0, 0, 8)

      pop()
    }
  }

  for (var x = 1; x < 63; x++) {
    for (var y = 1; y < 63; y++) {
      var sum = [
        current[x - 1][y - 1],
        current[x + 0][y - 1],
        current[x + 1][y - 1],
        current[x - 1][y - 0],
        current[x + 1][y - 0],
        current[x - 1][y + 1],
        current[x + 0][y + 1],
        current[x + 1][y + 1]
      ].reduce((s, n) => s + n, 0),
      avg = sum / 8

      if (current[x][y] === 1) {
        next[x][y] = 1
      } else {
        next[x][y] = constrain(current[x][y] + avg * 0.1, 0, 1)
      }
    }
  }

  swap()
}

function swap() {
  var tmp = current
  current = next
  next = tmp
}

function average(array) {

}
