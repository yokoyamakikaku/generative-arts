class Magi {
  constructor (environment) {
    this.environment = environment

    this.melchior = new Melchior()
    this.casper = new Casper()
    this.balthasar = new Balthasar()
    this.decision = null
    this.label = "MAGI"

    this.bornedAt = frameCount
  }

  show () {
    const {
      melchior,
      casper,
      balthasar,
      decision
    } = this

    this.showFrames()
    this.showTriangle()
    this.showLabel()
    melchior.show()
    balthasar.show()
    casper.show()
    decision && decision.show()
  }

  showFrames() {
    noFill()
    stroke(ORANGE)
    strokeWeight(2)

    rect(8, 8, 784, 584)
    rect(40, 40, 720, 520)
  }

  showTriangle() {
    noFill()
    stroke(ORANGE)
    strokeWeight(8)

    beginShape()
    vertex(224, 456)
    vertex(576, 456)
    vertex(400, 296)
    endShape(CLOSE)
  }

  showLabel () {
    fill(ORANGE)
    noStroke()
    textFont(FONT_SERIF_EN)
    textSize(32)
    textLeading(32)
    textAlign(CENTER, CENTER)

    push()
    translate(352 + 96 / 2, 392 + 24 / 2 + 2)
    scale(1.1, 1)
    text(this.label, 0, 0)
    pop()
  }
}
