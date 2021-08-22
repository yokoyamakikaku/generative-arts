const WIDTH = 512,
  HEIGHT = 512


let cubes = []

function setup() {
  createCanvas(WIDTH, HEIGHT)
  pixelDensity(1)
}

function draw() {
  background(200)


  if (frameCount % 30 === 0) {
    cubes.push(
      new Cube(
        random(0, width),
        random(0, height),
        random(4, 32),
        random(4, 32)
      )
    )

    cubes = cubes.sort((a,b) => dist(width, 0, a.x, a.y) - dist(width, 0, b.x, b.y))
  }

  cubes.forEach(cube => cube.update())
  cubes.forEach(cube => cube.showShadow())
  cubes.forEach(cube => cube.showBody())

}
