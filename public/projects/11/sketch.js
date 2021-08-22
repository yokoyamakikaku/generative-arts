var WIDTH = 512,
  HEIGHT = 512,
  t,
  SIZE = 240

function setup() {
  createCanvas(WIDTH, HEIGHT)
  pixelDensity(1)
  t = 0
}

function drawGuide() {
  push()
  stroke(255, 0, 0, 0)
  noFill()
  line(0, height / 2, width, height / 2)
  line(width / 2, 0, width / 2, height)

  translate(width / 2, height / 2)

  {
    push()
    translate(-SIZE / 2, -SIZE / 2)
    square(0, 0, SIZE)
    pop()
  }

  {
    push()
    translate(-SIZE / 2, SIZE / 2 + 16)
    rect(0, 0, SIZE, 24)
    pop()
  }

  {
    push()
    translate(-SIZE / 2, -SIZE / 2 - 16 - 24)
    rect(0, 0, SIZE, 24)
    pop()
  }

  pop()
}

function drawWorld(t) {
  push()

  translate(width / 2, height / 2)
  translate(-SIZE / 2, -SIZE / 2)

  var base = SIZE * 0.5,
    max = SIZE * 0.25
  for (var x = 0; x < SIZE; x++) {
    var radian = ((x + t) / SIZE) * TWO_PI
    var length = base + sin(radian) * sin(radian) * sin(radian) * max
    line(x, 0, x, length)
  }

  pop()
}

function drawUI({ world, person }) {
  push()

  stroke(0)
  fill(255)

  translate(width / 2, height / 2)

  // world
  {
    push()
    noFill()
    translate(-SIZE / 2, -SIZE / 2)
    square(0, 0, SIZE)

    pop()
  }

  // person
  {
    push()
    var size = 24
    translate(-size / 2, -size / 2)

    stroke(0)
    noFill()
    square(0, 0, size)

    pop()
  }

  // world detail
  {
    push()
    translate(-SIZE / 2, -SIZE / 2 - 16 - 24)

    noStroke()
    fill(240)
    rect(0, 0, SIZE, 24)

    noStroke()

    {
      push()
      fill(0)
      textSize(10)
      textAlign(RIGHT, CENTER)
      text(world.dark, -6, 12)

      translate(SIZE, 0)
      textAlign(LEFT, CENTER)
      text(world.light, 6, 12)
      pop()
    }

    {
      push()
      fill(48)
      translate(0, 0)
      var rate = world.dark / world.total
      rect(0, 0, SIZE * rate * 1, 24)
      pop()
    }
    {
      push()
      fill(244)
      translate(SIZE, 0)
      var rate = world.light / world.total
      rect(0, 0, SIZE * rate * -1, 24)
      pop()
    }

    stroke(0)
    noFill(128)
    rect(0, 0, SIZE, 24)

    pop()
  }

  // a person
  {
    push()

    translate(-SIZE / 2, SIZE / 2 + 16)

    noStroke()
    fill(240)
    rect(0, 0, SIZE, 24)

    noStroke()

    {
      push()
      fill(0)
      textSize(10)
      textAlign(RIGHT, CENTER)
      text(person.dark, -6, 12)

      translate(SIZE, 0)
      textAlign(LEFT, CENTER)
      text(person.light, 6, 12)
      pop()
    }

    {
      push()
      fill(48)
      translate(0, 0)
      var rate = person.dark / person.total
      rect(0, 0, SIZE * rate * 1, 24)
      pop()
    }
    {
      push()
      fill(244)
      translate(SIZE, 0)
      var rate = person.light / person.total
      rect(0, 0, SIZE * rate * -1, 24)
      pop()
    }

    stroke(0)
    noFill(128)
    rect(0, 0, SIZE, 24)
    pop()
  }

  pop()
}

function calcWorld() {
  loadPixels()

  var world = (() => {
    var dark = 0,
      light = 0

    var x1 = width / 2 - SIZE / 2,
      y1 = height / 2 - SIZE / 2,
      x2 = width / 2 + SIZE / 2,
      y2 = width / 2 + SIZE / 2
    for (var x = x1; x < x2; x++) {
      for (var y = y1; y < y2; y++) {
        var i = (x + y * width) * 4

        if (pixels[i] > 128) {
          light++
        } else {
          dark++
        }
      }
    }

    return { dark, light, total: dark + light }
  })()

  var person = (() => {
    var dark = 0,
      light = 0

    var x1 = width / 2 - 24 / 2,
      y1 = height / 2 - 24 / 2,
      x2 = width / 2 + 24 / 2,
      y2 = width / 2 + 24 / 2
    for (var x = x1; x < x2; x++) {
      for (var y = y1; y < y2; y++) {
        var i = (x + y * width) * 4

        if (pixels[i] > 128) {
          light++
        } else {
          dark++
        }
      }
    }

    return { dark, light, total: dark + light }
  })()

  return {
    world,
    person,
  }
}

function draw() {
  background(255)
  stroke(0)

  drawGuide()

  drawWorld(t)

  var state = calcWorld()

  drawUI(state)

  t++
}
