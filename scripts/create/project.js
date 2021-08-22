const { readdirSync, mkdirSync, readFileSync, writeFileSync } = require("fs")
const { resolve } = require("path")

const { buildProject } = require("../build/projects")

const {
  PROJECTS_PATH,
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

  buildProject(id)

  console.log("done")
}

if (require.main === module) {
  createProject()
}

module.exports = createProject
