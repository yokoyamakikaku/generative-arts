const { readdirSync, writeFileSync, existsSync, readFile } = require("fs")
const { resolve, extname } = require("path")
const pug = require("pug")

const {
  PROJECT_TEMPLATE_PATH,
  PROJECTS_PATH
} = require("../config")

function loadProjectConfig(id) {
  const configPath = resolve(PROJECTS_PATH, `${id}`, "config.json")
  if (!existsSync(configPath)) return {}

  return require(configPath)
}

function buildProject(id) {
  const projectPath = resolve(PROJECTS_PATH, `${id}`)
  const config = loadProjectConfig(id)

  const title = config.title || `Project #${id}`

  const families = [
    "Noto+Sans+JP",
    ...(config.families || [])
  ]

  const scripts = readdirSync(projectPath)
  .filter(name => extname(name) === '.js')
  .map(script => `./${script}`)

  const prev = existsSync(resolve(PROJECTS_PATH, `${+id - 1}`)) ? `/projects/${+id - 1}` : null
  const next = existsSync(resolve(PROJECTS_PATH, `${+id + 1}`)) ? `/projects/${+id + 1}` : null


  writeFileSync(
    resolve(projectPath, 'index.html'),
    pug.renderFile(PROJECT_TEMPLATE_PATH, {
      title,
      scripts,
      next,
      prev,
      families
    })
  )
}

function buildProjects () {
  readdirSync(PROJECTS_PATH).forEach(id =>
    buildProject(id)
  )
}

if (require.main === module) {
  buildProjects()
}

module.exports = buildProjects
module.exports.buildProject = buildProject
