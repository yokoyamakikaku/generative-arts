const { readdirSync, writeFileSync } = require("fs")
const pug = require("pug")

const {
  HOME_PATH,
  HOME_TEMPLATE_PATH,
  PROJECTS_PATH
} = require("../config")

function createHome () {
  console.log("start to create home page")
  const projects = readdirSync(PROJECTS_PATH).sort((a,b) => +a > +b ? 1 : -1)
  const html = pug.renderFile(HOME_TEMPLATE_PATH, { projects })
  writeFileSync(HOME_PATH, html)
  console.log("done")
}

if (require.main === module) {
  createHome()
}

module.exports = createHome
