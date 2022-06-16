const WIDTH = 512
const HEIGHT = 512

function setup () {
  createCanvas(WIDTH, HEIGHT)
  pixelDensity(1)
}

function u (number) {
  return number * 8
}

function draw () {
  const favorability = min(0.99, max(0.01, (sin(frameCount * 0.05) + 1) / 2))

  background(244)

  stroke(32)
  strokeWeight(2)
  line(u(11), u(40), u(53), u(40))

  const left = u(12 + favorability * 14)
  const right = u(52 - favorability * 14)

  noStroke()
  strokeWeight(1)
  fill(0)
  circle(left, u(40), u(1))
  circle(right, u(40), u(1))

  stroke(0)
  line(u(32), u(6), u(32), u(40))
  line(left, u(8), right, u(8))
  line(left, u(8), left, u(46))
  line(right, u(8), right, u(46))
  line(left, u(44), u(28), u(44))
  line(u(36), u(44), right, u(44))

  textSize(u(2))

  textAlign(CENTER)
  text('中庸', u(32), u(5))
  text('許容範囲', u(32), u(45))
  textAlign(RIGHT)
  text('卑屈', u(10), u(40))

  textAlign(LEFT)
  text('謙虚', left + u(1), u(40 - 0.5))

  textAlign(LEFT)
  text('傲慢', u(54), u(40))

  textAlign(RIGHT)
  text('自信', right - u(1), u(40 - 0.5))

  textAlign(RIGHT)
  text('好感度', u(10), u(57))

  stroke(0)
  strokeWeight(1)
  fill(244)
  rect(u(12), u(54), u(40), u(4))
  fill(0)
  rect(u(12), u(54), u(40) - u(40) * favorability, u(4))
}
