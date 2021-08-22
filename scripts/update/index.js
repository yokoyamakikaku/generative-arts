const updateHome = require("./home")
const updateProjects = require("./projects")

function update () {
  updateHome()
  updateProjects()
}

if (require.main === module) {
  update()
}

module.exports = update
