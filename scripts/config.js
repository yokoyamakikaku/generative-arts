const { resolve } = require("path")

// public
exports.PUBLIC_PATH   = resolve(__dirname, "../public/")
exports.HOME_PATH     = resolve(__dirname, "../public/index.html")
exports.PROJECTS_PATH = resolve(__dirname, "../public/projects")

// template
exports.HOME_TEMPLATE_PATH    = resolve(__dirname, "./templates/pug/home.pug")
exports.PROJECT_TEMPLATE_PATH = resolve(__dirname, "./templates/pug/project.pug")
exports.SKETCH_TEMPLATE_PATH  = resolve(__dirname, "./templates/js/sketch.js")
