exports.getProcessArgument = function getProcessArgument (index, defaultValue) {
  return process.argv[index] || defaultValue
}
