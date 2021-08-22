const { readdirSync, mkdirSync, readFileSync, writeFileSync } = require("fs")
const { resolve } = require("path")
const pug = require("pug")

const { getProcessArgument } = require("../uitilities")
const updateProjects = require("../update/projects")

const {
  PROJECTS_PATH,
  PROJECT_TEMPLATE_PATH,
  SKETCH_TEMPLATE_PATH
} = require("./config")

function createProject() {
  console.log("start to create a project page")
  const id = readdirSync(PROJECTS_PATH)
  .map((n) => +n)
  .filter((n) => n > 0)
  .reduce((max, n) => Math.max(max, n), 0) + 1

  const projectPath = resolve(`${PROJECTS_PATH}/${id}`)
  const script = readFileSync(SKETCH_TEMPLATE_PATH, { encoding: "utf-8" })
  const scriptPath = resolve(`${projectPath}/sketch.js`)

  mkdirSync(projectPath, { recursive: true })
  writeFileSync(scriptPath, script)

  updateProject(id)

  console.log("done")
}

if (require.main === module) {
  createProject()
}

module.exports = createProject
