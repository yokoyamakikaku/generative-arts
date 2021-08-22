class Magi {

  constructor (width, height) {
    this.width = width
    this.height = height
    this.colors = {
      WHITE: color("#FFFFFF"),
      DARK_RED: color("#A60311"),
      RED: color("#F21D2F"),
      GREEN: color("#66F2A3"),
      ORANGE: color("#F2A20C"),
      BLACK: color("#0D0D0D"),
      BLUE: color("#C2FAFE"),
      YELLOW: color("#FCF78A"),
      TRANSPARENT: color(0, 0, 0 , 0)
    }

    const u = this.unit.bind(this),
          colors = this.colors

    const options = {
      unit: u, colors
    }

    this.melchior  = new Melchior({
      x: u(6),
      y: u(2.5),
      ...options
    })
    this.balthasar = new Balthasar({
      x: u(-16),
      y: u(-25.5),
      ...options
    })
    this.casper    = new Casper({
      x: u(-43),
      y: u(2.5),
      ...options
    })

    this.decision = null

  }

  unit (number) {
    return number * this.width / 100
  }

  setDecision ({ code, file, extension, exMode, priority }) {
    this.decision = new Decision({
      code,
      file,
      extension,
      exMode,
      priority,
      melchior: this.melchior,
      balthasar: this.balthasar,
      casper: this.casper,
      unit: this.unit.bind(this),
      colors: this.colors
    })
  }

  show() {
    const {
      BLACK,
      ORANGE
    } = this.colors
    const u = this.unit.bind(this)

    background(BLACK)

    noFill()
    stroke(ORANGE)

    strokeWeight(u(0.2))
    rect(u(-45), u(-32), u(90), u(64))
    rect(u(-49), u(-36), u(98), u(72))

    strokeWeight(u(1))
    beginShape()
    vertex(u(  0), u(   0))
    vertex(u( 28), u(19.5))
    vertex(u(-28), u(19.5))
    endShape(CLOSE)

    push()
    {
      noStroke()
      fill(ORANGE)
      scale(1.15, 1)
      textFont('DM Serif Display')
      textAlign(CENTER, BOTTOM)
      const name = 'MAGI'
      textSize(u(3.5))
      scale(u(14) / (name.length * u(3.5)), 1)
      text(name, 0, u(15.5))
    }
    pop()

    this.melchior.show()
    this.balthasar.show()
    this.casper.show()
    if (this.decision) this.decision.show()
    // this.showGuide()
  }

  showGuide() {
    const {
      width, height
    } = this

    const u = this.unit.bind(this)

    // guide
    stroke('red')
    strokeWeight(1)
    noFill()

    stroke(255,0,0,128)
    line(-width / 2, 0, width / 2, 0)
    line(0, -height / 2, 0, height / 2)

    stroke('red')
    rect(u(-49), u(-36), u(98), u(72))
    rect(u(-45), u(-32), u(90), u(64))

    // title - left
    push()
    {
      translate(u(-45), u(-25.5))
      rect(u(   0), u(10), u(29), u(2))
      rect(u(   0), u( 0), u(29), u(2))
      rect(u(   0), u( 2), u( 2), u(8))
      rect(u(13.5), u( 2), u( 2), u(8))
      rect(u(  27), u( 2), u( 2), u(8))
    }
    pop()

    // title - right
    push()
    {
      translate(u(16), u(-25.5))
      rect(u(   0), u(10), u(29), u(2))
      rect(u(   0), u( 0), u(29), u(2))
      rect(u(   0), u( 2), u( 2), u(8))
      rect(u(13.5), u( 2), u( 2), u(8))
      rect(u(  27), u( 2), u( 2), u(8))
    }
    pop()

    // computer - melchior
    push()
    {
      translate(u(6), u(2.5))
      rect(0, 0, u(37), u(25))
      beginShape()
      vertex(u(17), u( 0))
      vertex(u(37), u( 0))
      vertex(u(37), u(25))
      vertex(u( 0), u(25))
      vertex(u( 0), u(12))
      endShape(CLOSE)
    }
    pop()

    // computer - balthasar
    push()
    {
      translate(-u(16), -u(25.5))
      rect(0, 0, u(32), u(35))
      beginShape()
      vertex(u( 0), u(    0))
      vertex(u(32), u(    0))
      vertex(u(32), u(27.85))
      vertex(u(22), u(   35))
      vertex(u(10), u(   35))
      vertex(u( 0), u(27.85))
      endShape(CLOSE)
    }
    pop()

    // computer - casper
    push()
    {
      translate(u(-43), u(2.5))
      rect(0, 0, u(37), u(25))
      beginShape()
      vertex(u( 0), u( 0))
      vertex(u(20), u( 0))
      vertex(u(37), u(12))
      vertex(u(37), u(25))
      vertex(u( 0), u(25))
      endShape(CLOSE)
    }
    pop()

    beginShape()
    vertex(u(  0), u(   0))
    vertex(u( 28), u(19.5))
    vertex(u(-28), u(19.5))
    endShape(CLOSE)
    rect(u(-6), u(11.5), u(12), u(3))

    push()
    {
      translate(u(-43), u(-12.5))
      rect(u(  0), u( 0), u(26), u(4))
      rect(u(2.5), u( 5), u(23.5), u(2))
      rect(u(2.5), u( 7), u(23.5), u(2))
      rect(u(2.5), u( 9), u(23.5), u(2))
      rect(u(2.5), u(11), u(23.5), u(2))
    }
    pop()

    push()
    {
      translate(u(23), u(-7.5))
      rect(u(0), u(0), u(19), u(8))
      rect(u(1), u(1), u(17), u(6))
    }
    pop()
  }

  update () {
    this.melchior.update()
    this.balthasar.update()
    this.casper.update()
  }
}
