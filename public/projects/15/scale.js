class Scale {
  constructor () { }

  get width () {
    return width
  }

  get height () {
    return height
  }

  get halfWidth () {
    return this.width / 2
  }

  get halfHeight () {
    return this.height / 2
  }

  show() {
    const { width, height, halfWidth } = this

    noFill()
    stroke('white')
    strokeCap(SQUARE)

    strokeWeight(10)
    line(0, 50 + 5, width, 50 + 5)
    line(0, height - 55, width, height - 55)

    strokeWeight(1)
    for (var xOffset = 0; xOffset < halfWidth; xOffset += 5) {
      const length = 2,
            x1 = halfWidth + xOffset,
            x2 = halfWidth - xOffset,
            y1 = height - 37.5 - length / 2,
            y2 = height - 37.5 + length / 2
      line(x1, y1, x1, y2)
      line(x2, y1, x2, y2)
    }

    strokeWeight(2)
    for (var xOffset = 0; xOffset < halfWidth; xOffset += 25) {
      const length = 6,
            x1 = halfWidth + xOffset,
            x2 = halfWidth - xOffset,
            y1 = height - 37.5 - length / 2,
            y2 = height - 37.5 + length / 2
      line(x1, y1, x1, y2)
      line(x2, y1, x2, y2)
    }

    strokeWeight(2)
    for (var xOffset = 0; xOffset < halfWidth; xOffset += 50) {
      const length = 10,
            x1 = halfWidth + xOffset,
            x2 = halfWidth - xOffset,
            y1 = height - 37.5 - length / 2,
            y2 = height - 37.5 + length / 2
      line(x1, y1, x1, y2)
      line(x2, y1, x2, y2)
    }

    strokeWeight(3)
    line(halfWidth, height - 50, halfWidth, height - 50 + 20)

    strokeWeight(1)
    for(var y = 55; y < height - 55; y += 5) {
      line(
        50, y, 50 + 20, y
      )
    }

    strokeWeight(1)
    for(var y = 55; y < height - 55; y += 10) {
      line(
        width - 50, y, width - 50 - 20, y
      )
    }

    {
      const xCount = 4, yCount = 3
      push()
      translate(100, 100)
      for (var x = 0; x < xCount; x++) {
        for (var y = 0; y < yCount; y++){
          push()
          translate(
            x * (width - 200) / (xCount - 1),
            y * (height - 200) / (yCount - 1)
          )
          line(-10, 0, 10, 0)
          line(0, -10, 0, 10)
          pop()
        }
      }
      pop()
    }

    noStroke()
    fill(255)

    textAlign(CENTER)
    textSize(18)
    text('0', halfWidth, height - 10)

    for(var x = 50; x < halfWidth; x += 50) {
      textAlign(LEFT)
      textSize(18)

      text(`${float(x / 50)}`, halfWidth + x, height - 10)
      text(`${float(x / 50)}`, halfWidth - x, height - 10)

      textAlign(RIGHT)
      textSize(16)
      text(`+`, halfWidth + x - 2, height - 10 - 1)
      text(`-`, halfWidth - x - 2, height - 10 - 1)
    }

    // this.showGuide()
  }

  showGuide() {
    const { width, height, halfWidth, halfHeight } = this

    noFill()

    stroke(255, 0, 0, 255)
    strokeWeight(1)
    line(0, halfHeight, width, halfHeight)
    line(halfWidth, 0, halfWidth, height)
    rect(50, 50, width - 100, height - 100)
    rect(100, 100, width - 200, height - 200)

    line(0, 50, width, 50)
    line(0, 50 + 10, width, 50 + 10)
    line(0, height - 50, width, height - 50)
    line(0, height - 50 - 10, width, height - 50 - 10)

    line(0, height - 45, width, height - 45)
    line(0, height - 37.5, width, height - 37.5)
    line(0, height - 30, width, height - 30)

    line(50, 0, 50, height)
    line(50 + 20, 0, 50 + 20, height)
    line(width - 50, 0, width - 50, height)
    line(width - 50 - 20, 0, width - 50 - 20, height)

    stroke(255, 0, 0, 128)
    strokeWeight(1)
    for (var x = 0; x < width; x += 5) line(x, 0, x, height)
    for (var y = 0; y < height; y += 5) line(0, y, width, y)
  }
}
