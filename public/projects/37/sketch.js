const WIDTH = 512
const HEIGHT = 512

const nodeMotions = []

function setup () {
  createCanvas(WIDTH, HEIGHT)
  pixelDensity(1)

  nodeMotions.push({
    from: { x: 0, y: 0 },
    to: { x: 0, y: 0 },
    duration: 100
  }, {
    from: { x: 1, y: 0 },
    to: { x: 0, y: 1 },
    duration: 100
  }, {
    from: { x: 2, y: 0 },
    to: { x: 0, y: 2 },
    duration: 100
  }, {
    from: { x: 3, y: 0 },
    to: { x: 0, y: 3 },
    duration: 100
  })

  const text = document.createElement('div')

  text.style.background = '#EEE'
  text.style.padding = '1rem'
  text.style.borderRadius = '0.2rem'
  text.style.whiteSpace = 'pre'
  text.style.fontSize = '11px'
  text.style.margin = '1rem 0'
  text.innerText = JSON.stringify(nodeMotions, null, 2)

  document.body.appendChild(text)
}

function guide () {
  noFill()
  stroke(255, 0, 0, 32)

  for (let x = 0; x < width; x += 16) {
    push()
    translate(x, 0)
    rect(0, 0, 16, height)
    rect(4, 0, 8, height)
    pop()
  }

  for (let y = 0; y < width; y += 16) {
    push()
    translate(0, y, 0)
    rect(0, 0, width, 16)
    rect(0, 4, width, 8)
    pop()
  }
}

function renderNode (node) {
  push()
  translate(node.x * 16, node.y * 16)

  fill('white')
  stroke('gray')

  circle(8, 8, 8)
  pop()
}

function nodeMotionsToNodes (nodeMotions, frameCount) {
  return nodeMotions.map(({ from, to, duration }) => {
    const progress = map(frameCount, 0, duration, 0, 1, true)

    const x = from.x + (to.x - from.x) * progress
    const y = from.y + (to.y - from.y) * progress

    return { x, y }
  })
}

function draw () {
  background(244)

  guide()

  const nodes = nodeMotionsToNodes(nodeMotions, frameCount)

  nodes.forEach(node => renderNode(node))

  // noLoop()
}
