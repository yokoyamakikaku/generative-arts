const TERM_WIDTH_UNIT = 29
const CHAR_GAP_UNIT = 2

const PASSED = 1,
      UNCERTAIN = 2,
      REJECTED = 3

class Decision {
  constructor({
    colors, unit,
    code, file, extension, exMode, priority,
    melchior, balthasar, casper,
  }) {
    const u = unit
    this.unit = unit
    this.colors = colors

    this.code = code
    this.file = file
    this.extension = extension
    this.exMode = exMode
    this.priority = priority

    this.melchior = melchior
    this.balthasar = balthasar
    this.casper = casper

    this.terms = [{
      x: u(-45),
      y: u(-25.5),
      title: '提訴'
    }, {
      x: u(16),
      y: u(-25.5),
      title: '決議'
    }]
  }

  get status () {
    const computers = [
      this.melchior,
      this.balthasar,
      this.casper
    ]

    if (computers.every(computer => computer.isNegative)) return PASSED
    if (computers.every(computer => computer.isPositive)) return REJECTED
    return UNCERTAIN
  }

  show () {
    const u = this.unit,
          {
            code,
            file,
            extension,
            exMode,
            priority
          } = this,
          {
            ORANGE,
            GREEN,
            YELLOW
          } = this.colors

    this.terms.forEach(({ x, y, title }) => {
      push()
      translate(x, y)

      noFill()
      stroke(GREEN)
      strokeWeight(u(0.4))
      rect(u(0.8), u(0), u(27.6), u(0.5), u(0.2), u(0.2), u(0.2), u(0.2))
      rect(u(0.8), u(1), u(27.6), u(0.5), u(0.2), u(0.2), u(0.2), u(0.2))
      rect(u(0.8), u(10), u(27.6), u(0.5), u(0.2), u(0.2), u(0.2), u(0.2))
      rect(u(0.8), u(11), u(27.6), u(0.5), u(0.2), u(0.2), u(0.2), u(0.2))

      const chars = title.split('')
      const w = u((TERM_WIDTH_UNIT - (chars.length + 1) * CHAR_GAP_UNIT) / chars.length)
      translate( - w / 2, u(10))

      chars.forEach(char => {
        translate(w + u(CHAR_GAP_UNIT), 0)

        push()

        noStroke()
        fill(ORANGE)
        textFont('Noto Serif JP')
        textStyle(BOLD)
        textSize(u(8))
        textAlign(CENTER, BOTTOM)
        scale(w / u(8), 1)
        text(char, 0, 0)

        pop()
      })

      pop()
    })

    fill(ORANGE)
    noStroke()
    push()

    const messages = [
      `FILE : ${file}`,
      `EXTENSION : ${extension}`,
      `EX_MODE : ${exMode ? 'ON' : 'OFF'}`,
      `PRIORITY : ${priority}`,
    ]

    translate(u(-43), u(-12.5))
    textFont('Roboto')
    textSize(u(5))
    textAlign(LEFT, BOTTOM)
    textStyle(BOLD)
    text(`CODE : ${code}`, 0, u(5))

    textSize(u(1.9))
    textStyle(NORMAL)
    messages.forEach((message, i) => text(message, u(3), u(7) + u(2.2 * i)))
    pop()


    this.showStatus()
  }

  showStatus() {
    const u = this.unit

    let c, message

    switch (this.status) {
      case PASSED:
        c = this.colors.GREEN
        message = '可決'
        break
      case UNCERTAIN:
        c = this.colors.YELLOW
        message = '審議中'
        break
      case REJECTED:
        c = this.colors.RED
        message = '否決'
        break
      default:
        c = this.colors.WHITE
        message = '不明'
    }

    push()

    translate(u(23), u(-7.5))
    noFill()
    stroke(c)
    strokeWeight(u(0.3))
    rect(0, 0, u(19), u(8), u(0.6), u(0.6), u(0.6), u(0.6))
    rect(u(0.5), u(0.5), u(18), u(7), u(0.4), u(0.4), u(0.4), u(0.4))

    fill(c)
    noStroke()
    textFont('Noto Serif JP')
    textStyle(BOLD)
    textSize(u(6))
    textAlign(CENTER, BOTTOM)
    translate(u(9.5), u(7))
    scale(u(16) / (message.length * u(6)), 1)
    text(message, 0, 0)

    pop()
  }
}
