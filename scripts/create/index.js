const createProject = require('./project')

function create () {
  createProject()
}

if (require.main === module) {
  create()
}

exports.module = create
