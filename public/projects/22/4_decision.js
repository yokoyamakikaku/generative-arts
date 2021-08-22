class Decision {
  constructor( titles, code, file, extension, exMode, priority) {
    this.titles = titles.map(title => title.split(""))
    this.code = code
    this.file = file
    this.extension = extension
    this.exMode = exMode
    this.priority = priority

    this.status = Decision.NEUTRAL
    this.statusLabel = ""
  }

  setStatus(status, statusLabel) {
    this.status = status
    this.statusLabel = statusLabel
  }

  show () {
    this.showHeader()
    this.showEnvironment()
    this.showStatus()
  }

  showHeader() {
    for (let x = 0; x < 2; x++) {
      for (let y = 0; y < 2; y++) {
        for (let l = 0; l < 2; l++) {
          push()
          translate(
            40 + 496 * x,
            96 +  80 * y + l * 10,
          )
          noStroke()
          fill(GREEN)
          rect(
            4, 0,
            216,
            6,
            4, 4, 4, 4
          )
          noFill()
          stroke(BLACK)
          strokeWeight(2)
          strokeCap(ROUND)
          line(7, 3, 217, 3)
          pop()
        }
      }
    }

    const gap = 16
    this.titles.forEach((title, tx) => {
      const cw = (208 / title.length) - gap
      title.forEach((char, cx) => {
        const x = 56 + 496 * tx + (cw + gap) * cx + cw / 2,
              y = 144
        push()
        fill(ORANGE)
        noStroke()
        translate(x, y)
        scale(cw / 64 * 1.05, 0.95)
        textAlign(CENTER, CENTER)
        textSize(64)
        textFont(FONT_SERIF_JP)
        textStyle(BOLD)
        text(char, 0, 0)
        pop()
      })
    })
  }

  showEnvironment() {

    const head = `CODE: ${this.code}`,
    rows = [
      `FILE: ${this.file}`,
      `EXTENSION: ${this.extension}`,
      `EXMODE: ${this.exMode ? "ON" : "OFF"}`,
      `PRIORITY: ${this.priority}`,
    ]

    fill(ORANGE)
    noStroke()
    textFont(FONT_SANS_SERIF)

    textSize(40)
    textAlign(LEFT, BOTTOM)
    text(head, 56, 200 + 40)

    textSize(14)
    rows.forEach((row, index) => {
      push()
      translate(72, 256 + 16 * index)
      scale(1.2, 1)
      text(row, 0, 0)
      pop()
    })
  }

  showStatus() {
    const c = Decision.statusToColor(this.status)
    noFill()
    stroke(c)
    strokeWeight(3)
    rect(584, 240, 152, 64, 4, 4)
    rect(588, 244, 144, 56, 2, 2)

    fill(c)
    noStroke()
    textFont(FONT_SERIF_JP)
    textAlign(CENTER, CENTER)
    textStyle(BOLD)
    textSize(48)
    push()
    translate(660, 272)
    scale(136 / this.statusLabel.length / 48 * 0.98, 1.0)
    text(this.statusLabel, 0, 0)
    pop()

  }
}

Decision.NEGATIVE = "NEGATIVE"
Decision.NEUTRAL = "NEUTRAL"
Decision.POSITIVE = "POSITIVE"

Decision.statusToColor = function (status) {
  switch(status) {
    case Decision.NEGATIVE:
      return RED
    case Decision.NEUTRAL:
      return YELLOW
    case Decision.POSITIVE:
      return GREEN
  }
}
